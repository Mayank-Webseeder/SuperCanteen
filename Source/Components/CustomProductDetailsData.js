import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  useWindowDimensions,
  Animated
} from 'react-native';
import { Height } from '../constants';
import RenderHtml from 'react-native-render-html';
import Collapsible from 'react-native-collapsible';
import { COLORS } from '../constants';
import { decode } from 'html-entities';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomProductDetailsData = ({ productData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { width } = useWindowDimensions();
  const scrollY = new Animated.Value(0);

  console.log("9999999999999999999999",productData?.warrantyPeriod )

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
        marginBottom: 12,
      },
      ul: {
        marginBottom: 12,
        paddingLeft: 20,
      },
      ol: {
        marginBottom: 12,
        paddingLeft: 20,
      },
      li: {
        marginBottom: 6,
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
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle,{marginTop:8}]}>Description</Text>
          </View>
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
             <Feather 
          name={isCollapsed ? "chevron-down" : "chevron-up"} 
          size={16} 
          color="#b0a8a8ff"
        />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Specifications */}
      {(specLines.length > 0 || productData?.warrantyPeriod && Number(productData.warrantyPeriod) > 0) && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}> Specifications</Text>
          </View>
          
          <View style={styles.specsContainer}>
            {/* Warranty Period - Enhanced */}
            {productData?.warrantyPeriod.length !== 0 && (
              <View style={styles.warrantyContainer}>
              
                <View >
                  <View style={styles.warrantyDetailRow}>
                    <Text style={styles.warrantyDetailLabel}>Warranty Period:</Text>
                 
                      <Text style={styles.warrantyPeriodText}>
                        {productData.warrantyPeriod} {productData.warrantyPeriod > 1 ? "Months" : "Month"}
                      </Text>
                    
                  </View>
                  
                  <View style={styles.warrantyNote}>
                    <Icon name="info-outline" size={14} color="#666" style={styles.infoIcon} />
                    <Text style={styles.warrantyNoteText}>
                      Please keep your invoice safe as it's required for warranty claims
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Other Specifications */}
            {specLines.length > 0 && (
              <View style={styles.specsListContainer}>
                <View style={styles.specsHeader}>
                  <Text style={styles.specsSubtitle}>Product Specifications</Text>
                </View>
                
                <View style={styles.specsContent}>
                  <RenderHtml
                    contentWidth={width - 60}
                    source={{ html: decode(specLines.join('<br/>')) }}
                    {...htmlConfig}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  section: {
    marginBottom: 10,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F7',
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 1,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#2E6074',
  
  },
  specsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 0,
    borderWidth: 1,
    borderColor: '#E8F1F5',
    overflow: 'hidden',
  },
  warrantyContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F7',
  },
  warrantyDetailRow: {
    flexDirection: 'row',
  },
  warrantyDetailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  warrantyPeriodText: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    color:COLORS.green,
    marginHorizontal:5
  },
  warrantyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    padding: 12,
    backgroundColor: '#F9FBFC',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#B2E5D6',
    
    
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  warrantyNoteText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  specsListContainer: {
    padding: 16,
  },
  specsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  specsIcon: {
    marginRight: 8,
  },
  specsSubtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#2E6074',
  },
  specsContent: {
    paddingLeft: 4,
  },
  readMoreButton: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 4,
  },
  readMoreText: {
    color: '#2E6074AD',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 6,
  },
});

export default CustomProductDetailsData;