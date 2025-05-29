import React , {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Height, Width } from '../../constants';
import { styles } from './styles';

const CustomProductCard = ({
  data = [],
  selected,
  onSelect = () => {},
  bgColor = '#D4E7F2',
  width = Width(45), // Adjusted for 2 columns
  height = Width(45),
  imageSize = Width(30),
  borderRadius = borderRadius ? borderRadius : Width(16),
  selectedBorderColor = '#416F81',
  textColor = '#000',
  containerStyle,
  textStyle,
  horizontal = false,
  numColumns = 1,
  gap = Width(12),
  horizontalGap = Width(10),
  verticalGap = Height(14),
  navigation
}) => {
  const [favourites, setFavourites] = useState([]);
  
    const onToggleFavourite = (id) => {
      setFavourites((prev) =>
        prev.includes(id)
          ? prev.filter((favId) => favId !== id)
          : [...prev, id]
      );
    };

    

  return (
    <View style={[styles.main,{...containerStyle}]}>
      <FlatList
        data={data}
        horizontal={horizontal}
        numColumns={numColumns}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={
          !horizontal
            ? {
                justifyContent: 'space-between',
                marginBottom: verticalGap,
              }
            : undefined
        }
        
    renderItem={({ item, index }) => {
  const isSelected = selected === index;
  const isLastItem = index === data.length - 1;
  const isFavourite = favourites.includes(index);

  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(index); // pass index instead of item.name
        if (item.screen && navigation) {
          navigation.navigate(item.screen);
        }
      }}
      style={[
        styles.card,
        {
          marginRight: horizontal && !isLastItem ? horizontalGap : 0,
          marginBottom: !horizontal ? verticalGap : 0,
          width,
        },
      ]}
    >
      <View
        style={[
          styles.imageWrapper,
          {
            width,
            height,
            borderRadius,
            backgroundColor: bgColor,
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? selectedBorderColor : 'transparent',
          },
        ]}
      >
        <Image
          source={item.image}
          style={{ width: imageSize, height: imageSize }}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.topRow, { width: width - 4 }]}>
        <Text style={styles.label}>{item.label || 'Label'}</Text>
        <TouchableOpacity onPress={() => onToggleFavourite(index)} style={{ marginHorizontal: Height(3) }}>
          <Ionicons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavourite ? '#416F81' : '#0E2D42'}
          />
        </TouchableOpacity>
      </View>

      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, { width }]}
      >
        {item.title || item.name}
      </Text>

      <Text style={[styles.price, { width }]}>
        {item.price ? `₹${item.price}` : ''}
      </Text>
    </TouchableOpacity>
  );
}}

      />
    </View>
  );
};

export default CustomProductCard;


