import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Description() {
  const [rating, setRating] = useState(0);
  const [maxRating] = useState([1, 2, 3, 4, 5]);

  const handleRating = (selectedRating) => {
    // If the star clicked is already the current rating, reset to 0
    // Otherwise set to the new rating
    setRating(selectedRating === rating ? 0 : selectedRating);
  };

  return (
    <View style={styles.detailsWrapper}>
      <Text style={styles.title}>
        Titan Karishma Analog Watch – For Women 2480SM02
      </Text>

      {/* Rating Component */}
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          {maxRating.map((item) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => handleRating(item)}
            >
              {item <= rating ? (
                <AntDesign name="star" size={20} color ='#2E6074E8' />
              ) : (
                <AntDesign name="staro" size={20} color="#D9D9D9" />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {rating > 0 ? (
          <Text style={styles.ratingText}>
            {rating.toFixed(0)} / 5 {rating === 1 ? 'star' : 'stars'}
          </Text>
        ) : (
          <Text style={styles.noRatingText}>No ratings yet</Text>
        )}
      </View>

      {/* Rest of your component remains the same */}
      <Text style={styles.price}>₹1,995</Text>
      <Text style={styles.subText}>Free delivery by 24th May</Text>
      <Text style={[styles.subText, {color: "#416F81"}]}>
        Seller: EliteEdge Pvt Limited
      </Text>
      <Text style={styles.label}>Size: Onesize</Text>
    </View>
  );
}