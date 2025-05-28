import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { Verified } from '../../assets/Icons/svgIcons/verified';
import { Width } from '../constants/constants';

const productDetails = [
  { label: 'Features', value: 'Reset Time' },
  { label: 'Strap Material', value: 'Stainless Steel' },
  { label: 'Make', value: 'Non-Swiss Made' },
  { label: 'Strap Closure', value: 'Foldover' },
  { label: 'Water Resistance', value: 'Water Resistant' },
  { label: 'Power Source', value: 'Battery' },
  { label: 'Display Type', value: 'Analogue' },
  { label: 'Warranty Period', value: '2 Year' },
];

const CustomProductDetailsData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Product Details</Text>

      <View style={styles.grid}>
        {productDetails.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity>
        <Text style={styles.more}>More</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Ratings & Reviews</Text>
      <View style={styles.ratingRow}>
        <Text style={styles.ratingNumber}>4.9</Text>
        <FontAwesome name="star" size={18} color="#0B450C" style={styles.icon} />
        <Text style={styles.grayText}>895 Ratings | 200 Reviews</Text>
        <Verified/>
        <TouchableOpacity style={styles.containerStyle}>
          <Text style={styles.viewMore}>View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex:1,
   
  },
  sectionTitle: {
    fontFamily:'Inter-Bold',
    fontSize: 16,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: 16,
  },
  label: {
   fontFamily:'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    fontFamily:'Inter-Regular'
  },
  more: {
    color: '#2E6074AD',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily:'Inter-Medium'
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B450C',
    marginRight: 4,
  },
  icon: {
    marginHorizontal: 4,
  },
  grayText: {
    color: '#666',
    fontSize: 14,
    marginRight: 8,
    fontFamily:'Inter-Regular'
  },
  viewMore: {
    color: '#5a9cae',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily:'Inter-Medium'
  },
  containerStyle:{
    left:Width(10)
  }
});

export default CustomProductDetailsData;
