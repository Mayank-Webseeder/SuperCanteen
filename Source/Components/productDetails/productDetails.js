import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/slices/productDetailSlice';
import { formatProductDetailData } from '../../utils/dataFormatters';
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
import { AddToCartAnimation } from '../../otherComponents/addToCartAnimation'
import VariantSelector from './variantSelector';
import { IMGURL } from '../../utils/dataFormatters';

const ProductDetails = ({ navigation, route }) => {
  const { productId } = route?.params;
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productDetail);
  const [refreshing, setRefreshing] = useState(false);
  const [addToCartLoading,setAddtoCartLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); 
  const [animationImage, setAnimationImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectionError, setSelectionError] = useState(null);

  const productData = product?.product;
  // console.log("PRODUCTDATA IS==================>",productData)
  const subCategoryProducts = useSelector(
    state => state.subCategoryProducts.productsBySubcategory[productData?.subCategory] || []
  );
  const similarLoading = useSelector(state => state.subCategoryProducts.loading);
  const similarError = useSelector(state => state.subCategoryProducts.error);
  const { user } = useSelector(state => state.auth);
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
const handleVariantChange = (variant) => {
  setSelectedVariant(variant); 
};
const OnAddToCart = (item) => {
  
  const selectedItem = item || productData;
  const selectedProductId = selectedItem?.id || productId;

  const basePrice = selectedItem.offerPrice || selectedItem.price;

  // 🔁 If item is coming from similar products and has variantDetails inside it (fake variant)
  const isFromSimilarProducts = !!item;

  const hasSizeVariants =
  selectedItem?.variants?.some(variant =>
    variant?.name?.toLowerCase()?.includes('size')
  );

  const finalVariant = isFromSimilarProducts
    ? selectedItem?.variantDetails || {}
    : selectedVariant || {
        additionalPrice: 0,
        images: selectedItem.images,
        sku: selectedItem.sku || '',
      };

      console.log("SELECTED ITEM IS",selectedItem)

  // 🛑 Don't check for selectedVariant if it's coming from similarProducts (no real variant selection)
  if (!isFromSimilarProducts &&   hasSizeVariants && selectedItem?.variants?.length > 0 && !selectedVariant) {
    setSelectionError("Please select a size for this color");
    return;
  }

  const variantPrice = basePrice + (finalVariant?.additionalPrice || 0);

  const variantImage = finalVariant?.images?.[0];
const productImage =
  Array.isArray(selectedItem?.images) && selectedItem.images.length > 0
    ? selectedItem.images[0]
    : selectedItem?.image || null;

    

  const imageUrl =
  typeof variantImage === 'object' && variantImage?.url
    ? `${IMGURL}${variantImage.url}`
    : typeof variantImage === 'string'
    ? `${IMGURL}${variantImage}`
    : typeof productImage === 'object' && productImage?.url
    ? `${IMGURL}${productImage.url}`
    : typeof productImage === 'string'
    ?  productImage
    : null;

  setAnimationImage(imageUrl);
  setAddtoCartLoading(true);
  setAnimationKey(prev => prev + 1);
  setShowAnimation(true);

  const cartPayload = {
    productId: selectedProductId,
    quantity: 1,
    price: variantPrice,
    ...(selectedItem?.isDigital !== undefined && { isDigital: selectedItem?.isDigital }),
    ...(finalVariant?._id && { variantId: finalVariant?._id }), // Only include if _id exists
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
};

  const handleAnimationComplete = () => {
    setShowAnimation(false);
     setAddtoCartLoading(false);
   
  };

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

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (productData?.subCategory) {
      dispatch(fetchProductsBySubcategory(productData.subCategory));
    }
  }, [productData?.subCategory, dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#416F81" />
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
        key={animationKey} // Important for resetting the animation
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
              <CustomSearch
            disabledStyle={styles.disabledStyle}
            backgroundColor={'#fff'}
            disabled
            containerStyle={styles.searchInput}
            inputStyle={{ fontSize: 14, paddingVertical: 11,  marginLeft: 2}}
          />
        </View>
        <View>
          <HorizontalLine containerStyle={{ paddingVertical: 6 }} lineStyle={{ backgroundColor: '#E8E8E8' }} />
         <CustomZoomCasual
  cardHeight={Height(200)}
  onImagePress={(uri) => console.log('Image pressed:', uri)}
  data={imagesToShow}  

/>
        </View>
        <Description productData={formattedProduct}  selectedVariant={selectedVariant}/>
           {formattedProduct?.variants?.length > 0 && (
            <VariantSelector 
              product={formattedProduct} 
             onVariantChange={handleVariantChange}
             selectionError={selectionError} 
             setSelectionError={setSelectionError}
            />
          )}
        <AddressRow
          navigation={navigation}
          address={formattedProduct.shippingAddress}
        />
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
          <Text style={styles.infoText}>Cash on Delivery & UPI Available</Text>
        </View>

        <View style={styles.borderStyle} />
        <View style={styles.infoRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Offers')}>
            <Text style={styles.offersButtonText}>All Offers & Coupons</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.borderStyle} />
        <CustomProductDetailsData  productData={formattedProduct} />

        {/* Similar Products Section - Fixed filtering */}
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
        ) : (
          <></>
        )}
      </ScrollView>
      <BottomPurchaseBar
  addToCartLoading={addToCartLoading}
  onSharePress={() => console.log('Share Pressed')}
  onAddToCart={() => OnAddToCart()}
  onBuyNow={() => {
    if (!user || !user.username) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
      });
    } else {
      navigation.navigate('ProductCheckoutScreen');
    }
  }}
  selectedVariant={selectedVariant}
  selectionError={selectionError}
/>
    </View>
  );
};

export default ProductDetails;