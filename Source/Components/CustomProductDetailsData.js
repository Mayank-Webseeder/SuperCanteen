// CustomProductDetailsData.js
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Verified } from '../../assets/Icons/svgIcons/verified';
import { Width, Height } from '../constants';
import { stripHtml } from '../utils/dataFormatters';
import Collapsible from 'react-native-collapsible';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { COLORS } from '../constants';

const CustomProductDetailsData = ({ productData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Clean description
  const descriptionText = productData?.description
    ? stripHtml(productData.description)
    : '';

  // Only show "Read More" if > 150 chars
  const showReadMore = descriptionText.length > 150;

  // Prepare spec lines for bullets
  const specLines = useMemo(() => {
    if (!productData?.specification) return [];
    // split on newlines or periods
    return stripHtml(productData.specification)
      .split(/\r?\n|\.\s+/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }, [productData.specification]);

  // Rating & reviews
  const rating = productData?.rating || 0;
  const reviews = productData?.numReviews || 0;

  // Delivery date
  const deliveryDate = moment()
    .add(productData?.deliveryDays || 5, 'days')
    .format('Do MMMM');

  // Discount
  const discountPercent =
    productData?.mrp && productData?.offerPrice
      ? Math.round(
          ((productData.mrp - productData.offerPrice) / productData.mrp) * 100
        )
      : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Specifications */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle,{marginTop:14}]}>Product Details</Text>
        {specLines.length > 0 ? (
          <View style={styles.specsContainer}>
            {specLines.map((line, i) => (
              <View style={styles.specRow} key={i}>
                <Text style={styles.bullet}></Text>
                <Text style={styles.specValue}>{line}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDetails}>No specifications available</Text>
        )}
      </View>

      {/* Description */}
      {descriptionText ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Collapsible
            collapsed={isCollapsed}
            collapsedHeight={100}
            duration={300}       // smooth 300ms animation
          >
            <Text style={styles.descriptionText}>{descriptionText}</Text>
          </Collapsible>
          {showReadMore && (
            <TouchableOpacity
              onPress={() => setIsCollapsed(!isCollapsed)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {isCollapsed ? 'Read More' : 'Read Less'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}

      {/* Ratings & Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
        {reviews > 0 ? (
          <View style={styles.ratingCard}>
            <View style={styles.ratingHeader}>
              <Text style={styles.ratingNumber}>
                {rating.toFixed(1)}
              </Text>
              <Text style={styles.ratingOutOf}>/5</Text>
              <FontAwesome
                name="star"
                size={18}
                color="#0B450C"
                style={styles.starIcon}
              />
            </View>
            <View style={styles.ratingDetails}>
              <Text style={styles.grayText}>
                {reviews} {reviews === 1 ? 'Rating' : 'Reviews'}
              </Text>
              <Verified />
            </View>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View All Reviews</Text>
              <AntDesign name="right" size={14} color="#2E6074" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noReviewsContainer}>
            <FontAwesome name="star-o" size={24} color="#999" />
            <Text style={styles.noReviewsText}>No reviews yet</Text>
            <TouchableOpacity style={styles.addReviewButton}>
              <Text style={styles.addReviewText}>
                Be the first to review
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

    
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  section: {
    marginBottom: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F7',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#2E6074',
    // marginTop:10
  },
  specsContainer: {
    backgroundColor: '#F9FBFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F1F5',
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    justifyContent:"center"
  },
  bullet: {
    height:6,
    width:6,
    borderRadius:20,
    backgroundColor:COLORS.green,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    marginTop:Height(7)
  },
  specValue: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#2E6074',
    fontFamily: 'Inter-Regular',
    marginHorizontal:7
  },
  noDetails: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#2E6074',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 16,
  },
  readMoreButton: { marginTop: 10, paddingHorizontal: 16 },
  readMoreText: {
    color: '#2E6074AD',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textDecorationLine: 'underline',
  },
  ratingCard: {
    backgroundColor: '#F9FBFC',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8F1F5',
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B450C',
  },
  ratingOutOf: {
    fontSize: 18,
    color: '#416F81',
    marginHorizontal: 4,
  },
  starIcon: { marginLeft: 5 },
  ratingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  grayText: {
    color: '#416F81',
    fontSize: 14,
    marginRight: 8,
    fontFamily: 'Inter-Regular',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#E8F1F5',
    borderRadius: 8,
  },
  viewMoreText: {
    color: '#2E6074',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 5,
  },
  noReviewsContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FBFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8F1F5',
  },
  noReviewsText: {
    color: '#999',
    fontSize: 14,
    marginVertical: 10,
    fontFamily: 'Inter-Regular',
  },
  addReviewButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E6074',
  },
  addReviewText: {
    color: '#2E6074',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  originalPrice: {
    fontSize: 14,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discount: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.red,
    fontFamily: 'Inter-SemiBold',
  },
  subText: {
    fontSize: 14,
    color: '#2E6074',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 16,
    marginTop: 4,
  },
});

export default CustomProductDetailsData;
