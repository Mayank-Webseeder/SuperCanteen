import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, Height } from '../../constants/constants';
import BottomActionButtons from '../../otherComponents/productCategory/BottomActionButtons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = Height(650);

const filterCategories = ['Brand', 'Color', 'Size', 'New', 'Popular'];
const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Grey', 'Pink', 'Orange', 'Purple', 'Brown', 'Beige', 'Maroon'];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

const CustomBottomSheet = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [selectedCategory, setSelectedCategory] = useState('Color');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSelection = (item, type) => {
    if (type === 'color') {
      setSelectedColors(prev =>
        prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item]
      );
    } else {
      setSelectedSizes(prev =>
        prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item]
      );
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT - BOTTOM_SHEET_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const renderRightPane = () => {
    switch (selectedCategory) {
      case 'Color':
        return (
          <View style={styles.rightPaneContainer}>
            <Text style={styles.sectionTitle}>Select Colors</Text>
            <View style={styles.optionsGrid}>
              {colorOptions.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.optionItem,
                    selectedColors.includes(color) && styles.optionItemSelected
                  ]}
                  onPress={() => toggleSelection(color, 'color')}
                >
                  <View style={[
                    styles.colorCircle,
                    { backgroundColor: color.toLowerCase() }
                  ]} />
                  <Text style={styles.optionText}>{color}</Text>
                  {selectedColors.includes(color) && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#376275"
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      
      case 'Size':
        return (
          <View style={styles.rightPaneContainer}>
            <Text style={styles.sectionTitle}>Select Sizes</Text>
            <View style={styles.optionsGrid}>
              {sizeOptions.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSizes.includes(size) && styles.sizeOptionSelected
                  ]}
                  onPress={() => toggleSelection(size, 'size')}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSizes.includes(size) && styles.sizeTextSelected
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      
      default:
        return (
          <View style={styles.rightPaneContainer}>
            <Text style={styles.sectionTitle}>No Options Available</Text>
          </View>
        );
    }
  };

  return (
    <Modal animationType="none" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <TouchableOpacity 
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <Animated.View style={[
          styles.sheet, 
          { 
            transform: [{ translateY: slideAnim }],
            height: BOTTOM_SHEET_HEIGHT,
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
              },
              android: {
                elevation: 20,
              },
            }),
          }
        ]}>
          <View style={styles.dragHandle} />
          
          <View style={styles.mainContent}>
            <View style={styles.leftColumn}>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.leftColumnContent}
              >
                {filterCategories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category && styles.categoryButtonSelected
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category && styles.categoryTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.rightColumn}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.rightColumnContent}
              >
                {renderRightPane()}
              </ScrollView>
            </View>
          </View>

          
        </Animated.View>
      <BottomActionButtons
  onCancel={onClose}
  onApply={() => {
    // console.log('Selected sort:', selectedOption);
    onClose();
  }}
  // applyDisabled={!selectedOption}
/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: 120,
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
  },
  leftColumnContent: {
    paddingBottom: 20,
  },
  rightColumn: {
    flex: 1,
  },
  rightColumnContent: {
    paddingBottom: 100, // Ensure space for footer
  },
  rightPaneContainer: {
    paddingLeft: 12,
    paddingBottom: 20,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#f0f8ff',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTextSelected: {
    color: '#376275',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  optionItemSelected: {
    borderColor: '#376275',
    backgroundColor: '#f0f8ff',
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  sizeOption: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  sizeOptionSelected: {
    borderColor: '#376275',
    backgroundColor: '#f0f8ff',
  },
  sizeText: {
    fontSize: 14,
    color: '#555',
  },
  sizeTextSelected: {
    color: '#376275',
    fontWeight: '600',
  }
});

export default CustomBottomSheet;