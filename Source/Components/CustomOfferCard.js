import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Height, Width } from '../constants/constants';

const OfferCardItem = ({ item, enableBadg, enablePriceRow,navigation }) => {
  const { image, title, price, mrp, discount } = item;

  return (
    <TouchableOpacity   onPress={() => {
                if (item.screen && navigation) {
                  navigation.navigate(item.screen);
                }
              }}>
 <LinearGradient
      colors={['#D4E7F2', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.card}
    >
      {enableBadg && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{discount}%{'\n'}OFF</Text>
        </View>
      )}

      <Image
        source={image}
        style={styles.image}
        resizeMode="contain"
        onError={(e) => {
          console.log('Image load error:', e.nativeEvent.error);
        }}
      />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>

        {enablePriceRow && (
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{price}</Text>
            <Text style={styles.mrp}>M.R.P ₹{mrp}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
    </TouchableOpacity>
   
  );
};

const CustomOfferCard = ({ item, enableBadg = true, enablePriceRow = true , navigation }) => {
  return (
    <FlatList
      nestedScrollEnabled={true}
      horizontal
      data={item}
      keyExtractor={(offer) => offer.id}
      renderItem={({ item }) => (
        <OfferCardItem navigation={navigation} item={item} enableBadg={enableBadg} enablePriceRow={enablePriceRow} />
      )}
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CustomOfferCard;

const styles = StyleSheet.create({
  list: {
    paddingLeft: 9,
    paddingTop: 30,
    paddingBottom: 20,
  },
  card: {
    width: Width(120),
    height: Height(155),
    marginRight: 12,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginHorizontal:Height(10)
  },
  badge: {
    position: 'absolute',
    top: -15,
    left: -10,
    backgroundColor: '#890D0D',
    borderRadius: 999,
    width: 40,
    height: 40,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    marginTop: 10,
    borderRadius: 4,
  },
  details: {
    marginTop: 8,
  },
  title: {
    fontSize: 12,
    fontFamily:'Inter-Medium',
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    fontFamily:'Inter-Bold',
    color: '#000',
    marginRight: 6,
  },
  mrp: {
    fontSize: 11,
    color: '#888',
    textDecorationLine: 'line-through',
    fontFamily:'Inter-Regular'
  },
});
