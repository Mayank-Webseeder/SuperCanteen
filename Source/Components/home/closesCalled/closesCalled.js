import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Ensure it's installed
import { styles } from './styles';

const WatchCard = ({ item, index }) => {
  return (
    <LinearGradient
      colors={['#D4E7F2', '#7B868C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.card}
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.cardFooter}>
        <Text style={styles.cardText} numberOfLines={1}>
          {item.label}
        </Text>
      </View>
    </LinearGradient>
  );
};

const ClosesCalled = ({ data, containerStyle }) => {
  return (
    <View style={[styles.wrapper,{...containerStyle}]}>
      <Image
        style={styles.background}
        source={require('../../../../assets/Background/SliderBg.png')}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Your Closet Called — It Wants These</Text>
      </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <WatchCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ClosesCalled;



