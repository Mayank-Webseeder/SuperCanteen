import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Height, Width } from '../../constants/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const filterCategories = ['Brand', 'Color', 'Size', 'New', 'Popular'];
const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Grey', 'Pink', 'Orange', 'Purple', 'Brown', 'Beige', 'Maroon'];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

const CustomBottomSheet = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(Height(1000))).current;
  const [selectedCategory, setSelectedCategory] = useState('Color');
  const [selectedColors, setSelectedColors] = useState(['White', 'Blue', 'Yellow', 'Pink', 'Orange']);
  const [selectedSizes, setSelectedSizes] = useState(['XS']);

  const toggleSelection = (item, type) => {
    if (type === 'color') {
      setSelectedColors((prev) =>
        prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
      );
    } else {
      setSelectedSizes((prev) =>
        prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
      );
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: Height(1000) - Height(860),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Height(1000),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const renderRightPane = () => {
    if (selectedCategory === 'Color') {
      return (
        <View>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={{ gap: 12 }}>
            {colorOptions.map((color) => (
              <TouchableOpacity
                key={color}
                style={styles.optionRow}
                onPress={() => toggleSelection(color, 'color')}
              >
                <Ionicons
                  name={
                    selectedColors.includes(color)
                      ? 'checkbox'
                      : 'square-outline'
                  }
                  size={20}
                  color="#376275"
                />
                <Text style={styles.optionText}>{color}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity>
              <Text style={styles.seeMore}>See More</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (selectedCategory === 'Size') {
      return (
        <View>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={{ gap: 12 }}>
            {sizeOptions.map((size) => (
              <TouchableOpacity
                key={size}
                style={styles.optionRow}
                onPress={() => toggleSelection(size, 'size')}
              >
                <Ionicons
                  name={
                    selectedSizes.includes(size)
                      ? 'checkbox'
                      : 'square-outline'
                  }
                  size={20}
                  color="#376275"
                />
                <Text style={styles.optionText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.sectionTitle}>No Options</Text>
      </View>
    );
  };

  return (
    <Modal  animationType="none" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sheet, { top: slideAnim }]}>
        <View style={styles.dragHandle} />

        {/* Main Content */}
        <View style={{ flex: 1 }}>
  <View style={styles.container}>
    {/* Left Categories */}
    <View style={styles.leftColumn}>
      <View style={{ gap: 16 }}>
        {filterCategories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryRow,
              selectedCategory === category && styles.categorySelected,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Ionicons
              name={
                selectedCategory === category
                  ? 'checkbox'
                  : 'square-outline'
              }
              size={20}
              color="#376275"
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && { fontWeight: 'bold' },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

    {/* Right Options */}
    <ScrollView
      style={styles.rightColumn}
      contentContainerStyle={{ paddingBottom: 24 }} // adds space before footer
      showsVerticalScrollIndicator={false}
    >
      {renderRightPane()}
    </ScrollView>
  </View>

  {/* Footer */}
  <View style={styles.footer}>
    <TouchableOpacity onPress={onClose}>
      <Text style={styles.cancelText}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => console.log('Apply filters')}>
      <Text style={styles.applyText}>Apply</Text>
    </TouchableOpacity>
  </View>
</View>


        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Apply filters')}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    
  },
  sheet: {
    left: 0,
    right: 0,
    height: Height(750), // increased from 600 to 750
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 10,
    paddingHorizontal: 16,


  },
  
  
  dragHandle: {
    width: Width(40),
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  leftColumn: {
    width: Width(100),
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingRight: 12,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  categorySelected: {
    backgroundColor: '#eaf4f9',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
    
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  seeMore: {
    color: '#376275',
    textDecorationLine: 'underline',
    marginTop: 8,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 12,
    marginBottom:130

  },
  cancelText: {
    fontSize: 16,
    color: '#666',

  },
  applyText: {
    fontSize: 16,
    color: '#376275',
    fontWeight: 'bold',
  },
});
