import React , {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FontSize, Height, Width } from '../constants/constants';

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
          const isSelected = selected === item.name;
          const isLastItem = index === data.length - 1;
          const isFavourite = favourites.includes(index) 
          return (
            <TouchableOpacity
            onPress={() => {
              onSelect(item.name); // ✅ update selected
              if (item.screen && navigation) {
                navigation.navigate(item.screen); // ✅ navigate if screen exists
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
              {/* Image Container */}
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

              {/* Top Row: Label + Heart */}
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

              {/* Title */}
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.title, { width }]}
              >
                {item.title || item.name}
              </Text>

              {/* Price */}
              <Text style={[styles.price, { width }]}>
                {item.price ?`₹${item.price}` : ''}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CustomProductCard;

const styles = StyleSheet.create({
  main:{
    paddingVertical:Height(10)
  },
  card: {
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 6,
  },
  label: {
    fontSize: FontSize(12),
    color: COLORS.grey,
    fontFamily:'Inter-Bold' ,
    right:Width(3)
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Height(6),
  },
  title: {
    fontSize: FontSize(12),
    color: '#545454',
    marginTop: 6,
    fontFamily:'Inter-SemiBold'
  },
  price: {
    fontSize: FontSize(12),
    color: '#545454',
    marginTop: 2,
    textAlign: 'left',
    paddingLeft: Width(2),
    fontFamily:'Inter-Regular'
  },
});
