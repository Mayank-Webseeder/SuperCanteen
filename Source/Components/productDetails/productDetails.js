
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
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
import CustomCasual from '@components/CustomCasual';
import AddressRow from '@components/CustomAddressRow';
import { PolicyIcon } from '../../../assets/Icons/svgIcons/policyIcon';
import { CurruncyRupees } from '../../../assets/Icons/svgIcons/currencyRupees';
import CustomProductDetailsData from '@components/CustomProductDetailsData';
import { Height , Width} from '@constants/index';
import { fetchSimilarProducts } from '../../redux/slices/similarProductSlice';
import { SimilarProductData } from '../../Mock/Data/SimilarProductData';
import Description from './description';
import CustomZoomCasual from './zommableImage/customZoomCasual';
import {formatSimilarProducts} from '../../utils/dataFormatters'

import { addToCart } from '../../redux/slices/cartSlice';
  
  const ProductDetails = ({navigation,route}) => {

   const { productId } = route?.params;
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productDetail);
  const [isFavourite, setIsFavourite] = useState(false);
  const { 
    similarProducts,
    similarLoading,
    similarError 
  } = useSelector(state => state.similarProduct);

  
  
   

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

   useEffect(() => {
    if (product?.product?.category?._id) {
      dispatch(fetchSimilarProducts({
        categoryId: product.product.category._id,
        excludeProductId: productId
      }));
    }
  }, [product, productId, dispatch]);

  

  const formattedSimilarProducts = formatSimilarProducts(similarProducts || []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#416F81" />
      </View>
    );
  }

  const formattedProduct = formatProductDetailData(product?.product);
  if (!formattedProduct) return null;
    return (
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 120}}>
          <View style={styles.mainContainer}>
            <CustomHeader  navigation={navigation}  showRightIcons={true} />
          <CustomSearchInput />
          </View>
          <View >
            <HorizontalLine containerStyle={{paddingVertical: 6}} lineStyle={{backgroundColor:'#E8E8E8'}}/>
            <CustomZoomCasual  cardWidth={Width(300)}
  cardHeight={Height(200)}
  onImagePress={(uri) => console.log('Image pressed:', uri)}  data={formattedProduct?.images} />
        
          </View>
      <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={styles.heartIconWrapper}>
              <Ionicons
                        name={isFavourite ? 'heart' : 'heart-outline'}
                        size={24}
                        color={isFavourite ? '#416F81' : '#0E2D42'}
                      />
            </TouchableOpacity>
      <Description productData={formattedProduct}/>
          <AddressRow  navigation={navigation}
           address={formattedProduct.shippingAddress} 
          />

            <View style={styles.infoRow}>
              <PolicyIcon/>
          <Text style={styles.infoText}>
  {formattedProduct?.returnPolicy?.returnable
    ? `${formattedProduct?.returnPolicy?.returnWindow} Days Return Policy`
    : 'No returns available'}
</Text>
          </View>
          <View style={[styles.infoRow,{marginTop:7}]}>
            <CurruncyRupees/>
            <Text style={styles.infoText}>Cash on Delivery & UPI Available</Text>
          </View> 
         
            <View style={styles.borderStyle}/>
             <View style={styles.infoRow}>
           <TouchableOpacity onPress={() => navigation.navigate('Offers')}>
             <Text style={styles.offersButtonText}>All Offers & Coupons</Text>
           </TouchableOpacity>
          </View>
          <View style={styles.borderStyle}/>
          <CustomProductDetailsData productData={formattedProduct} />

            {similarLoading ? (
          <ActivityIndicator size="small" color="#416F81" style={{ marginVertical: 20 }} />
        ) : similarError ? (
         <></>
        ) : formattedSimilarProducts.length > 0 && (
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Similar Products for You</Text>
            <CustomSimilarProducts 
              data={formattedSimilarProducts} 
              navigation={navigation}
            />
          </View>
        )}
        </ScrollView>
  
        {/* Bottom Bar */}
     
<BottomPurchaseBar
  onSharePress={() => console.log('Share Pressed')}
  onAddToCart={() => {
    dispatch(addToCart({
      productId: formattedProduct?._id,
      variantId: formattedProduct.variants[0]?._id,
      quantity: 1,
      slabId: formattedProduct.priceSlabs?.[0]?._id,
      price: formattedProduct?.offerPrice
    }));
   navigation.navigate('Cart');
  }}
  onBuyNow={() => {
    dispatch(addToCart({
      productId: formattedProduct._id,
      variantId: formattedProduct.variants[0]?._id,
      quantity: 1,
      slabId: formattedProduct.priceSlabs?.[0]?._id,
      price: formattedProduct?.offerPrice
    }));
    navigation.navigate('ProductCheckoutScreen');
  }}
/>

      </View>
    );
  };
  
  export default ProductDetails;
 

ProductDetails.js

