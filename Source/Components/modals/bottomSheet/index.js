import React, { useEffect, useRef, useState,useMemo } from 'react';
import {
  Modal,
  View,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Platform,

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, Height } from '../../../constants';
import BottomActionButtons from '../../../otherComponents/productCategory/bottomActionButtons';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = Height(650);

// const filterCategories = ['Brand', 'Color', 'Size', 'New', 'Popular'];
const filterCategories = ['Brand', 'New', 'Popular'];

const CustomBottomSheet = ({ 
  visible, 
  onClose, 
  onApply, 
  initialFilters, 
  filterOptions,
  onReset
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [selectedCategory, setSelectedCategory] = useState('Brand');
  const [selectedColors, setSelectedColors] = useState(initialFilters.colors || []);
  const [selectedSizes, setSelectedSizes] = useState(initialFilters.sizes || []);
  const [selectedBrands, setSelectedBrands] = useState(initialFilters.brands || []);
  const [isNew, setIsNew] = useState(initialFilters.isNew || false);
  const [isPopular, setIsPopular] = useState(initialFilters.isPopular || false);
  
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

  const toggleSelection = (item, type) => {
    switch (type) {
      case 'color':
        setSelectedColors(prev =>
          prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item]
        );
        break;
      case 'size':
        setSelectedSizes(prev =>
          prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item]
        );
        break;
      case 'brand':
        setSelectedBrands(prev =>
          prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item]
        );
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setIsNew(false);
    setIsPopular(false);
    if (onReset) onReset();
  };

  const ResetButton = () => (
    <TouchableOpacity
      onPress={() => handleReset()}
      style={styles.footerButton} 
    >
      <Icon name="restore" size={18} color={COLORS.green} style={{ marginRight: 6, marginTop: 2 }} />
      <Text style={styles.resetText}>Reset</Text>
    </TouchableOpacity>
  );

  const renderRightPane = useMemo(() => {
    const renderBrands = () => (
      <View style={styles.rightPaneContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={styles.sectionTitle}>Select Brands</Text>
          <ResetButton/>
        </View>
        <View style={styles.optionsGrid}>
          {filterOptions.brands.length === 0 ? (
            <Text style={styles.emptyText}>No brands available for this product.</Text>
          ) : (
            filterOptions.brands.map(brand => (
              <TouchableOpacity
                key={brand}
                style={[
                  styles.optionItem,
                  selectedBrands.includes(brand) && styles.optionItemSelected,
                ]}
                onPress={() => toggleSelection(brand, 'brand')}
              >
                <Text style={styles.optionText}>{brand}</Text>
                {selectedBrands.includes(brand) && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="#376275"
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    );

  

    const renderNew = () => (
      <View style={styles.rightPaneContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <ResetButton/>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            onPress={() => setIsNew(!isNew)} 
            style={styles.checkboxTouchable}
          >
            <Ionicons
              name={isNew ? 'checkbox' : 'checkbox-outline'}
              size={24}
              color={isNew ? '#376275' : '#ccc'}
            />
            <Text style={styles.checkboxLabel}>Show only new products</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    const renderPopular = () => (
      <View style={styles.rightPaneContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <ResetButton/>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            onPress={() => setIsPopular(!isPopular)} 
            style={styles.checkboxTouchable}
          >
            <Ionicons
              name={isPopular ? 'checkbox' : 'checkbox-outline'}
              size={24}
              color={isPopular ? '#376275' : '#ccc'}
            />
            <Text style={styles.checkboxLabel}>Show only popular products</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return {
      Brand: renderBrands,
      // Color: renderColors,
      // Size: renderSizes,
      New: renderNew,
      Popular: renderPopular
    };
  }, [selectedBrands, selectedColors, selectedSizes, isNew, isPopular, filterOptions]);

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
                 backgroundColor: 'white', 
              },
              android: {
                elevation: 20,
                 backgroundColor: 'white',
                overflow: 'hidden', // Prevent content clipping
              },
            }),
          }
        ]}>
          <View style={styles.dragHandle} />
         <View style={[styles.mainContent, { overflow: 'hidden' }]}>
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

           <View style={[styles.rightColumn, { overflow: 'hidden' }]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.rightColumnContent}
              >
                {renderRightPane[selectedCategory]?.() || (
                  <View style={styles.rightPaneContainer}>
                    <Text style={styles.sectionTitle}>No Options Available</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>

          <BottomActionButtons
            onCancel={onClose}
            onApply={() => {
              onApply({
                colors: selectedColors,
                sizes: selectedSizes,
                brands: selectedBrands,
                isNew,
                isPopular
              });
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomBottomSheet;