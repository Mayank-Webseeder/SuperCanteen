// Description.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

export default function Description({ productData }) {
  const rating = productData?.rating || 0;
  const reviews = productData?.numReviews || 0;

  // Round to nearest half-star:
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  // Delivery date
  const deliveryDate = moment()
    .add(productData?.deliveryDays, 'days')
    .format('Do MMMM');

  return (
    <View style={styles.detailsWrapper}>
      {/* Name */}
      {productData?.name && (
        <Text style={styles.title}>{productData.name}</Text>
      )}

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
        
          {Array.from({ length: fullStars }).map((_, i) => (
            <AntDesign key={`full-${i}`} name="star" size={20} color="#2E6074E8" />
          ))}

         
          {halfStar && (
            <AntDesign name="staro" size={20} color="#2E6074E8">
            
            </AntDesign>
          )}

        
          {Array.from({ length: emptyStars }).map((_, i) => (
            <AntDesign key={`empty-${i}`} name="staro" size={20} color="#D9D9D9" />
          ))}
        </View>

        {reviews > 0 ? (
          <Text style={styles.ratingText}>
            {rating.toFixed(1)} / 5 • {reviews}{' '}
            {reviews === 1 ? 'review' : 'reviews'}
          </Text>
        ) : (
          <></>
          // <Text style={styles.noRatingText}>No ratings yet</Text>
        )}
      </View>

      {/* Price */}
      <View style={styles.priceContainer}>
        {productData?.offerPrice != null && (
          <Text style={styles.price}>₹{productData.offerPrice}</Text>
        )}
        {productData?.mrp && productData.offerPrice < productData.mrp && (
          <Text style={styles.originalPrice}>₹{productData.mrp}</Text>
        )}
        {productData?.discountPercent > 0 && (
          <Text style={styles.discount}>{productData?.discountPercent}% OFF</Text>
        )}
      </View>

      {/* Delivery */}
    {/* {productData?.shippingInfo &&   <Text style={styles.subText}>
        {productData?.shippingInfo?.shippingRate === 0
          ? 'FREE'
          : `₹${productData?.shippingInfo?.shippingRate}`}{' '}
        delivery by {deliveryDate}
      </Text>} */}

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
