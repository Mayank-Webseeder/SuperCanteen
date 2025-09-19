import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  RefreshControl,
  Pressable
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/slices/productDetailSlice';
import { formatProductDetailData, stripHtml } from '../../utils/dataFormatters';
import { styles } from './styles';
import CustomHeader from '../CustomHeader';
import HorizontalLine from '../../otherComponents/home/horizontalLine';
import BottomPurchaseBar from '../../otherComponents/bottomPurchase';
import CustomSimilarProducts from '../order/similarProducts/customSimilarProdcuts';
import AddressRow from '@components/CustomAddressRow';
import { CurruncyRupees } from '../../../assets/Icons/svgIcons/currencyRupees';
import CustomProductDetailsData from '@components/CustomProductDetailsData';
import Description from './description';
import CustomZoomCasual from './zommableImage/customZoomCasual';
import { fetchProductsBySubcategory } from '../../redux/slices/subCategoryProductSlice';
import { formateSubCategoryProducts } from '../../utils/dataFormatters';
import { addToCart } from '../../redux/slices/cartSlice';
import CustomSearch from '../../Components/searchInput';
import { AddToCartAnimation } from '../../otherComponents/addToCartAnimation';
import VariantSelector from './variantSelector';
import { IMGURL } from '../../utils/dataFormatters';
import CouponSection from './couponSection';
import Share from 'react-native-share';
import { showMessage } from 'react-native-flash-message';
import ContentSkeletonLoader from '@components/Common/contentSkeletonLoader';
import { calculateProductPrice } from '../../utils/helper'
import { ReturnsSection } from '../../otherComponents/home/returnsSection'
import PackSize from './packSize';

// Memoized components to prevent unnecessary re-renders
const MemoizedCustomHeader = React.memo(CustomHeader);
const MemoizedHorizontalLine = React.memo(HorizontalLine);
const MemoizedCustomZoomCasual = React.memo(CustomZoomCasual);
const MemoizedDescription = React.memo(Description);
const MemoizedPackSize = React.memo(PackSize);
const MemoizedVariantSelector = React.memo(VariantSelector);
const MemoizedCouponSection = React.memo(CouponSection);
const MemoizedAddressRow = React.memo(AddressRow);
const MemoizedCustomProductDetailsData = React.memo(CustomProductDetailsData);
const MemoizedReturnsSection = React.memo(ReturnsSection);
const MemoizedCustomSimilarProducts = React.memo(CustomSimilarProducts);
const MemoizedBottomPurchaseBar = React.memo(BottomPurchaseBar);

const ProductDetails = ({ navigation, route }) => {
  const { productId } = route?.params;
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productDetail);
  const [refreshing, setRefreshing] = useState(false);
  const [addToCartLoading, setAddtoCartLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [animationImage, setAnimationImage] = useState(null);
  const [selectionError, setSelectionError] = useState(null);
  const [localAppliedCoupon, setLocalAppliedCoupon] = useState(null);
  const cartItems = useSelector(state => state.cart.items);
  const productData = product?.product;
  
  // FIX: Clear previous product data when productId changes
  const [currentProductId, setCurrentProductId] = useState(productId);
  const [localProductData, setLocalProductData] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const subCategoryProducts = useSelector(
    state => state.subCategoryProducts.productsBySubcategory[productData?.subCategory] || []
  );
  const similarLoading = useSelector(state => state.subCategoryProducts.loading);
  const similarError = useSelector(state => state.subCategoryProducts.error);
  const { user } = useSelector(state => state.auth);
  const didSetDefaultVariant = useRef(false);
  const variantRef = useRef(null);
  const prevProductId = useRef(null);

  // FIX: Reset all local state when productId changes
  useEffect(() => {
    if (productId !== currentProductId) {
      setCurrentProductId(productId);
      setLocalProductData(null);
      setSelectedVariant(null);
      setLocalAppliedCoupon(null);
      setSelectionError(null);
      variantRef.current = null;
      didSetDefaultVariant.current = false;
      prevProductId.current = productId;
    }
  }, [productId]);

  // FIX: Update local product data only when we have fresh data
  useEffect(() => {
    if (product?.product && product.product._id === productId) {
      setLocalProductData(product.product);
    }
  }, [product, productId]);

  // Set default variant when product data loads
  useEffect(() => {
    if (localProductData?.productType === "WeightPack") {
      if (Array.isArray(localProductData?.flatVariants) && localProductData?.flatVariants.length > 0) {
        setSelectedVariant(localProductData?.flatVariants[0]);
      } else {
        setSelectedVariant(null);
      }
    }
  }, [localProductData]);

  // Get image URLs for display - memoized
  const getImageUrls = useCallback((images) => {
    if (!images || !Array.isArray(images)) return [];
    return images.map(img => {
      const url = img?.url || img;
      return url?.startsWith('http') ? url : `${IMGURL}${url}`;
    }).filter(Boolean);
  }, [IMGURL]);

  const imagesToShow = useMemo(() => {
    // If we have a selected variant with images, use those
    if (selectedVariant?.images?.length) {
      return getImageUrls(selectedVariant.images);
    }

    // Otherwise use product images
    return getImageUrls(localProductData?.images);
  }, [localProductData, selectedVariant, getImageUrls]);

  const hasVariants = useMemo(() => {
    return Array.isArray(localProductData?.colorVariants) && localProductData.colorVariants.length > 0;
  }, [localProductData]);

  const flattenedVariants = useMemo(() => {
    if (!hasVariants) return [];
    return localProductData.colorVariants.flatMap(colorVar =>
      colorVar.sizes.map(size => ({
        colorCode: colorVar.code,
        colorName: colorVar.name,
        images: colorVar.images,
        ...size
      }))
    );
  }, [localProductData, hasVariants]);

  const getPriceDetails = useCallback(
    (variant = hasVariants ? selectedVariant : null) => {
      return calculateProductPrice(localProductData, variant, localAppliedCoupon);
    },
    [localProductData, selectedVariant, localAppliedCoupon, hasVariants]
  );

  useEffect(() => {
    if (hasVariants && flattenedVariants.length > 0 && !selectedVariant) {
      setSelectedVariant(flattenedVariants[0]);
    }
  }, [flattenedVariants, hasVariants]);

  const handleVariantChange = useCallback((variant) => {
    setSelectedVariant(variant);
    variantRef.current = variant;
    setSelectionError(null);
  }, []);

  // Share product - memoized
  const shareWithImage = useCallback(async () => {
    if (!localProductData) return;
    
    const shareOptions = {
      title: localProductData?.name,
      message: stripHtml(localProductData?.description),
      urls: [imagesToShow].flat(),
    };
    try {
      await Share.open(shareOptions);
    } catch (err) {
      console.log(err);
    }
  }, [localProductData, imagesToShow]);

  const OnAddToCart = useCallback((item) => {
    try {
      const selectedItem = item || localProductData;
      if (!selectedItem) return;
      
      const selectedProductId = selectedItem?.id || productId;
      const hasVariants = Array.isArray(selectedItem?.variants) && selectedItem.variants.length > 0;

      let variantStock = 0;
      let variantOutOfStock = false;

      if (selectedItem.outOfStock) {
        showMessage({ 
          message: 'This product is currently unavailable', 
          type: 'danger' 
        });
        return;
      }

      if (hasVariants && selectedVariant?._id) {
        const variant = selectedItem.variants.find(v => v._id === selectedVariant._id);
        variantStock = variant?.countInStock ?? 0;
        variantOutOfStock = variant?.outOfStock ?? false;
      } else {
        variantStock = selectedItem.countInStock || 0;
        variantOutOfStock = selectedItem.outOfStock || false;
      }

      if (variantOutOfStock || variantStock <= 0) {
        showMessage({
          message: 'This item is out of stock',
          type: 'danger',
        });
        return;
      }

      // Find existing cart item
      const cartItem = cartItems.find(ci =>
        (ci.product?._id === selectedItem._id || ci.product === selectedItem._id) &&
        (!ci.variantId || ci.variantId === selectedVariant?._id)
      );

      const currentQty = cartItem?.qty || 0;
      if (currentQty + 1 > variantStock) {
        showMessage({
          message: `Only ${variantStock} available. You already have ${currentQty} in your cart.`,
          type: 'danger',
        });
        return;
      }

      const finalVariant = selectedVariant || {
        images: selectedItem.images,
        sku: selectedItem.sku || '',
      };

      const priceDetails = calculateProductPrice(selectedItem, finalVariant, localAppliedCoupon);
      // Prepare animation image
      const imageUrl = finalVariant?.images?.[0]
        ? finalVariant.images[0].startsWith('https://')
          ? finalVariant.images[0]
          : `${IMGURL}${finalVariant.images[0]}`
        : selectedItem?.images?.[0]
        ? selectedItem.images[0].startsWith('https://')
          ? selectedItem.images[0]
          : `${IMGURL}${selectedItem.images[0]}`
        : null;

      setAnimationImage(imageUrl);
      setAddtoCartLoading(true);
      setAnimationKey(prev => prev + 1);
      setShowAnimation(true);

      // Prepare cart payload
      const cartPayload = {
        productId: selectedProductId,
        quantity: 1,
        price: priceDetails.finalPrice,
        originalPrice: priceDetails.variantPrice,
        ...(priceDetails.coupon && {
          coupon: priceDetails.coupon,
          discountAmount: priceDetails.discountAmount,
          discountPercentage: priceDetails.discountPercentage
        }),
        ...(selectedItem?.isDigital !== undefined && { isDigital: selectedItem?.isDigital }),
        ...(finalVariant?._id && { variantId: finalVariant._id }),
        ...(finalVariant && Object.keys(finalVariant).length > 0 && { variantDetails: finalVariant }),
      };

      dispatch(addToCart(cartPayload))
        .then(() => {
          console.log("🛒 Added to cart:", cartPayload);
        })
        .catch((error) => {
          console.log("❌ Add to cart failed", error);
          setAddtoCartLoading(false);
          setShowAnimation(false);
        });

    } catch (error) {
      showMessage({ message: error.message, type: 'danger' });
    }
  }, [localProductData, productId, selectedVariant, cartItems, localAppliedCoupon, dispatch]);

  // Buy Now handler - memoized
  const handleBuyNow = useCallback(() => {
    try {
      // Check if user is logged in
      if (!user || !user.username) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
        });
        return;
      }

      // Check if we have product data
      if (!localProductData) {
        showMessage({
          message: 'Product data not loaded yet',
          type: 'warning',
        });
        return;
      }

      // Check if variant selection is required but not made
      if (hasVariants && !selectedVariant) {
        setSelectionError('Please select a variant');
        showMessage({
          message: 'Please select a variant first',
          type: 'warning',
        });
        return;
      }

      const finalVariant = hasVariants ? selectedVariant : null;

      // Get stock information
      const stock = finalVariant?.countInStock ?? localProductData.countInStock ?? 0;
      const outOfStock = finalVariant?.outOfStock ?? localProductData.outOfStock ?? false;

      if (outOfStock || stock <= 0) {
        showMessage({ 
          message: 'This product is currently unavailable', 
          type: 'danger' 
        });
        return;
      }

      const priceDetails = getPriceDetails(finalVariant);

      navigation.navigate('ProductCheckoutScreen', {
        product: {
          ...localProductData,
          ...priceDetails,
          selectedVariant: finalVariant,
          quantity: finalVariant?.minOrderQuantity ?? localProductData.minOrderQuantity ?? 1,
          isSingleProductCheckout: true,
          availableStock: stock
        },
      });

    } catch (error) {
      showMessage({ message: error.message, type: 'danger' });
    }
  }, [user, localProductData, selectedVariant, getPriceDetails, navigation, hasVariants]);

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false);
    setAddtoCartLoading(false);
  }, []);

  // Refresh data - memoized
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchProductById(productId)).unwrap();
      if (localProductData?.subCategory) {
        await dispatch(fetchProductsBySubcategory(localProductData.subCategory));
      }
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  }, [productId, dispatch, localProductData?.subCategory]);

  // Initial data load
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  // Load similar products
  useEffect(() => {
    if (localProductData?.subCategory) {
      dispatch(fetchProductsBySubcategory(localProductData.subCategory));
    }
  }, [localProductData?.subCategory, dispatch]);

  // Memoized formatted product
  const formattedProduct = useMemo(() => {
    return localProductData ? formatProductDetailData(localProductData) : null;
  }, [localProductData]);

  console.log("Lcal product data is",localProductData)

  // Memoized similar products data
  const similarProductsData = useMemo(() => {
    return formateSubCategoryProducts(
      subCategoryProducts.filter(p => p._id !== productId)
    );
  }, [subCategoryProducts, productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ContentSkeletonLoader type="product" itemCount={6} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'red' }}>Error loading product: {error.message}</Text>
      </View>
    );
  }

  if (!formattedProduct) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#416F81" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#416F81']}
            tintColor={'#416F81'}
          />
        }
        // Performance optimizations for ScrollView
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
      >
        <View style={styles.mainContainer}>
          <MemoizedCustomHeader navigation={navigation} showCartIcon={true} />
          <Pressable 
            style={styles.searchPressable}
            onPress={() => navigation.navigate('Search')}
          >
            <CustomSearch
              disabledStyle={styles.disabledStyle}
              backgroundColor={'#fff'}
              disabled
              containerStyle={styles.searchInput}
              inputStyle={{ fontSize: 14, paddingVertical: 10, marginLeft: 2}}
            />
          </Pressable>
        </View>
        
        <View>
          <MemoizedHorizontalLine containerStyle={{ paddingVertical: 6 }} lineStyle={{ backgroundColor: '#E8E8E8' }} />
          <MemoizedCustomZoomCasual
            onImagePress={(uri) =>{}}
            data={imagesToShow}
          />
        </View>
        
        <MemoizedDescription 
          productData={formattedProduct}
          selectedVariant={selectedVariant}
          onVariantChange={handleVariantChange}
        />
        
        {localProductData.productType === "WeightPack"  && <>
          {localProductData?.flatVariants?.length > 0 && (
            <MemoizedPackSize
              flatVariants={localProductData.flatVariants}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />
          )}
        </>}

        {localProductData.productType === "ColorSize" && <>
          {hasVariants && (
            <MemoizedVariantSelector
              variants={flattenedVariants}
              onVariantChange={handleVariantChange}
              setSelectionError={setSelectionError}
            />
          )}
        </> }
        
        {localProductData?.coupons?.length > 0 && (
          <>
            <View style={styles.borderStyle}/>
            <MemoizedCouponSection
              productId={localProductData?._id}
              data={localProductData?.coupons}
              onCouponApplied={setLocalAppliedCoupon}
              localAppliedCoupon={localAppliedCoupon}
              priceDetails={getPriceDetails()}
            />
          </>
        )}
        
        {user?.id && (
          <MemoizedAddressRow
            navigation={navigation}
            address={user?.addresses}
          />
        )}
        
        <View style={styles.infoRow}>
          <CurruncyRupees />
          <Text style={styles.infoText}>Cash on Delivery</Text>
        </View>
        
        <View style={styles.borderStyle} />
        <MemoizedCustomProductDetailsData productData={formattedProduct} />
        
        {formattedProduct?.returnPolicy?.returnable && (
          <MemoizedReturnsSection returnWindow={formattedProduct?.returnPolicy?.returnWindow} />
        )}
        
        {similarLoading ? (
         <View style={styles.loadingContainer}>
           <ActivityIndicator size="small" color="#416F81"/>
         </View>
        ) : similarError ? (
          <Text style={styles.errorText}>Failed to load similar products</Text>
        ) : similarProductsData.length > 0 ? (
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>You might also like</Text>
            <MemoizedCustomSimilarProducts
              data={similarProductsData}
              navigation={navigation}
              onAddToCart={OnAddToCart}
            />
          </View>
        ) : null}
      </ScrollView>
       <AddToCartAnimation
        key={animationKey}
        visible={showAnimation}
        imageUrl={animationImage}
        onComplete={handleAnimationComplete}
      />
      <MemoizedBottomPurchaseBar
        addToCartLoading={addToCartLoading}
        onSharePress={shareWithImage}
        onAddToCart={OnAddToCart}
        onBuyNow={handleBuyNow}
        selectedVariant={selectedVariant}
        selectionError={selectionError}
        hasVariants={hasVariants}
      />
    </View>
  );
};

export default React.memo(ProductDetails);