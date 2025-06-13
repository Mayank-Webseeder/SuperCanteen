import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import { Height , Width } from '../../../constants';
import {formatBrandData} from '../../../utils/dataFormatters'
import { styles } from './styles';
import { stripHtml } from '../../../utils/validation';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const Brandcarousel = ({brands}) => {
  const navigation = useNavigation()
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const width = SCREEN_WIDTH - Width(40);
  const height = Height(150);
  const radius = Width(14);

  const formattedBrands = formatBrandData(brands); 
  const [selectedBrand,setSelectedBrand] = useState('')

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

 const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() =>  {
    navigation.navigate('ProdcutCategory',{brandId: item.id})
    }} style={[styles.card, { width, borderRadius: radius, overflow: 'hidden' }]}>
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
  </TouchableOpacity>
);

  return (
    formattedBrands.length > 0 &&  
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

{brands.length > 1 &&   <View style={styles.pagination}>
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
      </View> }
    
    </View>
  );
};



export default Brandcarousel;


