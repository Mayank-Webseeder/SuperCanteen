import { View, Text } from 'react-native';
import { styles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '@constants/index';

export default function Description({ productData, selectedVariant,priceDetails }) {
  const rating = productData?.rating || 0;
  const reviews = productData?.numReviews || 0;

  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);


  // Pricing logic
  const baseOfferPrice = productData?.offerPrice || 0;
  const baseMrp = productData?.mrp || 0;
  const additionalPrice = selectedVariant?.additionalPrice || 0;

  const finalOfferPrice = baseOfferPrice + additionalPrice;
  const finalMrp = baseMrp + additionalPrice;
  const originalPrice =  priceDetails?.variantPrice - priceDetails?.discountAmount
 
  // Stock info
  const stock = selectedVariant?.countInStock ?? productData?.stock ?? 0;

  return (
    <View style={styles.detailsWrapper}>
      {/* Name */}
      {productData?.name && <Text style={styles.title}>{productData.name}</Text>}

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          {Array.from({ length: fullStars }).map((_, i) => (
            <AntDesign key={`full-${i}`} name="star" size={20} color="#2E6074E8" />
          ))}
          {halfStar && (
            <AntDesign name="staro" size={20} color="#2E6074E8" />
          )}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <AntDesign key={`empty-${i}`} name="staro" size={20} color="#D9D9D9" />
          ))}
        </View>

        {reviews > 0 && (
          <Text style={styles.ratingText}>
            {rating.toFixed(1)} / 5 • {reviews} {reviews === 1 ? 'review' : 'reviews'}
          </Text>
        )}
      </View>

      {/* Price */}
      <View style={styles.priceContainer}>
       <View style={{flexDirection:"row",alignItems:"center"}}>
         <Text style={styles.price}>₹{originalPrice}</Text>
        {finalMrp > finalOfferPrice && (
          <Text style={styles.originalPrice}>₹{finalMrp}</Text>
        )}
        <Text style={styles.discount}>
          {Math.round(((finalMrp - finalOfferPrice) / finalMrp) * 100)}% OFF
        </Text>
       </View>
           <View style={styles.stockContainer}>
            <Ionicons 
             style={{marginHorizontal:3}}
              name={stock > 0 && 'checkmark-circle'}
              size={16} 
              color={stock > 0 && COLORS.green } 
            />
         <Text style={[styles.subText, { color: stock > 0 && '#28A745' }]}>
        {stock > 0 && `${stock} in stock`}
      </Text>
          </View>
      </View>

      {/* Stock */}
      

      {/* Seller */}
      {productData?.seller && (
        <Text style={[styles.subText, { color: '#416F81' }]}>
          Seller: {productData.seller}
        </Text>
      )}

      {/* Size */}
      {productData?.size && (
        <Text style={styles.label}>Size: {productData.size}</Text>
      )}

      {/* Warranty */}
      {productData?.warrantyPeriod && (
        <Text style={[styles.subText, { marginTop: 4 }]}>
          Warranty: {productData.warrantyPeriod} months
        </Text>
      )}
    </View>
  );
}
