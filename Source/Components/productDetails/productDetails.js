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
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomPurchaseBar from '../../otherComponents/bottomPurchase';
import CustomSimilarProducts from '../order/similarProducts/customSimilarProdcuts';
import CustomSearchInput from '@components/searchInput';
import AddressRow from '@components/CustomAddressRow';
import { PolicyIcon } from '../../../assets/Icons/svgIcons/policyIcon';
import { CurruncyRupees } from '../../../assets/Icons/svgIcons/currencyRupees';
import CustomProductDetailsData from '@components/CustomProductDetailsData';
import { Height, Width } from '@constants/index';
import Description from './description';
import CustomZoomCasual from './zommableImage/customZoomCasual';
import { fetchProductsBySubcategory } from '../../redux/slices/subCategoryProductSlice';
import { formateSubCategoryProducts } from '../../utils/dataFormatters';
import { addToCart } from '../../redux/slices/cartSlice';
import CustomSearch from '../../Components/searchInput';

const ProductDetails = ({ navigation, route }) => {
  const { productId } = route?.params;
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productDetail);
  const [isFavourite, setIsFavourite] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [addToCartLoading,setAddtoCartLoading] = useState(false)
  const productData = product?.product;
  const subCategoryProducts = useSelector(
    state => state.subCategoryProducts.productsBySubcategory[productData?.subCategory] || []
  );
  const similarLoading = useSelector(state => state.subCategoryProducts.loading);
  const similarError = useSelector(state => state.subCategoryProducts.error);
     const { user } = useSelector(state => state.auth);
 


  const OnAddToCart = () =>{
    // setAddtoCartLoading(true)
         dispatch(addToCart({
            productId:productId,
            quantity: 1,
            price: productData.offerPrice || productData.price,
            isDigital: productData.isDigital
          }))
            .then(() => {
              // setAddtoCartLoading(false)
              navigation.navigate('Cart');
            })
            .catch((error) => {
              console.log("❌ Buy now failed", error);
            })
  }


  
 

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
          <CustomHeader navigation={navigation} showRightIcons={true} />
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
            cardWidth={Width(300)}
            cardHeight={Height(200)}
            onImagePress={(uri) => console.log('Image pressed:', uri)}
            data={formattedProduct?.images}
          />
        </View>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={styles.heartIconWrapper}>
          <Ionicons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavourite ? '#416F81' : '#0E2D42'}
          />
        </TouchableOpacity>
        <Description productData={formattedProduct} />
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
        <CustomProductDetailsData productData={formattedProduct} />

        {/* Similar Products Section - Fixed filtering */}
        {similarLoading ? (
          <ActivityIndicator size="small" color="#416F81" style={{ marginVertical: 20 }} />
        ) : similarError ? (
          <Text style={styles.errorText}>Failed to load similar products</Text>
        ) : similarProductsData.length > 0 ? (
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Similar Products for You</Text>
            <CustomSimilarProducts
              data={similarProductsData}
              navigation={navigation}
              
            />
          </View>
        ) : (
          <></>
          // <Text style={styles.noProductsText}>No similar products found</Text>
        )}
      </ScrollView>

      <BottomPurchaseBar
        addToCartLoading={addToCartLoading}
        onSharePress={() => console.log('Share Pressed')}
        onAddToCart={() => OnAddToCart()}
        onBuyNow={() =>{
            if (!user || !user.username) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
      });
    } else {
 navigation.navigate('ProductCheckoutScreen')}}
    }
          
         
      />
    </View>
  );
};

export default ProductDetails;