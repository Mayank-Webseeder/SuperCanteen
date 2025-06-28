// src/Components/common/ContentSkeletonLoader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, Height, Width } from '@constants/index';
const ContentSkeletonLoader = ({ type = 'default', itemCount = 3 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'brand':
        return (
          <View style={[styles.carouselContainer, styles.horizontalPadding]}>
            <View style={styles.carouselSkeleton}>
              {[...Array(4)].map((_, i) => (
                <View key={i} style={styles.brandItemSkeleton} />
              ))}
            </View>
          </View>
        );
      
      case 'category':
        return (
          <View style={styles.horizontalPadding}>
            <View style={styles.categoryTitleSkeleton} />
            <View style={styles.categoryContainerSkeleton}>
              {[...Array(5)].map((_, i) => (
                <View key={i} style={styles.categoryItemSkeleton} />
              ))}
            </View>
          </View>
        );
      
      case 'product':
        return (
          <View style={styles.horizontalPadding}>
            <View style={styles.productGridSkeleton}>
              {[...Array(itemCount)].map((_, i) => (
                <View key={i} style={styles.productItemSkeleton}>
                  <View style={styles.productImageSkeleton} />
                  <View style={styles.productTextSkeleton} />
                  <View style={styles.productPriceSkeleton} />
                </View>
              ))}
            </View>
          </View>
        );
      
      default:
        return (
          <View style={styles.horizontalPadding}>
            <View style={styles.defaultSkeleton} />
            <View style={styles.defaultSkeleton} />
            <View style={[styles.defaultSkeleton, {width: '60%'}]} />
          </View>
        );
    }
  };

  return renderSkeleton();
};

const styles = StyleSheet.create({
  horizontalPadding: {
    paddingHorizontal: 15,
    marginBottom: 20
  },
  carouselContainer: {
    marginTop: 10
  },
  carouselSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  brandItemSkeleton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.lightGray
  },
  categoryTitleSkeleton: {
    height: 20,
    width: '40%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 10
  },
  categoryContainerSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryItemSkeleton: {
    width: '30%',
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
     marginBottom: 10
  },
  productGridSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  productItemSkeleton: {
    width: '48%',
    marginBottom: 20
  },
  productImageSkeleton: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 10
  },
  productTextSkeleton: {
    height: 12,
    width: '80%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 6
  },
  productPriceSkeleton: {
    height: 12,
    width: '50%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4
  },
  defaultSkeleton: {
    height: 12,
    width: '100%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginBottom: 8
  }
});

export default ContentSkeletonLoader