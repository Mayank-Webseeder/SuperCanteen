import { View, Pressable, Text } from 'react-native';
import { styles } from './styles';
import CustomSearch from '../../../Components/searchInput';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

// Header.js
export default function Header({ navigation ,containerStyle}) {
const { items, initialized } = useSelector((state) => state.cart);
  const itemCount = items?.length;
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable 
          style={styles.searchPressable}
          onPress={() => navigation.navigate('Search')}
        >
          <CustomSearch
            disabledStyle={styles.disabledStyle}
            backgroundColor={'#fff'}
            disabled
            containerStyle={[styles.searchInput,containerStyle]}
            inputStyle={{ fontSize: 14, paddingVertical: 11, marginLeft: 2}}
          />
        </Pressable>
         <Pressable 
          style={styles.cartPressable}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={{ position: 'relative' }}>
            <FastImage
              style={styles.cartImg}
              source={require('../../../../assets/Icons/shopping_cart.png')}
            />
            {initialized && itemCount > 0 && ( // Only show when initialized
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {itemCount > 99 ? '99+' : itemCount}
                </Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}