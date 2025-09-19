import { View, Text } from 'react-native';
import { styles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '@constants/index';
import { useEffect } from 'react';


export default function Description({ productData, selectedVariant, onVariantChange }) {  
  console.log("PRODUCT DATA IS================>",productData,selectedVariant)

const activeVariant = selectedVariant 
   const rating = productData?.rating || 0;
  const reviews = productData?.numReviews || 0;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  // ✅ Always take active variant price
  const finalOfferPrice = activeVariant?.offerPrice ?? productData?.offerPrice ?? 0;
  const finalMrp = activeVariant?.mrp ?? productData?.mrp ?? 0;

  const discountPercent =
    finalMrp > finalOfferPrice
      ? Math.round(((finalMrp - finalOfferPrice) / finalMrp) * 100)
      : 0;

  const stock = activeVariant?.countInStock ?? productData?.stock ?? 0;
  const colorName = activeVariant?.colorName ? activeVariant?.colorName :   productData?.color && productData?.color?.name
  const size = activeVariant?.size ? activeVariant?.size :  productData?.size
  const isLongUnit = !!size && size.length > 18; // tweak threshold
  // 🔥 CRITICAL FIX: Notify parent when default variant is selected
  useEffect(() => {
    // If no variant is selected but product has variants, select the first one
    if (!selectedVariant && productData?.variants?.length > 0) {
      onVariantChange?.(productData.variants[0]);
    }
  }, [selectedVariant, productData?.variants, onVariantChange]);

  return (
    <View style={styles.detailsWrapper}>
      {/* Name */}
     
      {productData?.name && <Text style={styles.title}>{productData.name}</Text> }
     
   
     
    {colorName && <Text style={styles.colorText}><Text style={{fontFamily:'Inter-SemiBold'}}>Color : </Text>{colorName}</Text>}
 
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          {Array.from({ length: fullStars }).map((_, i) => (
            <AntDesign key={`full-${i}`} name="star" size={20} color="#2E6074E8" />
          ))}
          {halfStar && <AntDesign name="staro" size={20} color="#2E6074E8" />}
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

      {/* Price & Stock */}
  <View style={styles.priceContainer}>
  {/* Row 1: price (+ unit)   |   stock */}
  <View style={styles.rowTop}>
    <View style={styles.leftTop}>
      <View style={styles.priceLine}>
        <Text style={styles.price}>₹{finalOfferPrice}</Text>

        {/* short unit stays inline */}
        {!!size && !isLongUnit && (
          <Text style={styles.unitText} numberOfLines={1} ellipsizeMode="tail">/ {size}</Text>
        )}
      </View>

      {/* long unit drops below price */}
      {!!size && isLongUnit && (
        <Text style={styles.unitTextLong} numberOfLines={2} ellipsizeMode="tail">
          {size}
        </Text>
      )}
    </View>

   
  </View>

  {/* Row 2: MRP + discount */}
  <View style={styles.rowBottom}>
    <Text style={styles.originalPrice}>₹{finalMrp}</Text>
    {finalMrp > finalOfferPrice && (
      <Text style={styles.discount}>{discountPercent}% OFF</Text>
    )}
  </View>
</View>

    </View>
  );
}