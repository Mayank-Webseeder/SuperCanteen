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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Height } from '../../../constants';
import { styles } from './styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = Height(650)

const sortOptions = [
  'Discount',
  'Popular',
  'Price: Low to High',
  'Price: High to Low',
  'Best Seller',
  'Rating: High to Low',
  'Rating: Low to High',
];

const SortBottomSheet = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [selectedOption, setSelectedOption] = useState('Popular');
  const insets = useSafeAreaInsets();
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT - BOTTOM_SHEET_HEIGHT,
          duration: 300,
          useNativeDriver: false,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: false,
        })
      ]).start();
    }
  }, [visible]);

  const selectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <Modal animationType={'fade'} transparent visible={visible} onRequestClose={onClose}>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity 
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

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
        <Text style={styles.header}>Sort By</Text>

        <View style={styles.contentContainer}>
          <ScrollView 
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionItem,
                  selectedOption === option && styles.optionItemSelected
                ]}
                onPress={() => selectOption(option)}
              >
                <Ionicons
                  name={selectedOption === option ? 'radio-button-on' : 'radio-button-off'}
                  size={22}
                  color="#2E6074"
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
         <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity 
              onPress={onClose} 
              style={[styles.footerButton, styles.cancelButton]}
            >
              <Text style={styles.footerButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                console.log('Selected sort:', selectedOption);
                onClose();
              }} 
              style={[styles.footerButton, styles.applyButton]}
            >
              <Text style={[styles.footerButtonText, styles.applyButtonText]}>Apply</Text>
            </TouchableOpacity>
          </View>
    </Modal>
  );
};

export default SortBottomSheet;