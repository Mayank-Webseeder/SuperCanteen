import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import {moderateScale } from 'react-native-size-matters';
import { IMGURL } from '../../../utils/dataFormatters';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { showWishlistToast } from '../../../utils/helper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '@constants/index';

const { width } = Dimensions.get('window');
const itemWidth = (width - moderateScale(50)) / 2; 
const itemHeight = (width - moderateScale(40)) / 2.5

const ModernProductGrid = ({ products, navigation , loadMore,loading }) => {
  const dispatch = useDispatch();
  const [cartLoadingId, setCartLoadingId] = useState(null);  
   const handleAddToCart = async(item) => {
      setCartLoadingId(item._id);
      try {
        await dispatch(addToCart({
          productId: item._id,
          quantity: 1,
          price: item.offerPrice || item.price,
          isDigital: item.isDigital
        }));
        showWishlistToast('Item added to cart', <MaterialIcons name="add-shopping-cart" size={18} color="#fff" />);
      } catch (error) {
        showMessage({
          message: 'Failed to add item',
          description: error?.message || 'Something went wrong',
          type: 'danger',
          duration: 3000,
        });
      } finally {
        setCartLoadingId(null);
      }
    };


  const renderItem = ({ item }) => {
    const imageUrl = `${IMGURL}${item.images[0]}`;
    const discountPercentage = Math.round(((item.mrp - item.offerPrice) / item.mrp) * 100);
   
    return (
      <TouchableOpacity
        style={[styles.productCard,{width:itemWidth}]}
        onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
        activeOpacity={0.9}
      >
        {/* Image with badges */}
        <View style={[styles.imageContainer,{ height: itemHeight * 1, }]}>
          <FastImage 
            source={{ uri: imageUrl, priority: FastImage.priority.high }} 
            style={styles.productImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          
          {/* Discount badge */}
          {discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
            </View>
          )}
    

        </View>
        
        {/* Product info */}
        <View style={styles.productInfo}>
         {item.weight && item.weightUnit && (
  <View style={styles.weightContainer}>
    <Text style={styles.weightText}>
      {item.weight} {item.weightUnit}
    </Text>
  </View>
)}
         {item.brand?.name && <Text style={styles.brandName} numberOfLines={1}>{item.brand?.name}</Text> } 
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          
          {/* Price section */}
          <View style={styles.priceContainer}>
           {item.offerPrice &&  <Text style={styles.offerPrice}>₹{item.offerPrice}</Text> }
            {item.mrp > item.offerPrice && (
              <Text style={styles.originalPrice}>₹{item.mrp}</Text>
            )}
          </View>
          
          {/* Add to cart button */}
             <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 8 }}>
  <TouchableOpacity
    onPress={() => handleAddToCart(item)}
    style={[
      styles.addToCartBtn,
      cartLoadingId === item._id && styles.inCartBtnDisable
    ]}
    disabled={cartLoadingId === item._id}
    activeOpacity={0.7}
  >
    {cartLoadingId === item._id ? (
      <ActivityIndicator size="small" color={COLORS.black} />
    ) : (
      <Text style={styles.cartButtonText}>+ Add</Text>
    )}
  </TouchableOpacity>
</View>

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
         onEndReached={loadMore}
    onEndReachedThreshold={0.5} 
    ListFooterComponent={loading ? <ActivityIndicator color={COLORS.green} size={'small'} /> : null}
   getItemLayout={(data, index) => ({
    length: itemHeight + 120,
    offset: (itemHeight + 120) * index,
    index,
  })}
  removeClippedSubviews={true}
      />
    </View>
  );
};

export default React.memo(ModernProductGrid);