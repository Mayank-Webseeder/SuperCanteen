import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCartItem,
  removeCartItem,
  fetchCartItems,
  removeMultipleGuestCartItems
} from '../../redux/slices/cartSlice';
import { COLORS } from '@constants/index';
import { stripHtml } from '../../utils/validation';
import { IMGURL } from '../../utils/dataFormatters';
import { fetchCartProductById } from '../../redux/slices/cartProductsSlice';
import { styles } from './styles';
import DeleteConfirmationModal from '../../otherComponents/deleteConfirmationModal';
import { showMessage } from 'react-native-flash-message';

const CustomDropdown = React.memo(
  ({
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

    const toggleDropdown = useCallback(() => {
      setVisible(!visible);
      Animated.timing(rotateAnim, {
        toValue: visible ? 0 : 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, [visible, rotateAnim]);

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
  }
);

const CartCard = React.memo(
  ({
    item,
    isSelected,
    onSelect,
    onQuantityChange,
    onSizeChange,
    onRemoveItem,
    isDeleteLoading,
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const dispatch = useDispatch();
 const [activeButton, setActiveButton] = useState(null); // Local loader state for quantity changes

    const productId = item.product?._id ? item.product._id : item.product;
    const { products, loading, errors } = useSelector(
      (state) => state.cartProducts
    );
    const product = products[productId];
    const isLoadingProduct = loading[productId] || false;
    const errorProduct = errors[productId];
    const matchedVariant = item?.variantDetails || product?.variants?.find((v) => v._id === item.variantId);
  

    const availableStock = useMemo(() => {
      if (!product) return 0;
      
      // Check variant stock first
      if (item.variantId && product?.variants) {
        const variant = product.variants.find(v => v._id === item.variantId);
        if (variant) return variant.countInStock || 0;
      }
      
      // Fall back to product stock
      return product.countInStock || 0;
    }, [product, item.variantId]);

    const isOutOfStock = item.product?.outOfStock || availableStock <= 0;
    
    useEffect(() => {
      if (productId && !product && !isLoadingProduct && !errorProduct) {
        dispatch(fetchCartProductById(productId));
      }
    }, [productId, product, isLoadingProduct, errorProduct, dispatch]);

    const handlePressIn = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    }, [scaleAnim]);

    const handlePressOut = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, [scaleAnim]);
    
  const handleQtyChange = useCallback(
  async (newQty, type) => {
    const parsedNewQty = parseInt(newQty);
    const parsedAvailableStock = parseInt(availableStock);

    if (isNaN(parsedNewQty) || parsedNewQty < 1) {
      showMessage({
        message: 'Oops! Quantity must be at least 1',
        type: 'danger',
        duration: 4000,
      });
      return;
    }

    if (parsedNewQty > parsedAvailableStock) {
      showMessage({
        message: `Only ${parsedAvailableStock} items available`,
        type: 'danger',
        duration: 4000,
      });
      return;
    }

    const payload = {
      product: productId,
      qty: parsedNewQty,
      selectedPrice: item.selectedPrice,
      isDigital: item.isDigital || false,
      variantId: item.variantId || null,
      variantDetails: item.variantDetails || null,
    };

    try {
      setActiveButton(type);
      await onQuantityChange(item._id || item.id, payload);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setActiveButton(null);
    }
  },
  [availableStock, productId, item, onQuantityChange]
);


    const getDisplayPrice = useCallback(() => {
      if (!product) return item.selectedPrice;

      if (product.variants) {
        const variant = product.variants.find(
          (v) => v.price === item.selectedPrice
        );
        if (variant) return variant.price;
      }

      return product.offerPrice || item.selectedPrice;
    }, [product, item.selectedPrice]);

    const handleRemove = useCallback(() => {
      onRemoveItem(item._id || item.id);
    }, [item, onRemoveItem]);

    if (errorProduct || (!product && !isLoadingProduct)) {
      return (
    <></>
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
    const discount = product?.mrp
      ? Math.round(((product.mrp - price) / product.mrp) * 100)
      : 0;

    return (
      <Animated.View
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          isOutOfStock && styles.outOfStockCard,
          { transform: [{ scale: scaleAnim }]},
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
            uri: `${IMGURL}${
              matchedVariant?.images?.[0]?.url ||
              matchedVariant?.images?.[0] ||
              product?.images?.[0]?.url ||
              product?.images?.[0] ||
              ''
            }`,
            priority: FastImage.priority.normal,
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={[
          styles.title, 
          isOutOfStock && styles.outOfStockText
        ]} numberOfLines={1}>
          {product?.name}
        </Text>
        <Text style={[
          styles.price,
          isOutOfStock && styles.outOfStockText
        ]}>
          {isOutOfStock ? 'Unavailable' : `₹${Math.round(item.selectedPrice)}`}
        </Text>
          </View>

          <Text style={styles.subtitle} numberOfLines={2}>
            {stripHtml(product?.description || '')}
          </Text>

          {/* Out of stock badge */}
          {isOutOfStock && (
            <View style={styles.outOfStockBadge}>
              <Text style={[styles.outOfStockText,{color:COLORS.white}]}>Out of Stock</Text>
            </View>
          )}
          
          {product?.mrp && (
            <View style={styles.priceInfo}>
              <Text style={styles.originalPrice}>
                ₹{matchedVariant ? (matchedVariant?.additionalPrice + product.mrp) : product.mrp}
              </Text>
              <Text style={styles.discount}>{discount}% off</Text>
            </View>
          )}

          <View style={styles.dropdownRow}>
            {item.variant && (
              <Text style={styles.dropdownTextSmall}>{item.variant.name}</Text>
            )}

            <View style={styles.stepperContainer}>
            <TouchableOpacity
  onPress={() => !isOutOfStock && handleQtyChange(item.qty - 1, 'decrement')}
  style={[
    styles.stepperButton,
    (item.qty <= 1 || activeButton !== null) && styles.stepperButtonDisabled,
  ]}
  disabled={item.qty <= 1 || activeButton !== null}
>
  <View style={{ width: 20, alignItems: 'center' }}>
    {activeButton === 'decrement' ? (
      <ActivityIndicator size="small" color={COLORS.green} />
    ) : (
      <Text style={styles.stepperText}>−</Text>
    )}
  </View>
</TouchableOpacity>

<Text style={styles.qtyText}>{item.qty}</Text>

<TouchableOpacity
  onPress={() =>  !isOutOfStock &&  handleQtyChange(item.qty + 1, 'increment')}
  style={[
    styles.stepperButton,
    (item.qty >= availableStock || activeButton !== null) && styles.stepperButtonDisabled,
  ]}
  disabled={item.qty >= availableStock || activeButton !== null}
>
  <View style={{ width: 20, alignItems: 'center' }}>
    {activeButton === 'increment' ? (
      <ActivityIndicator size="small" color={COLORS.green} />
    ) : (
      <Text style={styles.stepperText}>+</Text>
    )}
  </View>
</TouchableOpacity>


            </View>
          </View>

          <View style={styles.variantContainer}>
            {item?.variantDetails?.size && (
              <View style={styles.variantPill}>
                <Text style={styles.variantPillText}>Size: {item.variantDetails.size}</Text>
              </View>
            )}
            {item?.variantDetails?.color?.code && (
              <View style={styles.variantPill}>
                <Text style={styles.variantPillText}>Color : </Text>
                <View style={[styles.colorStyle,{backgroundColor:item?.variantDetails?.color?.code}]}/>
              </View>
            )}
          </View>
          
          {/* Stock message */}
          {!isOutOfStock && availableStock > 0 && (
            <Text style={[
              styles.stockMessage,
              availableStock < 5 && styles.lowStockMessage
            ]}>
              {availableStock < 5 
                ? `Only ${availableStock} left!` 
                : `${availableStock} available`}
            </Text>
          )}
          
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
          
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: product?.isBestSeller
                ? 'space-between'
                : 'flex-end',
            }}
          >
            {product?.isBestSeller && (
              <Text style={styles.seller}>isBestSeller </Text>
            )}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemove}
            >
              {isDeleteLoading ? (
                <ActivityIndicator size="small" color={COLORS.green} />
              ) : (
                <Icon name="delete" size={16} color={COLORS.error} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
);

const CustomCartCard = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const selectedCount = useMemo(
    () => selectedItems.length,
    [selectedItems.length]
  );

  const handleSelect = useCallback((itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      // Deselect all
      setSelectedItems([]);
      setIsAllSelected(false);
      setShowConfirmation(false); 
    } else {
      // Select all
      const allValidItemIds = validItems.map((item) => item._id || item.id);
    setSelectedItems(allValidItemIds);
    setIsAllSelected(true);
    }
  }, [isAllSelected, validItems]);

  const confirmAction = useCallback(() => {
    if (selectedItems.length > 0) {
      handleDeleteSelected();
    }
    setShowConfirmation(false);
  }, [selectedItems]);

  const handleDeleteSelected = useCallback(async () => {
    if (selectedItems.length === 0) return;

    try {
      await dispatch(removeMultipleGuestCartItems(selectedItems)).unwrap();
      setSelectedItems([]);
      setIsAllSelected(false);
    } catch (error) {
      console.error('Failed to remove items:', error);
    }
  }, [selectedItems, dispatch]);

  const showDeleteConfirmation = useCallback(() => {
    if (selectedItems.length > 0) {
      setShowConfirmation(true);
    }
  }, [selectedItems.length]);

  const handleQuantityChange = useCallback(
    async (itemId, payload) => {
      try {
        await dispatch(updateCartItem({ 
          itemId, 
          payload 
        })).unwrap();
      } catch (error) {
        console.error('Failed to update quantity:', error);
        showMessage({
          type: 'danger',
          message: error.message || 'Failed to update quantity',
        });
        throw error; // Re-throw to let the CartCard handle it
      }
    },
    [dispatch]
  );

  const handleSizeChange = (itemId, newSize) => {
    console.log(`Size changed for ${itemId} to ${newSize}`);
  };

  const handleRemoveItem = useCallback(
    async (itemId) => {
      setDeletingItemId(itemId);
      try {
        await dispatch(removeCartItem(itemId)).unwrap();
        setSelectedItems((prev) => prev.filter((id) => id !== itemId));
      } catch (error) {
        console.error('Failed to remove item:', error);
      } finally {
        setDeletingItemId(null);
      }
    },
    [dispatch]
  );

  const validItems = useMemo(() => items.filter(item => item.product !== null), [items]);

  useEffect(() => {
    if (showConfirmation) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showConfirmation, slideAnim]);

  if (loading && items.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.green} />
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
            {selectedCount}/{validItems.length} ITEMS SELECTED
          </Text>
        </View>

        <TouchableOpacity
          onPress={showDeleteConfirmation}
          style={[
            styles.deleteButton,
            selectedCount === 0 && styles.deleteButtonDisabled,
          ]}
          disabled={selectedCount === 0}
          activeOpacity={0.6}
        >
          <Icon
            name="delete"
            size={16}
            color={selectedCount > 0 ? '#FF3B30' : '#999'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
       data={validItems}
        keyExtractor={(item) => (item._id || item.id).toString()}
        renderItem={({ item }) => (
          <CartCard
            item={item}
            isSelected={selectedItems.includes(item._id || item.id)}
            onSelect={handleSelect}
            onQuantityChange={handleQuantityChange}
            onSizeChange={handleSizeChange}
            onRemoveItem={handleRemoveItem}
            isDeleteLoading={deletingItemId === (item._id || item.id)} 
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

      <DeleteConfirmationModal
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmAction}
        selectedCount={selectedCount}
        slideAnim={slideAnim}
      />
    </View>
  );
};

export default CustomCartCard;