// src/Components/common/ContentSkeletonLoader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, Height, Width } from '@constants/index';

const ContentSkeletonLoader = ({ type = 'home', itemCount = 3 }) => {
  // Different skeleton types for different screens
  const renderSkeleton = () => {
    switch (type) {
      case 'home':
        return (
          <View style={styles.container}>
            {/* Brand Carousel Skeleton */}
            <View style={styles.skeletonHeader} />
            <View style={styles.skeletonCarousel}>
              {[...Array(4)].map((_, i) => (
                <View key={i} style={styles.skeletonBrand} />
              ))}
            </View>
            
            {/* Categories Skeleton */}
            <View style={[styles.skeletonHeader, {marginTop: 20}]} />
            <View style={styles.skeletonCategories}>
              {[...Array(5)].map((_, i) => (
                <View key={i} style={styles.skeletonCategory} />
              ))}
            </View>
            
            {/* Product Carousel Skeleton */}
            <View style={[styles.skeletonHeader, {marginTop: 20}]} />
            <View style={styles.skeletonProducts}>
              {[...Array(itemCount)].map((_, i) => (
                <View key={i} style={styles.skeletonProduct} />
              ))}
            </View>
          </View>
        );
      
      case 'list':
        return (
          <View style={styles.container}>
            {[...Array(itemCount)].map((_, i) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.listImage} />
                <View style={styles.listContent}>
                  <View style={styles.listLine} />
                  <View style={[styles.listLine, {width: '70%'}]} />
                  <View style={[styles.listLine, {width: '50%'}]} />
                </View>
              </View>
            ))}
          </View>
        );
      
      default:
        return (
          <View style={styles.container}>
            <View style={styles.skeletonHeader} />
            <View style={styles.skeletonLine} />
            <View style={styles.skeletonLine} />
            <View style={[styles.skeletonLine, {width: '60%'}]} />
          </View>
        );
    }
  };

  return renderSkeleton();
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  skeletonHeader: {
    height: 20,
    width: '40%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 15,
  },
  skeletonCarousel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skeletonBrand: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.lightGray,
  },
  skeletonCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skeletonCategory: {
    width: '30%',
    height: 100,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 15,
  },
  skeletonProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeletonProduct: {
    width: '45%',
    height: 150,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGray,
    marginRight: 15,
  },
  listContent: {
    flex: 1,
  },
  listLine: {
    height: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 8,
    width: '90%',
  },
});

export default ContentSkeletonLoader;