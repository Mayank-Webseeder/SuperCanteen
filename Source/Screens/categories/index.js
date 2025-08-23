import React, { 
  useState, useEffect, useRef, useMemo, useCallback 
} from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, 
  StyleSheet, Dimensions, Image, ScrollView, SafeAreaView 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByCategory } from '../../redux/slices/productSlice';
import { IMGURL } from '../../utils/dataFormatters';
import { COLORS } from '@constants/index';
import CustomHeader from '@components/CustomHeader';

const { width } = Dimensions.get('window');

const CategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Redux state
  const categories = useSelector(state => state.category.categories);
  const subCategories = useSelector(state => state.subCategory.subCategories);
  const reduxProducts = useSelector(state => state.product.products);
  const loading = useSelector(state => state.product.loading);

  // Local state
  const [activeCategory, setActiveCategory] = useState(null);
  const [allProducts, setAllProducts] = useState({});

  // Refs for scroll handling
  const leftListRef = useRef(null);
  const rightListRef = useRef(null);
  const categoryPositions = useRef({});
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const lastScrollY = useRef(0);

  /* ---------------------- useEffects ---------------------- */

  // Store fetched products in local state
  useEffect(() => {
    if (reduxProducts.length > 0 && reduxProducts[0]?.category) {
      const categoryId = reduxProducts[0].category._id;
      setAllProducts(prev => ({ ...prev, [categoryId]: reduxProducts }));
    }
  }, [reduxProducts]);

  // Load first category initially
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      const firstCategoryId = categories[0]._id;
      setActiveCategory(firstCategoryId);

      if (!allProducts[firstCategoryId]) {
        dispatch(getProductsByCategory(firstCategoryId));
      }
    }
  }, [categories]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  /* ---------------------- Memoized Data ---------------------- */

  const categoryData = useMemo(() => {
    if (!categories.length || !subCategories.length) return [];

    return categories.map(category => {
      const categorySubs = subCategories.filter(
        sub => sub.category?._id === category._id
      );

      const categoryProducts = allProducts[category._id] || [];

      return {
        ...category,
        data: categorySubs,
        products: categoryProducts,
        hasSubcategories: categorySubs.length > 0,
        hasProducts: categoryProducts.length > 0,
      };
    });
  }, [categories, subCategories, allProducts]);

  /* ---------------------- Handlers ---------------------- */

  // Handle category select (left panel)
  const handleCategorySelect = useCallback((categoryId, index) => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    setActiveCategory(categoryId);

    if (!allProducts[categoryId]) {
      dispatch(getProductsByCategory(categoryId));
    }

    // Scroll right panel
    if (categoryPositions.current[categoryId] && rightListRef.current) {
      rightListRef.current.scrollTo({
        y: categoryPositions.current[categoryId],
        animated: true,
      });
    }

    // Scroll left panel
    if (leftListRef.current) {
      leftListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  }, [allProducts, dispatch]);

  // Track each category section position
  const trackCategoryPosition = useCallback((categoryId, event) => {
    categoryPositions.current[categoryId] = event.nativeEvent.layout.y;
  }, []);

  // Sync left panel with right scroll
  const handleRightScroll = useCallback((event) => {
    if (isScrolling.current) return;

    const offsetY = event.nativeEvent.contentOffset.y;
    const scrollDirection = offsetY > lastScrollY.current ? 'down' : 'up';
    lastScrollY.current = offsetY;

    const measuredCategories = Object.entries(categoryPositions.current)
      .filter(([_, pos]) => pos !== undefined)
      .sort((a, b) => a[1] - b[1]);

    if (measuredCategories.length === 0) return;

    let currentCategoryId = null;

    // Handle bottom scroll
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    const isAtBottom = offsetY + scrollViewHeight >= contentHeight - 50;

    if (isAtBottom) {
      currentCategoryId = measuredCategories.at(-1)[0];
    } else {
      for (let i = 0; i < measuredCategories.length; i++) {
        const [categoryId, position] = measuredCategories[i];
        if (position >= offsetY && position <= offsetY + scrollViewHeight / 2) {
          currentCategoryId = categoryId;
          break;
        }
        if (i === measuredCategories.length - 1 && scrollDirection === 'down') {
          currentCategoryId = categoryId;
        }
      }
    }

    if (currentCategoryId && currentCategoryId !== activeCategory) {
      setActiveCategory(currentCategoryId);

      const categoryIndex = categoryData.findIndex(
        item => item._id === currentCategoryId
      );

      if (categoryIndex !== -1 && leftListRef.current) {
        leftListRef.current.scrollToIndex({
          index: categoryIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  }, [activeCategory, categoryData]);

  /* ---------------------- Renderers ---------------------- */

  const renderCategoryItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item._id && styles.activeCategoryItem,
      ]}
      onPress={() => handleCategorySelect(item._id, index)}
    >
      <View style={styles.categoryImageContainer}>
        <Image
          source={{ uri: `${IMGURL}/${item.image}` }}
          style={styles.categoryImage}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[
          styles.categoryText,
          activeCategory === item._id && styles.activeCategoryText,
        ]}
        numberOfLines={2}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  ), [activeCategory, handleCategorySelect]);

  const renderNoData = useCallback((msg) => (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>{msg}</Text>
    </View>
  ), []);

  const renderGridItem = useCallback(({ item, isProduct = false }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        if (isProduct) {
          navigation.navigate('ProductDetails', {
            productId: item._id,
            title: item.name,
          });
        } else {
          navigation.navigate('ProdcutCategory', {
            selectedCategory: item._id,
            categoryData: item,
          });
        }
      }}
    >
      <View style={styles.gridImageContainer}>
        <Image
          source={{ uri: isProduct ? `${IMGURL}${item.images[0]}` : `${IMGURL}/${item.image}` }}
          style={styles.gridImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.gridText} numberOfLines={2}>
        {item.name}
      </Text>

      {isProduct && (
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>₹{item.offerPrice || item.price}</Text>
          {item.mrp > (item.offerPrice || item.price) && (
            <Text style={styles.originalPrice}>₹{item.mrp}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  ), [navigation]);

  const renderCategorySection = useCallback((category) => {
    const isLoadingThisCategory =
      loading && activeCategory === category._id && !allProducts[category._id];
    const isEmpty = !isLoadingThisCategory && !category.hasSubcategories;

    return (
      <View
        key={category._id}
        onLayout={event => trackCategoryPosition(category._id, event)}
        style={styles.categorySection}
      >
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionHeaderText}>{category.name}</Text>
            <View style={styles.titleLine} />
          </View>
        </View>

        {isLoadingThisCategory ? (
          <View style={styles.loadingContainer}>
            {/* Loader here */}
          </View>
        ) : isEmpty ? (
          renderNoData("No data available")
        ) : (
          <>
            {/* Subcategories */}
            {category.hasSubcategories && (
              <View style={styles.gridSection}>
                <View style={styles.gridContainer}>
                  {category.data.map(sub => (
                    <View key={sub._id} style={styles.gridItemWrapper}>
                      {renderGridItem({ item: sub, isProduct: false })}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Products (commented out in your code) */}
            {/* {category.hasProducts && (
              <View style={styles.gridSection}>
                <Text style={styles.title}>Products</Text>
                <View style={styles.gridContainer}>
                  {category.products.map(prod => (
                    <View key={prod._id} style={styles.gridItemWrapper}>
                      {renderGridItem({ item: prod, isProduct: true })}
                    </View>
                  ))}
                </View>
              </View>
            )} */}
          </>
        )}
      </View>
    );
  }, [loading, activeCategory, allProducts]);

  /* ---------------------- Render ---------------------- */

  if (categories.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Categories</Text>
        </View>
        <View style={styles.centerContainer}>
          {/* Loader here */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ marginLeft: 10 }}>
        <CustomHeader
          notShowingBackIcon
          showCartIcon
          navigation={navigation}
          label={'Categories'}
        />
      </View>

      <View style={styles.contentContainer}>
        {/* Left Panel */}
        <View style={styles.leftPanel}>
          <FlatList
            ref={leftListRef}
            data={categoryData}
            renderItem={renderCategoryItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: 100,
              offset: 100 * index,
              index,
            })}
          />
        </View>

        {/* Right Panel */}
        <View style={styles.rightPanel}>
          <ScrollView
            ref={rightListRef}
            showsVerticalScrollIndicator={false}
            onScroll={handleRightScroll}
            scrollEventThrottle={100}
          >
            {categoryData.map(category => renderCategorySection(category))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

/* ---------------------- Styles ---------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  contentContainer: { flex: 1, flexDirection: 'row' },
  leftPanel: {
    width: width * 0.28,
    backgroundColor: COLORS.aliceBlue,
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
  },
  rightPanel: { flex: 1, backgroundColor: COLORS.white },

  /* Left Categories */
  categoryItem: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  activeCategoryItem: {
    backgroundColor: COLORS.white,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.green,
  },
  categoryImageContainer: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryImage: { width: 40, height: 40 },
  categoryText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
    lineHeight: 15,
  },
  activeCategoryText: { color: COLORS.green, fontWeight: '700' },

  /* Right Sections */
  categorySection: {},
  sectionHeader: { backgroundColor: COLORS.white, paddingHorizontal: 16 },
  sectionTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#71797E',
    marginRight: 4,
    marginBottom: 10,
    marginTop: 16,
  },
  titleLine: { flex: 1, height: 1, backgroundColor: COLORS.lightGray, marginTop: 10 },

  /* Grid */
  gridSection: { paddingHorizontal: 16 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItemWrapper: { width: '48%' },
  gridItem: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  gridImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridImage: { width: 60, height: 60 },
  gridText: { fontSize: 12, color: '#495057', textAlign: 'center', fontWeight: '500', marginBottom: 4 },

  /* Price */
  priceContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  productPrice: { fontSize: 12, fontWeight: '700', color: '#000', marginRight: 6 },
  originalPrice: { fontSize: 10, color: '#6c757d', textDecorationLine: 'line-through' },

  /* States */
  noDataContainer: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  noDataText: { fontSize: 14, color: '#6c757d', fontStyle: 'italic' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingContainer: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 10, fontSize: 14, color: '#6c757d' },
});

export default CategoryScreen;
