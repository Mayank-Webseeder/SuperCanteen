import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { FontSize, Height } from '../constants/constants';

const DATA = [
  {
    id: '1',
    title: 'Sonata',
    price: '₹ 4,000',
    image: require('../../assets/MensWatch/item2.png'),
  },
  {
    id: '2',
    title: 'Sonata',
    price: '₹ 4,000',
    image: require('../../assets/MensWatch/item1.png'),
  },
  {
    id: '3',
    title: 'Sonata',
    price: '₹ 4,000',
    image: require('../../assets/MensWatch/item2.png'),
  },
];

const WatchCard = ({ item, useGradientBackground, isFavourite, onToggleFavourite }) => {
  const CardWrapper = useGradientBackground ? LinearGradient : View;
  const wrapperProps = useGradientBackground
    ? {
        colors: ['#FFFFFF', '#7B868C'],
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        style: styles.card,
      }
    : { style: [styles.card, { backgroundColor: '#fff' }] };

  return (
    <CardWrapper {...wrapperProps}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.footer}>
        <View style={{ marginHorizontal: 7 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <TouchableOpacity onPress={() => onToggleFavourite(item.id)} style={{ marginHorizontal: Height(3) }}>
          <Ionicons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavourite ? 'red' : '#0E2D42'}
          />
        </TouchableOpacity>
      </View>
    </CardWrapper>
  );
};

export default function CustomFavoriteCard({ whiteBg = false, listStyle }) {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <FlatList
      data={DATA}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <WatchCard
          item={item}
          useGradientBackground={!whiteBg}
          isFavourite={favourites.includes(item.id)}
          onToggleFavourite={toggleFavourite}
        />
      )}
      contentContainerStyle={[styles.list, listStyle]}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 9,
    marginTop: 48,
  },
  card: {
    width: 116,
    height: 176,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
    padding: 8,
    justifyContent: 'space-between',
    marginHorizontal: Height(4),
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  title: {
    fontSize: FontSize(12),
    fontFamily: 'Inter-SemiBold',
    color: '#2E6074E8',
  },
  price: {
    fontSize: 11,
    color: '#555',
    fontFamily: 'Inter-Regular',
  },
});
