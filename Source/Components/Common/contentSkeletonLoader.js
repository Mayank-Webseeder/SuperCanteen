// src/Components/common/ProductDetailsSkeleton.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, Height, Width } from '@constants/index';

const ContentSkeletonLoader = () => {
  return (
    <View style={styles.container}>
      {/* Header Area */}
      <View style={styles.header}>
        <View style={styles.headerBack} />
        <View style={styles.headerTitle} />
        <View style={styles.headerCart} />
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchBar} />
      
      {/* Image Gallery */}
      <View style={styles.imageGallery} />
      
      {/* Product Title */}
      <View style={styles.productTitle} />
      <View style={[styles.productTitle, {width: '70%'}]} />
      
      {/* Price */}
      <View style={styles.price} />
      
      {/* Variants */}
      <View style={styles.sectionTitle} />
      <View style={styles.variantContainer}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.variantItem} />
        ))}
      </View>
      
      {/* Coupons */}
      <View style={styles.sectionTitle} />
      <View style={styles.couponItem} />
      
      {/* Shipping Info */}
      <View style={styles.sectionTitle} />
      <View style={styles.shippingInfo} />
      
      {/* Policies */}
      <View style={styles.policyItem} />
      <View style={styles.policyItem} />
      
      {/* Details Section */}
      <View style={styles.sectionTitle} />
      <View style={styles.detailItem} />
      <View style={styles.detailItem} />
      <View style={[styles.detailItem, {width: '60%'}]} />
      
      {/* Similar Products */}
      <View style={styles.sectionTitle} />
      <View style={styles.similarProducts}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.similarProductItem}>
            <View style={styles.similarProductImage} />
            <View style={styles.similarProductText} />
            <View style={styles.similarProductPrice} />
          </View>
        ))}
      </View>
      
      {/* Bottom Bar */}
      <View style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  headerBack: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
  },
  headerTitle: {
    width: 200,
    height: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
  },
  headerCart: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.lightGray,
  },
  searchBar: {
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 15,
  },
  imageGallery: {
    height: Height(200),
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 20,
  },
  productTitle: {
    height: 20,
    width: '90%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  price: {
    height: 24,
    width: '30%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    height: 18,
    width: '40%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 10,
  },
  variantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  variantItem: {
    width: 70,
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  couponItem: {
    height: 60,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 20,
  },
  shippingInfo: {
    height: 50,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 15,
  },
  policyItem: {
    height: 20,
    width: '80%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 10,
  },
  detailItem: {
    height: 16,
    width: '90%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  similarProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  similarProductItem: {
    width: '48%',
    marginBottom: 15,
  },
  similarProductImage: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarProductText: {
    height: 14,
    width: '80%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 6,
  },
  similarProductPrice: {
    height: 14,
    width: '50%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
  },
  bottomBar: {
    height: 60,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 15,
  },
});

export default ContentSkeletonLoader;