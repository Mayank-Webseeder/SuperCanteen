import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Animated,
  PanResponder,
  TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ImageZoomViewer = ({ visible, imageUrls = [], onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scaleValue = new Animated.Value(1);
  const translateValue = new Animated.ValueXY();

  const handleZoomIn = () => {
    Animated.spring(scaleValue, {
      toValue: 2,
      useNativeDriver: false
    }).start();
  };

  const handleZoomOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: false
    }).start();
  };

  const handleDoubleTap = () => {
    scaleValue._value === 1 ? handleZoomIn() : handleZoomOut();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: translateValue.x, dy: translateValue.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      Animated.spring(translateValue, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
      }).start();
    }
  });

  const renderItem = ({ item }) => {
    return (
      <Animated.View
        style={[
          styles.zoomImageContainer,
          {
            transform: [
              { scale: scaleValue },
              { translateX: translateValue.x },
              { translateY: translateValue.y }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <FastImage
            source={{ uri: item.url }}
            style={styles.zoomImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  };

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.zoomContainer}>
        {/* Background dismiss */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>

        {/* FlatList for images */}
        <FlatList
          data={imageUrls}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x /
                Dimensions.get('window').width
            );
            setCurrentIndex(newIndex);
          }}
        />

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {imageUrls.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? '#FFF' : 'rgba(255,255,255,0.3)'
                }
              ]}
            />
          ))}
        </View>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="close" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  zoomContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  zoomImageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  zoomImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7
  },
  pagination: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 6
  }
});

export default ImageZoomViewer;
