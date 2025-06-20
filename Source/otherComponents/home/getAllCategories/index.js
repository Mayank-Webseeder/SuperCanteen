import React, { useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import { formatCategoryData } from '../../../utils/dataFormatters';
import { COLORS, FontSize, Height, Width } from '@constants/index';

const GetCategory = ({ selectedIndex, setSelectedIndex, categories, navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  if (!categories) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={COLORS.green} />
      </View>
    );
  }

  if (categories.length === 0) {
    return <View style={styles.emptyContainer} />;
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 1],
    extrapolate: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const formattedCategories = formatCategoryData(categories).slice(0, 7);

  const modifiedCategories = [
    ...formattedCategories,
    {
      _id: 'all-icons',
      name: 'All',
      icon: require('../../../../assets/Icons/AlIcons.png'),
      isAllIcon: true,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      {/* Sticky Header */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>Top Categories</Text>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } }}],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category List with disappearing text */}
        <Animated.View style={{ opacity: textOpacity }}>
          <CustomCategoryList
            data={modifiedCategories}
            horizontal
            selected={selectedIndex}
            onSelect={(id) => {
              if (id === 'all-icons') {
                navigation.navigate('Main', { screen: 'Categories' });
              } else {
                setSelectedIndex(id);
              }
            }}
            bgColor="#D4E7F2"
            width={50}
            height={50}
            borderRadius={32}
            textColor="#333"
            textStyle={styles.textStyle}
            imageSize={36}
            showsHorizontalScrollIndicator={false}
            imageStyle={styles.imageStyle}
            colors={['#30A46C', '#5BD18B']}
            contentContainerStyle={styles.listContent}
            categoryContainerStyle={{ marginRight: Height(1) }}
            imageContainerStyle={{ backgroundColor: 'transparent' }}
          />
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    height: Height(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    height: Height(100),
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    paddingTop: Height(12),
    paddingHorizontal: Width(16),
  },
  headerTitle: {
    fontSize: FontSize(15),
    fontFamily:"Inter-SemiBold",
    color: COLORS.darkText,
    
  },
  scrollContent: {
    paddingTop: Height(43),
   
  },
  listContent: {
    paddingLeft: Width(20),
  },
  textStyle: {
    fontSize: 12,
    marginTop: Height(4),
  },
  imageStyle: {
    borderRadius: Width(18),
  },
  contentBelow: {
    paddingHorizontal: Width(16),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkText,
    marginBottom: Height(10),
  },
});

export default GetCategory;