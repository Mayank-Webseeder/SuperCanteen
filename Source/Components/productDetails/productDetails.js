import React, { useEffect, useState, useCallback } from 'react';
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
import { PolicyIcon } from '../../../assets/Icons/svgIcons/policyIcon';
import { CurruncyRupees } from '../../../assets/Icons/svgIcons/currencyRupees';
import CustomProductDetailsData from '@components/CustomProductDetailsData';
import { Height } from '@constants/index';
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

const ProductDetails = ({ navigation, route }) => {
  const { productId } = route?.params;
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productDetail);
  const [refreshing, setRefreshing] = useState(false);
  const [addToCartLoading, setAddtoCartLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [animationImage, setAnimationImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectionError, setSelectionError] = useState(null);
  const [localAppliedCoupon, setLocalAppliedCoupon] = useState(null);
  const cartItems = useSelector(state => state.cart.items);
  const productData = product?.product;
  const subCategoryProducts = useSelector(
    state => state.subCategoryProducts.productsBySubcategory[productData?.subCategory] || []
  );
  const similarLoading = useSelector(state => state.subCategoryProducts.loading);
  const similarError = useSelector(state => state.subCategoryProducts.error);
  const { user } = useSelector(state => state.auth);


  // Get image URLs for display
  const getImageUrls = (images) =>
    images?.length > 0
      ? images.map(img =>
          img?.url
            ? img.url.startsWith('http') ? img.url : `${IMGURL}${img.url}`
            : typeof img === 'string' && img.startsWith('http')
            ? img
            : `${IMGURL}${img}`
        )
      : [];

  const imagesToShow =
    selectedVariant && getImageUrls(selectedVariant.images).length > 0
      ? getImageUrls(selectedVariant.images)
      : getImageUrls(productData?.images);

  // Reusable price calculation
  const getPriceDetails = useCallback((item = productData, variant = selectedVariant) => {
    return calculateProductPrice(item, variant, localAppliedCoupon);
  }, [productData, selectedVariant, localAppliedCoupon]);



  // Handle variant selection
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectionError(null);
  };

  // Share product
  const shareWithImage = async () => {
    const shareOptions = {
      title: productData?.name,
      message: stripHtml(productData?.description),
      urls: [imagesToShow].flat(),
    };
    try {
      await Share.open(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };

const OnAddToCart = (item) => {
  try {
    const selectedItem = item || productData;
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
      additionalPrice: 0,
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
};


  // Buy Now handler
const handleBuyNow = () => {
  try {
    // Check if user is logged in
    if (!user || !user.username) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
      });
      return;
    }

      if (productData.outOfStock) {
      showMessage({ 
        message: 'This product is currently unavailable', 
        type: 'danger' 
      });
      return;
    }

    const hasVariants = Array.isArray(productData?.variants) && productData.variants.length > 0;

    let variantStock = 0;
    let variantOutOfStock = false;

    if (hasVariants && selectedVariant?._id) {
      const variant = productData.variants.find(v => v._id === selectedVariant._id);
      variantStock = variant?.countInStock ?? 0;
      variantOutOfStock = variant?.outOfStock ?? false;
    } else {
      variantStock = productData.countInStock || 0;
      variantOutOfStock = productData.outOfStock || false;
    }

    if (variantOutOfStock || variantStock <= 0) {
      showMessage({
        message: 'This item is out of stock',
        type: 'danger',
        duration: 4000,
      });
      return;
    }

    const priceDetails = calculateProductPrice(productData, selectedVariant, localAppliedCoupon);

    navigation.navigate('ProductCheckoutScreen', {
      product: {
        ...productData,
        ...priceDetails,
        ...(selectedVariant && { selectedVariant }),
        quantity: 1,
        isSingleProductCheckout: true,
        availableStock: variantStock
      },
    });

  } catch (error) {
    showMessage({ message: error.message, type: 'danger' });
  }
};


  // Handle animation completion
  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setAddtoCartLoading(false);
  };

  // Refresh data
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchProductById(productId)).unwrap();
      if (productData?.subCategory) {
        await dispatch(fetchProductsBySubcategory(productData.subCategory));
      }
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  }, [productId, dispatch, productData?.subCategory]);

  // Initial data load
  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  // Load similar products
  useEffect(() => {
    if (productData?.subCategory) {
      dispatch(fetchProductsBySubcategory(productData.subCategory));
    }
  }, [productData?.subCategory, dispatch]);

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

  const formattedProduct = formatProductDetailData(product?.product);
  if (!formattedProduct) return null;
  
  // Format similar products data
  const similarProductsData = formateSubCategoryProducts(
    subCategoryProducts.filter(p => p._id !== productId)
  );

  return (
    <View style={styles.wrapper}>
      <AddToCartAnimation
        key={animationKey}
        visible={showAnimation}
        imageUrl={animationImage}
        onComplete={handleAnimationComplete}
      />
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
      >
        <View style={styles.mainContainer}>
          <CustomHeader navigation={navigation} showCartIcon={true} />
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
          <HorizontalLine containerStyle={{ paddingVertical: 6 }} lineStyle={{ backgroundColor: '#E8E8E8' }} />
          <CustomZoomCasual
            cardHeight={Height(200)}
            onImagePress={(uri) => console.log('Image pressed:', uri)}
            data={imagesToShow}
          />
        </View>
        
        <Description 
          productData={formattedProduct}
          selectedVariant={selectedVariant}
          priceDetails={getPriceDetails()}
        />
        
        {formattedProduct?.variants?.length > 0 && (
          <VariantSelector 
            product={formattedProduct} 
            onVariantChange={handleVariantChange}
            selectionError={selectionError} 
            setSelectionError={setSelectionError}
          />
        )}
        
        {productData?.coupons?.length > 0 && (
          <>
            <View style={styles.borderStyle}/>
            <CouponSection
              productId={productData?._id}
              data={productData?.coupons}
              onCouponApplied={setLocalAppliedCoupon}
              localAppliedCoupon={localAppliedCoupon}
              priceDetails={getPriceDetails()}
            />
          </>
        )}
        
    {user?.id &&     <AddressRow
          navigation={navigation}
          address={user?.addresses}
        />}
        
        <View style={styles.infoRow}>
          <PolicyIcon />
          <Text style={styles.infoText}>
            {formattedProduct?.returnPolicy?.returnable
              ? `${formattedProduct?.returnPolicy?.returnWindow} Days Return Policy`
              : 'No returns available'}
          </Text>
        </View>
        
        <View style={[styles.infoRow, { marginTop: 7 }]}>
          <CurruncyRupees />
          <Text style={styles.infoText}>Cash on Delivery</Text>
        </View>
        
        <View style={styles.borderStyle} />
        <CustomProductDetailsData productData={formattedProduct} />
        
        {similarLoading ? (
          <ActivityIndicator size="small" color="#416F81" style={{ marginVertical: 20 }} />
        ) : similarError ? (
          <Text style={styles.errorText}>Failed to load similar products</Text>
        ) : similarProductsData.length > 0 ? (
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>You might also like</Text>
            <CustomSimilarProducts
              data={similarProductsData}
              navigation={navigation}
              onAddToCart={OnAddToCart}
            />
          </View>
        ) : null}
      </ScrollView>
      
      <BottomPurchaseBar
        addToCartLoading={addToCartLoading}
        onSharePress={shareWithImage}
        onAddToCart={() => OnAddToCart()}
        onBuyNow={handleBuyNow}
        selectedVariant={selectedVariant}
        selectionError={selectionError}
      />
    </View>
  );
};

export default ProductDetails;