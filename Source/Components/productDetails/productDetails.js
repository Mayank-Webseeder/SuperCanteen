import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import React, { useState } from 'react';
  import CustomHeader from '../customHeader';
  import CustomSearchInput from '../searchInput';
  import CustomCasual from '../customCasual';
 import { Menwatch } from '../../mock/Data/Menwatch';
  import {Height} from '../../constants';
  import CUstomAddressRow from '../customAddressRow';
  import CustomProductDetailsData from '../customProductDetailsData';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import CustomSimilarProdcuts from '../order/similarProducts/customSimilarProdcuts';
  import { SimilarProductData } from '../../mock/Data/SimilarProductData';
  import { styles } from './styles';
import HorizontalLine from '../../otherComponents/home/horizontalLine';
import Description from './description';
import { PolicyIcon } from '../../../assets/Icons/svgIcons/policyIcon';
import { CurruncyRupees } from '../../../assets/Icons/svgIcons/currencyRupees';
import BottomPurchaseBar from '../../otherComponents/bottomPurchase';
  
  const ProductDetails = ({navigation}) => {
    const [isFavourite , setIsFavourite] = useState(false)
    return (
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 120}}>
          <View style={styles.mainContainer}>
            <CustomHeader label={'Men’s Watch'} navigation={navigation}  showRightIcons={true} />
          <CustomSearchInput />
          </View>
          <View >
            <HorizontalLine containerStyle={{paddingVertical: 6}} lineStyle={{backgroundColor:'#E8E8E8'}}/>
            <CustomCasual resizeMode={'stretch'} cardHeight={Height(300)} paddingHorizontal={1}  cardWidth={390}  data={Menwatch} />
        
          </View>
      <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={styles.heartIconWrapper}>
              <Ionicons
                        name={isFavourite ? 'heart' : 'heart-outline'}
                        size={24}
                        color={isFavourite ? '#416F81' : '#0E2D42'}
                      />
            </TouchableOpacity>
      <Description/>
          <CUstomAddressRow  navigation={navigation}/>

            <View style={styles.infoRow}>
              <PolicyIcon/>
            <Text style={styles.infoText}>7 Days Return Policy</Text>
          </View>
          <View style={styles.infoRow}>
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
          <CustomProductDetailsData />
  <View style={styles.borderStyle}/>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Similar Products for You</Text>
            <CustomSimilarProdcuts data={SimilarProductData} />
          </View>
        </ScrollView>
  
        {/* Bottom Bar */}
     
<BottomPurchaseBar
  onSharePress={() => console.log('Share Pressed')}
  onAddToCart={() => navigation.navigate('Main', {
  screen: 'Orders',
})}
  onBuyNow={() => navigation.navigate('ProductCheckoutScreen')}
/>
      </View>
    );
  };
  
  export default ProductDetails;
 