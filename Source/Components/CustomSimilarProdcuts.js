import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        <Image
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

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginRight: 16,
    padding: 10,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: 4,
    color: '#1B1B1B',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reviews: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
});
