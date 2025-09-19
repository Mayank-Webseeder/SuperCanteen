import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageZoomViewer from './ImageZoomViewer';
import { COLORS, Height, Width } from '@constants/index';

const SCREEN_WIDTH = Dimensions.get('window').width;

// ✅ Normalize URLs to avoid duplicates
const normalizeUri = (uri) => {
  if (!uri) return null;
  return uri
    .replace(/(https?:\/\/[^/]+)\/(\/+)/, '$1/')
    .replace(/([^:]\/)\/+/g, '$1');
};

const CustomZoomCasual = ({
  data = [],
  cardWidth,
  cardHeight,
  cardRadius,
  paddingHorizontal = Width(12),
  borderWidth,
  resizeMode,
  cardStyle,
  containerStyle,
  onImagePress,
}) => {
  // ✅ Remove duplicates
  const uniqueImages = useMemo(() => {
    const seen = new Set();
    return data.filter(item => {
      let url;
      if (typeof item === 'string') {
        url = item;
      } else if (item?.image) {
        url = typeof item.image === 'string' ? item.image : item.image.uri;
      } else if (item?.uri) {
        url = item.uri;
      }
      const normalizedUrl = url ? normalizeUri(url) : null;
      if (normalizedUrl && !seen.has(normalizedUrl)) {
        seen.add(normalizedUrl);
        return true;
      }
      return false;
    });
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const flatListRef = useRef();
  const width = cardWidth || SCREEN_WIDTH - Width(25);
  const height = cardHeight || Height(280);
  const radius = cardRadius || Width(14);

  // ✅ Cache + loaded refs
  const loadedImagesRef = useRef(new Set());
  const imageCacheRef = useRef(new Map());

  // ✅ Preload ALL images once
  useEffect(() => {
    if (uniqueImages.length === 0) return;

    const preloadImages = uniqueImages.map((item, i) => {
      const source = getImageSource(item, i);
      if (source && source.uri) {
        const normalizedUri = normalizeUri(source.uri);
        imageCacheRef.current.set(`img-${i}`, { ...source, uri: normalizedUri });
        return {
          uri: normalizedUri,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        };
      }
      return null;
    }).filter(Boolean);

    if (preloadImages.length > 0) {
      FastImage.preload(preloadImages);
    }
  }, [uniqueImages]);

  // ✅ Viewability tracker
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0];
      if (firstVisibleItem?.index !== undefined) {
        setCurrentIndex(firstVisibleItem.index);
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
    minimumViewTime: 50,
  }).current;

  // ✅ Handle press → open zoom instantly
  const handleImagePress = useCallback((item, index) => {
    const source = getImageSource(item, index);
    if (source?.uri) {
      setSelectedImage(normalizeUri(source.uri));
      setZoomVisible(true);
      if (onImagePress) onImagePress(source.uri);
    }
  }, [onImagePress, getImageSource]);

  // ✅ Source resolver with cache check
  const getImageSource = useCallback((item, index) => {
    const cachedSource = imageCacheRef.current.get(`img-${index}`);
    if (cachedSource) return cachedSource;

    if (typeof item === 'string') return { uri: normalizeUri(item) };
    if (item?.image) {
      return typeof item.image === 'string'
        ? { uri: normalizeUri(item.image) }
        : { uri: normalizeUri(item.image.uri) };
    }
    if (item?.uri) return { uri: normalizeUri(item.uri) };
    if (typeof item === 'number') return item;
    return null;
  }, []);

  
const AutoFitImage = React.memo(({
  source,
  borderRadius,
  resizeModeProp,
  index,
  containerHeight = height,
}) => {
  const [error, setError] = useState(false);

  const onError = useCallback((err) => {
    setError(true);
    console.warn('Image load error', err);
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: containerHeight,
        borderRadius,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}
    >
      {!error ? (
        <FastImage
          source={{
            ...source,
            cache: FastImage.cacheControl.immutable, // ✅ always cache
            priority: FastImage.priority.high,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode={resizeModeProp || 'contain'}
          fallback={Platform.OS === 'android'}
          onError={onError}
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ Failed to load</Text>
        </View>
      )}
    </View>
  );
});


  const renderItem = useCallback(({ item, index }) => {
    const source = getImageSource(item, index);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleImagePress(item, index)}
      >
        <View
          style={[
            styles.card,
            {
              width,
              borderRadius: radius,
              borderWidth: borderWidth ?? 1,
              borderColor: '#E3E3E3',
              marginBottom: uniqueImages.length > 1 ? Height(25) : Height(10),
              ...cardStyle,
            },
          ]}
        >
          {source ? (
            <AutoFitImage
              source={source}
              borderRadius={radius}
              resizeModeProp={resizeMode}
              index={index}
              containerHeight={height}
            />
          ) : (
            <View
              style={{
                width: '100%',
                height,
                backgroundColor: '#F0F0F0',
                borderRadius: radius,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }, [width, radius, borderWidth, cardStyle, height, resizeMode, handleImagePress, getImageSource, uniqueImages.length]);

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={uniqueImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => {
          const uri =
            typeof item === 'string'
              ? item
              : item?.image
              ? typeof item.image === 'string'
                ? item.image
                : item.image.uri
              : item?.uri;
          return uri ? `img-${uri}` : `idx-${index}`;
        }}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal, marginHorizontal: 2 }}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews={true}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        updateCellsBatchingPeriod={100}
        scrollEventThrottle={32}
        getItemLayout={(data, index) => ({
          length: width + Width(12),
          offset: (width + Width(12)) * index,
          index,
        })}
      />

      {uniqueImages.length > 1 && (
        <View style={styles.pagination}>
          {uniqueImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? '#2E6074' : '#FFFFFF',
                  width: index === currentIndex ? Width(14) : Width(9),
                },
              ]}
            />
          ))}
        </View>
      )}

      <ImageZoomViewer
        visible={zoomVisible}
        imageUrls={[{ url: selectedImage }]}
        onClose={() => setZoomVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Height(8),
    position: 'relative',
  },
  card: {
    marginRight: Width(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: Height(10),
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
  errorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: Width(14),
    color: '#333',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(CustomZoomCasual);
