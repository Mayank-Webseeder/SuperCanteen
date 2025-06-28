import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { IMGURL } from '../../../utils/dataFormatters';
import { styles } from './styles';
import { COLORS } from '@constants/index';
// Fire icon component - easy to copy/paste
const FireIcon = () => (
  <Text style={styles.fireIcon}>🔥</Text>
);

const HotDealsSection = ({ sections }) => {
  const navigation = useNavigation();

  const renderDealItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.product._id })}
    >
      <View style={styles.dealCard}>
        {/* Hot Deal Ribbon */}
        <View style={styles.hotRibbon}>
          <FireIcon />
          <Text style={styles.hotRibbonText}>HOT DEAL</Text>
        </View>

        {/* Product Image */}
        <FastImage
          source={{ uri: `${IMGURL}${item.product.images[0]}` }}
          style={styles.productImage}
          resizeMode="contain"
        />

        {/* Product Details */}
       
          <Text style={styles.productName} numberOfLines={2}>
            {item.product.name}
          </Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ {item.product.rating || 4.0}</Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>₹{item.product.offerPrice}</Text>
            <View style={styles.discountPill}>
              <FireIcon />
              <Text style={styles.discountText}>SAVE ₹{Math.round(item.product.offerPrice * 0.2)}</Text>
            </View>
          </View>
        </View>
     
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      {sections.map((section) => (
        <View key={section._id} style={styles.sectionContainer}>
          {/* Section Header with Fire Icon */}
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <FireIcon />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
          </View>

          {/* Deals List */}
          <FlatList
            horizontal
            data={section.products}
            renderItem={renderDealItem}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      ))}
    </View>
  );
};



export default HotDealsSection;