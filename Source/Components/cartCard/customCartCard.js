import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, removeCartItem, fetchCartItems } from '../../redux/slices/cartSlice';
import { COLORS } from '@constants/index';
import { stripHtml } from '../../utils/validation';
import { IMGURL } from '../../utils/dataFormatters';
import { fetchCartProductById } from '../../redux/slices/cartProductsSlice';

const CustomDropdown = React.memo(({
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
});

const CartCard = React.memo(({
  item,
  isSelected,
  onSelect,
  onQuantityChange,
  onSizeChange,
  onRemoveItem,
  isLoading,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();
  
  const productId = item.product?._id ? item.product._id : item.product;
  const { products, loading, errors } = useSelector((state) => state.cartProducts);
  const product = products[productId];
  const isLoadingProduct = loading[productId] || false;
  const errorProduct = errors[productId];
  
  useEffect(() => {
    if (productId && !product && !isLoadingProduct && !errorProduct) {
      dispatch(fetchCartProductById(productId));
    }
  }, [productId, product, isLoadingProduct, errorProduct, dispatch]);

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

  const handleQtyChange = (newQty) => {
    const payload = {
      product: productId,
      qty: parseInt(newQty),
      selectedPrice: item.selectedPrice,
      isDigital: item.isDigital || false,
    };
    onQuantityChange(item._id || item.id, payload);
  };

  const getDisplayPrice = useCallback(() => {
    if (!product) return item.selectedPrice;
    
    if (product.variants) {
      const variant = product.variants.find(
        v => v.price === item.selectedPrice
      );
      if (variant) return variant.price;
    }
    
    return product.offerPrice || item.selectedPrice;
  }, [product, item.selectedPrice]);

  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => onRemoveItem(item._id || item.id) }
      ]
    );
  };

  if (errorProduct || (!product && !isLoadingProduct)) {
    return (
      <Animated.View style={[styles.card, { opacity: 0.7 }]}>
        <View style={styles.productUnavailable}>
          <Text style={styles.unavailableText}>Product unavailable</Text>
          <TouchableOpacity 
            onPress={handleRemove}
            style={styles.removeUnavailable}
          >
            <Text style={styles.removeUnavailableText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  if (isLoadingProduct || !product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={COLORS.green} />
      </View>
    );
  }

  const price = getDisplayPrice();
  const discount = product?.mrp ? Math.round(((product.mrp - price) / product.mrp) * 100) : 0;

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
        onPress={() => onSelect(item._id || item.id)}
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

      <FastImage
        source={{
          uri: `${IMGURL}${product?.images?.[0]?.url || product?.images?.[0] || ''}`,
          priority: FastImage.priority.normal,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {product?.name}
          </Text>
          <Text style={styles.price}>₹{price}</Text>
        </View>

        <Text style={styles.subtitle} numberOfLines={2}>
          {stripHtml(product?.description || '')}
        </Text>

        {product?.mrp && (
          <View style={styles.priceInfo}>
            <Text style={styles.originalPrice}>₹{product.mrp}</Text>
            <Text style={styles.discount}>{discount}% off</Text>
          </View>
        )}

        <View style={styles.dropdownRow}>
          {item.variant && (
            <Text style={styles.dropdownTextSmall}>{item.variant.name}</Text>
          )}

          <View style={styles.stepperContainer}>
            <TouchableOpacity
              onPress={() => item.qty > 1 && handleQtyChange(item.qty - 1)}
              style={styles.stepperButton}
              disabled={item.qty <= 1 || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#416E81" />
              ) : (
                <Text style={styles.stepperText}>−</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.qty}</Text>

            <TouchableOpacity
              onPress={() => handleQtyChange(item.qty + 1)}
              style={styles.stepperButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#416E81" />
              ) : (
                <Text style={styles.stepperText}>+</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.deliveryInfo}>
          <Feather name="truck" size={14} color="#416E81" />
          <Text style={styles.deliveryText}>
            <Text style={{ color: '#000', fontWeight: '600' }}>
              Free delivery
            </Text>
          </Text>
        </View>

        <View style={styles.returnInfo}>
          <Entypo name="cycle" size={14} color="#416E81" />
          <Text style={styles.returnPolicy}>7 days return policy</Text>
        </View>

        {product?.isBestSeller && (
          <Text style={styles.seller}>
            isBestSeller{' '}
            <Text style={{ color: '#416E81', fontFamily: 'Inter-SemiBold' }} />
          </Text>
        )}

        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

const CustomCartCard = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const handleSelect = useCallback((itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item._id || item.id));
    }
    setIsAllSelected(!isAllSelected);
  }, [isAllSelected, items]);

  const handleDeleteSelected = useCallback(async () => {
    if (selectedItems.length === 0) return;
    
    Alert.alert(
      'Remove Items',
      `Are you sure you want to remove ${selectedItems.length} item(s) from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          onPress: async () => {
            try {
              const updates = {};
              selectedItems.forEach(id => updates[id] = true);
              setUpdatingItems(updates);
              
              await Promise.all(
                selectedItems.map(itemId => 
                  dispatch(removeCartItem(itemId)).unwrap()
                )
              );
              
              setSelectedItems([]);
              setIsAllSelected(false);
            } catch (error) {
              Alert.alert('Error', 'Failed to remove some items');
            } finally {
              setUpdatingItems({});
            }
          }
        }
      ]
    );
  }, [selectedItems, dispatch]);

  const handleQuantityChange = useCallback(async (itemId, payload) => {
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await dispatch(updateCartItem({ itemId, payload })).unwrap();
    } catch (error) {
      Alert.alert('Error', 'Failed to update quantity');
    } finally {
      setUpdatingItems(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }
  }, [dispatch]);

    const handleSizeChange = (itemId, newSize) => {
    console.log(`Size changed for ${itemId} to ${newSize}`);
  };

  const handleRemoveItem = useCallback(async (itemId) => {
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await dispatch(removeCartItem(itemId)).unwrap();
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item');
    } finally {
      setUpdatingItems(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.green}/>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchCartItems())}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
          {selectedItems.some(id => updatingItems[id]) ? (
            <ActivityIndicator size="small" color="#FF3B30" />
          ) : (
            <>
              <Icon name="delete" size={16} color={selectedItems.length > 0 ? '#FF3B30' : '#999'} />
              <Text style={[
                styles.deleteText,
                selectedItems.length > 0 && styles.deleteTextActive
              ]}>
                Delete
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => (item._id || item.id).toString()}
        renderItem={({ item }) => (
          <CartCard
            item={item}
            isSelected={selectedItems.includes(item._id || item.id)}
            onSelect={handleSelect}
            onQuantityChange={handleQuantityChange}
            onSizeChange={handleSizeChange}
            onRemoveItem={handleRemoveItem}
            isLoading={updatingItems[item._id || item.id]}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <Feather name="shopping-cart" size={40} color="#ccc" />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity
              style={styles.continueShopping}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default CustomCartCard;