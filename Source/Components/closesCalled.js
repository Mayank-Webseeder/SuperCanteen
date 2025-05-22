import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Ensure it's installed
import { Height, Width, FontSize } from '../constants/constants';

const WatchCard = ({ item, index }) => {
  const isThirdCard = index === 2;

  return (
    <LinearGradient
      colors={['#D4E7F2', '#7B868C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[
        styles.card,
        isThirdCard && styles.cutCard, // ← apply this only for third card
      ]}
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

const ClosesCalled = ({ data }) => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.background}
        source={require('../../assets/Background/SliderBg.png')}
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

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingBottom: Height(20),
    marginTop: Height(20),
  },
  background: {
    position: 'absolute',
    width: Width(330),
    height: Height(220),
    borderRadius: Width(18),
    alignSelf: 'center',
    top: 0,
  },
  header: {
    paddingHorizontal: Width(24),
    paddingTop: Height(16),
  },
  title: {
    color: '#fff',
    fontSize: FontSize(13),
    fontFamily: 'Inter-SemiBold',
  },
  listContent: {
    paddingLeft: Width(24),
    paddingTop: Height(16),
  },
  card: {
    width: Width(100),
    height: Height(150),
    borderRadius: Width(18),
    marginRight: Width(22), // ← spacing between cards
    overflow: 'hidden',
    alignItems:"center",
    justifyContent:"center"
  },
  image: {
    width: '80%',
    height: Height(100), // ← smaller image
    borderTopLeftRadius: Width(18),
    borderTopRightRadius: Width(18),
    marginTop:Height(30)
  },
  cardFooter: {
    backgroundColor: '#092E3DE8',
    justifyContent: 'center',
    alignItems: 'center',
   width: Width(130),
    height: Height(40),


  },
  cardText: {
    color: '#C0C9CD',
    fontSize: FontSize(12),
    textAlign: 'center',
    fontFamily:"Inter-SemiBold",
    bottom:Height(5)
  },
  
});

