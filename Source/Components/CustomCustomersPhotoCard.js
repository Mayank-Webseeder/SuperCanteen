import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { Height, Width } from '../constants';
import FastImage from 'react-native-fast-image';

const CustomCustomersPhotoCard = ({
  cardHeight = Height(90),
  cardWidth = Width(100),
  data,
}) => {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.card, { height: cardHeight, width: cardWidth }]}>
        <FastImage
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={styles.image}
          resizeMode="cover"
        />
        {item.name && <Text style={styles.name}>{item.name}</Text>}
        {item.review && (
          <Text numberOfLines={2} style={styles.review}>
            “{item.review}”
          </Text>
        )}
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default CustomCustomersPhotoCard;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: Height(3),
    marginVertical:Height(5)
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  image: {
    width: Width(80),
    height: Height(80),
    borderRadius: 12,
    resizeMode:"contain"
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  review: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 6,
    textAlign: 'center',
  },
});
