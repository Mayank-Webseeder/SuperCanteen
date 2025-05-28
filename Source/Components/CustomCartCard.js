import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS } from '../constants/constants';

const cartItems = [
  {
    id: 1,
    name: 'Timex',
    description: 'Bella Analog Watch for Womens',
    image: require('../../assets/Beatuy/B1.png'),
    price: '₹4,889',
    originalPrice: '₹6,499',
    discount: '25% off',
    seller: 'EliteEdge Pvt Limited',
    size: 'Onesize',
    quantity: 1,
  },
  {
    id: 2,
    name: 'YouBelle',
    description: 'Casual Wear Pendant for Womens',
    image: require('../../assets/MensWatch/m1b.png'),
    price: '₹4,889',
    originalPrice: '₹5,999',
    discount: '18% off',
    seller: 'EliteEdge Pvt Limited',
    size: 'Onesize',
    quantity: 1,
  },
  {
    id: 3,
    name: 'WomenClub',
    description: 'Tote Handbag for Womens',
    image: require('../../assets/fashion/F1.png'),
    price: '₹4,889',
    originalPrice: '₹7,299',
    discount: '33% off',
    seller: 'EliteEdge Pvt Limited',
    size: 'Onesize',
    quantity: 1,
  },
];

// Enhanced Custom Dropdown
const CustomDropdown = ({
  options,
  selected,
  onSelect,
  style,
  textStyle,
  itemStyle,
  itemTextStyle,
  iconColor = '#000',
  dropdownWidth = 120,
}) => {
  const [visible, setVisible] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setVisible(!visible);
    Animated.timing(rotateAnim, {
      toValue: visible ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[styles.dropdownWrapper, style]}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[styles.dropdownButton, { width: dropdownWidth }]}
        activeOpacity={0.7}
      >
        <Text style={[styles.dropdownText, textStyle]} numberOfLines={1}>
          {selected}
        </Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Feather name="chevron-down" size={16} color={iconColor} />
        </Animated.View>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={toggleDropdown}
      >
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.dropdownContainer,
                { width: dropdownWidth + 20 },
                Platform.OS === 'ios' && styles.shadowIOS,
                Platform.OS === 'android' && styles.shadowAndroid,
              ]}
            >
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    itemStyle,
                    selected === option && styles.selectedDropdownItem,
                  ]}
                  onPress={() => {
                    onSelect(option);
                    toggleDropdown();
                  }}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      itemTextStyle,
                      selected === option && styles.selectedDropdownItemText,
                    ]}
                  >
                    {option}
                  </Text>
                  {selected === option && (
                    <Feather
                      name="check"
                      size={16}
                      color="#416E81"
                      style={styles.dropdownCheckIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// Cart Card Component
const CartCard = ({
  item,
  isSelected,
  onSelect,
  onQuantityChange,
  onSizeChange,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => onSelect(item.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.checkboxContainer}>
          {isSelected ? (
            <View style={styles.checkedBox}>
              <Feather name="check" size={14} color="#fff" />
            </View>
          ) : (
            <View style={styles.uncheckedBox} />
          )}
        </View>
      </TouchableOpacity>

      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <Text style={styles.subtitle} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.priceInfo}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.discount}> {item.discount}</Text>
        </View>

        <View style={styles.dropdownRow}>
          <CustomDropdown
            options={['Onesize', 'Small', 'Medium', 'Large']}
            selected={item.size}
            onSelect={(val) => onSizeChange(item.id, val)}
            dropdownWidth={100}
            textStyle={styles.dropdownTextSmall}
            itemStyle={styles.dropdownItemSmall}
            itemTextStyle={styles.dropdownItemTextSmall}
            iconColor="#416E81"
          />
          <CustomDropdown
            options={['1', '2', '3', '4', '5']}
            selected={`Qty: ${item.quantity}`}
            onSelect={(val) => onQuantityChange(item.id, val)}
            dropdownWidth={80}
            textStyle={styles.dropdownTextSmall}
            itemStyle={styles.dropdownItemSmall}
            itemTextStyle={styles.dropdownItemTextSmall}
            iconColor="#416E81"
          />
        </View>

        <View style={styles.deliveryInfo}>
          <Feather name="truck" size={14} color="#416E81" />
          <Text style={styles.deliveryText}>
            <Text style={{ color: '#000', fontWeight: '600' }}>
              {' '}
              Free delivery by 24th May
            </Text>
          </Text>
        </View>
        <View style={styles.returnInfo}>
          <Entypo name="cycle" size={14} color="#416E81" />
          <Text style={styles.returnPolicy}> 7 days return policy</Text>
        </View>
        <Text style={styles.seller}>
          Seller: <Text style={{ color: '#416E81' }}>{item.seller}</Text>
        </Text>
      </View>
    </Animated.View>
  );
};

const CustomCartCard = () => {
  const [items, setItems] = useState(cartItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    setItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setIsAllSelected(false);
  };

  const handleQuantityChange = (itemId, newQty) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleSizeChange = (itemId, newSize) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, size: newSize } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with selection controls */}
      <View style={styles.headerContainer}>
        <View style={styles.selectionControls}>
          <TouchableOpacity
            onPress={handleSelectAll}
            style={styles.selectAllButton}
            activeOpacity={0.7}
          >
            {isAllSelected ? (
              <View style={styles.checkedBox}>
                <Feather name="check" size={14} color="#fff" />
              </View>
            ) : (
              <View style={styles.uncheckedBox} />
            )}
            <Text style={styles.selectAllText}>
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.selectionText}>
            {selectedItems.length}/{items.length} ITEMS SELECTED
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleDeleteSelected}
          style={[
            styles.deleteButton,
            selectedItems.length === 0 && styles.deleteButtonDisabled,
          ]}
          disabled={selectedItems.length === 0}
          activeOpacity={0.6}
        >
          <Icon name="delete" size={16} color={selectedItems.length > 0 ? '#FF3B30' : '#999'} />
          <Text style={[
            styles.deleteText,
            selectedItems.length > 0 && styles.deleteTextActive
          ]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartCard
            item={item}
            isSelected={selectedItems.includes(item.id)}
            onSelect={handleSelect}
            onQuantityChange={handleQuantityChange}
            onSizeChange={handleSizeChange}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <Feather name="shopping-cart" size={40} color="#ccc" />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          </View>
        }
      />

   
    </View>
  );
};

// Enhanced Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  selectionControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  selectAllText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#416E81',
    fontWeight: '500',
  },
  selectionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  deleteButtonDisabled: {
    opacity: 0.5,
  },
  deleteText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#999',
  },
  deleteTextActive: {
    color: '#FF3B30',
  },
  listContent: {
     paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedCard: {
    borderColor: '#416E81',
    backgroundColor: '#f5f9fa',
  },
  selectButton: {
    position: 'absolute',
    left: 5,
    top: 5,
    zIndex: 1,
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#416E81',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  subtitle: {
    color: '#666',
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 18,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#416E81',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discount: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dropdownWrapper: {
    zIndex: 1,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f7fa',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  dropdownText: {
    fontSize: 13,
    color: '#333',
  },
  dropdownTextSmall: {
    fontSize: 12,
    color: '#416E81',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 4,
    marginHorizontal: 20,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownItemSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedDropdownItem: {
    backgroundColor: '#f0f7fa',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownItemTextSmall: {
    fontSize: 13,
    color: '#416E81',
  },
  selectedDropdownItemText: {
    color: '#416E81',
    fontWeight: '500',
  },
  dropdownCheckIcon: {
    marginLeft: 10,
  },
  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  shadowAndroid: {
    elevation: 5,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  returnInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  deliveryText: {
    fontSize: 12,
  },
  returnPolicy: {
    fontSize: 12,
    color: '#666',
  },
  seller: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalText: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#416E81',
  },
  checkoutButton: {
    backgroundColor: '#416E81',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkouButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyCartText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
});

export default CustomCartCard;