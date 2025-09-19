import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../../../redux/slices/productSlice'
import CustomProductCard from '../../../Components/productCard'
import { styles } from './styles';
import CustomHeader from '@components/CustomHeader';
import CustomSearch from '@components/searchInput'

const ProductsByCategoryScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#416F81" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error?.message || "Something went wrong"}</Text>
      </View>
    );
  }

  if (!products || products.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No products found in {categoryName}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal:6}}>
            <CustomHeader showCartIcon navigation={navigation} label={categoryName || 'Products'} />
      </View>
       <View style={styles.searchView}>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <CustomSearch
              disabledStyle={styles.disabledStyle}
              WidthSize={'98%'}
              backgroundColor={'#fff'}
              disabled
              containerStyle={styles.searchInput}
              inputStyle={{ fontSize: 14, paddingVertical: 10, marginLeft: 2 }}
            />
          </Pressable>
        </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <CustomProductCard
            data={[item]}
            navigation={navigation}
            containerStyle={{padding:0}}
          />
        )}
        contentContainerStyle={{ padding: 10 ,paddingBottom:30}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductsByCategoryScreen;


