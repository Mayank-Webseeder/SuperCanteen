import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

const RatingSection = ({ orderId }) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Add your rating submission logic here
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rate your experience</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => !submitted && setRating(star)}
          >
            <Icon
              name={star <= rating ? 'star' : 'star-border'}
              size={32}
              color={star <= rating ? '#FFD700' : '#ccc'}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      {!submitted && (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Rating</Text>
        </TouchableOpacity>
      )}

      {submitted && (
        <Text style={styles.thanksText}>Thank you for your rating!</Text>
      )}
    </View>
  );
};

export default RatingSection;