import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Height } from '../../../constants';
import BottomActionButtons from '../../../otherComponents/productCategory/bottomActionButtons';
import { styles } from './styles';

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


export default CustomBottomSheet;