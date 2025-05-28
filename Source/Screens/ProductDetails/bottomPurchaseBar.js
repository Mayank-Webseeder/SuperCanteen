import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomAuthButton from '../../Components/customAuthButton';
import { Width } from '../../constants/constants';

const BottomPurchaseBar = ({ onSharePress, onAddToCart, onBuyNow }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={onSharePress}>
        <FontAwesome name="share-alt" size={20} color="#2E6074" />
      </TouchableOpacity>

      <CustomAuthButton
        width={Width(114)}
        title="Add to Cart"
        onPress={onAddToCart}
        backgroundColor="#FFFFFF"
        br={10}
        borderWidth={1}
        borderColor="#2E6074"
        textStyle={styles.addToCartText}
        marginLeft={Width(20)}
      />

      <CustomAuthButton
        width={Width(114)}
        title="Buy Now"
        onPress={onBuyNow}
        backgroundColor="#2E6074"
        br={10}
        borderWidth={1}
        borderColor="#2E6074"
        textStyle={styles.buyNowText}
        
      />
    </View>
  );
};

export default BottomPurchaseBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: Width(15),
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,

  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#F4F8FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#2E6074',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
