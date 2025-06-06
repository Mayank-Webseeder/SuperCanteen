import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';

const CustomSimilarProducts = ({ cardHeight = 240, cardWidth = 160, data }) => {
  const renderItem = ({ item }) => {
    const fullStars = Math.floor(item.rating || 0);
    const stars = [...Array(5)].map((_, i) => (
      <FontAwesome
        key={i}
        name={i < fullStars ? 'star' : 'star-o'}
        size={14}
        color={i < fullStars ? '#4CAF50' : '#CFCFCF'}
        style={{ marginRight: 2 }}
      />
    ));

    return (
      <View style={[styles.card, { height: cardHeight, width: cardWidth }]}>
        <FastImage
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={styles.image}
          resizeMode="cover"
        />
        <Text numberOfLines={1} style={styles.title}>
          <Text style={styles.bold}>Timex </Text>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.ratingRow}>
          {stars}
          <Text style={styles.reviews}>({item.reviews || 0})</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

export default CustomSimilarProducts;


