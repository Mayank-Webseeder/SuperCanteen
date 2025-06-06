import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';

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

      <FastImage
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


