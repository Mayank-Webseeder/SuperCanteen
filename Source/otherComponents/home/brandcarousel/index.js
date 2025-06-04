import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Height , Width } from '../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { getBrands } from '../../../redux/slices/brandSlice';
import {formatBrandData} from '../../../utils/dataFormatters'
import { COLORS } from '../../../constants';
import { styles } from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Brandcarousel = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const width =  SCREEN_WIDTH - Width(40);
  const height =   Height(150);
  const radius =  Width(14);

   const { brands, loading } = useSelector((state) => state.brand);

    useEffect(() => {
       dispatch(getBrands());
     }, []);
   
     if (loading) return <View style={styles.loadingContainer}><ActivityIndicator color={COLORS.green}  /></View>;
     const formattedBrands = formatBrandData(brands);


  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }) => (
    <View style={[styles.card, { width, borderRadius: radius  }]}>
        <Image
      source={{uri:item.image}}
      style={{
        resizeMode:"contain",
        width: '100%',
        height,
        borderRadius: radius ?? 1,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        
      }}
    />
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
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        snapToAlignment="center"
        decelerationRate="fast"
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      <View style={styles.pagination}>
        {(data || []).map((_, index) => (
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


