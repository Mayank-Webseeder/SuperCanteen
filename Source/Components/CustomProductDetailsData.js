import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Height } from '../constants';
import { stripHtml } from '../utils/dataFormatters';
import Collapsible from 'react-native-collapsible';
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
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  discount: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.red,
    fontFamily: 'Inter-SemiBold',
  },
});

export default CustomProductDetailsData;
