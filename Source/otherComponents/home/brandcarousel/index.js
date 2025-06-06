import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text
} from 'react-native';
import { Height , Width } from '../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { getBrands } from '../../../redux/slices/brandSlice';
import {formatBrandData} from '../../../utils/dataFormatters'
import { styles } from './styles';
import { stripHtml } from '../../../utils/validation';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const Brandcarousel = () => {
  
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const width = SCREEN_WIDTH - Width(40);
  const height = Height(150);
  const radius = Width(14);

  const { brands, loading } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const formattedBrands = formatBrandData(brands); // ✅ Moved above the return

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

 const renderItem = ({ item }) => (
  <View style={[styles.card, { width, borderRadius: radius, overflow: 'hidden' }]}>
    <View style={{ position: 'relative' }}>
      <FastImage
        source={{ uri: item.image }}
        style={{
          resizeMode: 'cover',
          width: '100%',
          height,
          borderRadius: 12,
        }}
      />

      {/* 🟢 Funky Brand Name at Top-Right */}
      <Text style={styles.brandName}>{item.name}</Text>

      {/* 🟣 Funky Bottom Overlay with Gradient */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.bottomGradient}
      >
        <Text numberOfLines={2} style={styles.brandAbout}>
          {stripHtml(item.aboutTheBrand)}
        </Text>
      </LinearGradient>
    </View>
  </View>
);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={formattedBrands}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        snapToAlignment="center"
        decelerationRate="fast"
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <View style={styles.pagination}>
        {(formattedBrands || []).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentIndex ? '#D9D9D9' : '#fff',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};



export default Brandcarousel;


