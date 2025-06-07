import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageZoomViewer from './ImageZoomViewer';
import { Height, Width } from '@constants/index';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomZoomCasual = ({
  data = [],
  cardWidth,
  cardHeight,
  cardRadius,
  paddingHorizontal = Width(20),
  borderWidth,
  resizeMode,
  cardStyle,
  containerStyle
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingFirstImage, setLoadingFirstImage] = useState(true);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const flatListRef = useRef();

  const width = cardWidth || SCREEN_WIDTH - Width(40);
  const height = cardHeight || Height(150);
  const radius = cardRadius || Width(14);

  // Enhanced URL normalization
  const normalizeUri = (uri) => {
    if (!uri) return null;
    
    // Handle cases where URLs might have double slashes or malformed paths
    let normalized = uri;
    
    // Fix double slashes after domain
    normalized = normalized.replace(/(https?:\/\/[^/]+)\/(\/+)/, '$1/');
    
    // Remove any remaining double slashes in path
    normalized = normalized.replace(/([^:]\/)\/+/g, '$1');
    
    return normalized;
  };

  // Preload first image specifically
  useEffect(() => {
    if (data.length > 0) {
      const firstImage = data[0];
      let firstImageUri = '';
      
      if (typeof firstImage === 'string') {
        firstImageUri = firstImage;
      } else if (firstImage?.image) {
        firstImageUri = typeof firstImage.image === 'string' 
          ? firstImage.image 
          : firstImage.image.uri;
      }
      
      if (firstImageUri) {
        const normalizedUri = normalizeUri(firstImageUri);
        
        setLoadingFirstImage(true);
        
        // Preload only the first image with high priority
        FastImage.preload([{
          uri: normalizedUri,
          priority: FastImage.priority.high
        }]);
        
        // Set a timeout to ensure first image has time to load
        const timer = setTimeout(() => {
          setLoadingFirstImage(false);
        }, 300);
        
        return () => clearTimeout(timer);
      } else {
        setLoadingFirstImage(false);
      }
    } else {
      setLoadingFirstImage(false);
    }
  }, [data]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfigRef = useRef({ 
    viewAreaCoveragePercentThreshold: 50,
    minimumViewTime: 300
  });

  const handleImagePress = (item) => {
    const uri = typeof item === 'string' ? item : 
               item?.image ? (typeof item.image === 'string' ? item.image : item.image.uri) : 
               item?.uri ? item.uri : null;
    if (uri) {
      setSelectedImage(normalizeUri(uri));
      setZoomVisible(true);
    }
  };

  const getImageSource = (item) => {
    if (typeof item === 'string') return { uri: normalizeUri(item) };
    if (item?.image) {
      return typeof item.image === 'string' 
        ? { uri: normalizeUri(item.image) } 
        : { uri: normalizeUri(item.image.uri) };
    }
    if (item?.uri) return { uri: normalizeUri(item.uri) };
    if (typeof item === 'number') return item; // Local require() images
    return null;
  };

  const renderItem = ({ item, index }) => {
    const source = getImageSource(item);

    // Special handling for first image loading
    if (index === 0 && loadingFirstImage) {
      return (
        <View style={[
          styles.card,
          { 
            width, 
            height,
            borderRadius: radius,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}>
          <ActivityIndicator size="small" color="#2E6074" />
        </View>
      );
    }

    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => handleImagePress(item)}
      >
        <View style={[
          styles.card,
          { 
            width, 
            borderRadius: radius, 
            borderWidth: borderWidth ?? 1,
            borderColor: '#E3E3E3',
            ...cardStyle 
          }
        ]}>
          {source ? (
            <FastImage
              source={source}
              style={{
                width: '100%',
                height,
                borderRadius: radius,
                resizeMode: resizeMode || 'cover'
              }}
              onError={(error) => console.warn('Image failed to load:', error)}
              priority={index === 0 ? FastImage.priority.high : FastImage.priority.normal}
              fallback={true}
            />
          ) : (
            <View style={{ 
              width: '100%', 
              height, 
              backgroundColor: '#F0F0F0',
              borderRadius: radius,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* Placeholder content */}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal }}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={false} // Critical for first image rendering
        extraData={loadingFirstImage} // Re-render when loading state changes
      />
      
      {data.length > 1 && (
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? '#2E6074' : '#FFFFFF',
                  width: index === currentIndex ? Width(14) : Width(9),
                }
              ]}
            />
          ))}
        </View>
      )}
      
 <ImageZoomViewer
  visible={zoomVisible}
  imageUrls={[{ url: selectedImage }]} // KEEP THIS SAME
  onClose={() => setZoomVisible(false)}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Height(12),
    position: 'relative'
  },
  card: {
    marginRight: Width(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Height(18),
    position: 'absolute',
    bottom: Height(10),
    left: 0,
    right: 0,
  },
  dot: {
    width: Width(9),
    height: Width(9),
    borderRadius: Width(10),
    marginHorizontal: Width(2),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
});

export default CustomZoomCasual;