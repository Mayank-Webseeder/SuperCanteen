import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { Height } from '../constants';
import RenderHtml from 'react-native-render-html';
import Collapsible from 'react-native-collapsible';
import { COLORS } from '../constants';
import { decode } from 'html-entities';

const CustomProductDetailsData = ({ productData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { width } = useWindowDimensions();

  // HTML render configuration
  const htmlConfig = {
    baseStyle: {
      fontSize: 14,
      color: '#2E6074',
      lineHeight: 22,
      fontFamily: 'Inter-Regular',
    },
    tagsStyles: {
      strong: {
        fontWeight: 'bold',
        color: '#2E6074',
      },
      em: {
        fontStyle: 'italic',
      },
      p: {
        // marginBottom: 3,
      },
      ul: {
        // marginBottom: 3,
        paddingLeft: 20,
      },
      ol: {
        marginBottom: 6,
        paddingLeft: 20,
      },
      li: {
        // marginBottom: 3,
      },
      a: {
        color: COLORS.primary,
        textDecorationLine: 'underline',
      },
      br: {
        height: 12,
      },
    },
    enableExperimentalBRCollapsing: true,
    enableExperimentalGhostLinesPrevention: true,
    defaultTextProps: {
      selectable: true,
    },
    systemFonts: ['Inter-Regular', 'Inter-Bold', 'Inter-SemiBold']
  };

  // Prepare specification lines with HTML support
  const specLines = useMemo(() => {
    if (!productData?.specification) return [];
    return productData.specification
      .split(/<br\s*\/?>|<\/p>|<\/li>/)
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.match(/^<\w+>$/));
  }, [productData.specification]);

  // Only show "Read More" if content is long
  const showReadMore = productData?.description?.length > 200;

  return (
    <ScrollView style={styles.container}>
       {/* Description */}
      {productData?.description && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Description</Text>
          <Collapsible
            collapsed={isCollapsed}
            collapsedHeight={100}
            duration={300}
          >
            <RenderHtml
              contentWidth={width - 32}
              source={{ html: decode(productData.description) }}
              {...htmlConfig}
            />
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
      )}

      {/* Specifications */}
{specLines.length > 0 &&  
  <View style={styles.section}>
  <Text style={[styles.sectionTitle, { marginTop: 6 }]}>Specifications</Text>
  <View style={styles.specsContainer}>
    <RenderHtml
      contentWidth={width - 60}
      source={{ html: decode(specLines.join('<br/>')) }}
      {...htmlConfig}
    />
  </View>
</View> }
     
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
    justifyContent: "center"
  },
  bullet: {
    height: 6,
    width: 6,
    borderRadius: 20,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: Height(7)
  },
  specValue: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#2E6074',
    fontFamily: 'Inter-Regular',
    marginHorizontal: 7
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
  readMoreButton: { marginTop: 10, paddingHorizontal: 4 },
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