import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FontSize, Height, Width } from '../../constants';
import HorizontalLine from '../../otherComponents/home/horizontalLine';
import Header from '../../otherComponents/home/header';
import CustomCategoryList from '@components/CustomCategoryList';
import { useSelector } from 'react-redux';
import { formatCategoryData } from '../../utils/dataFormatters';
import EmptyState from '@components/emptyComponent/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';

const Categories = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
  const { categories, loading: categoriesLoading } = useSelector((state) => state.category);
  const formattedCategories = formatCategoryData(categories);

  useEffect(() => {
    if (!categoriesLoading && categories?.length > 0) {
      if (selectedCategoryIndex == null) {
        setSelectedCategoryIndex(categories[0]._id);
      }
    }
  }, [categoriesLoading, categories]);

  return (
    <View style={styles.inner}>
      <FlatList
        data={[]} // empty data, we only use ListHeaderComponent
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View >
            <Header containerStyle={styles.input} navigation={navigation} />
            <HorizontalLine />
            {categoriesLoading && (
              <ActivityIndicator
                size="large"
                color={COLORS.green}
                style={{ marginVertical: Height(22) }}
              />
            )}
            <CustomCategoryList
              navigation={navigation}
              data={formattedCategories}
              horizontal={false}
              numColumns={4}
              bgColor="#D4DEF226"
              width={Width(65)}
              height={Height(65)}
              borderRadius={Width(5)}
              selectedBorderColor="#008ECC"
              textColor="#333"
              textStyle={styles.textStyle}
              containerStyle={styles.containerStyle}
              gap={Width(19)}
              imageSize={Height(50)}
              selected={selectedCategoryIndex}
              onSelect={setSelectedCategoryIndex}
            />
          </View>
        }
        ListEmptyComponent = {
   formattedCategories.length === 0 && !categoriesLoading ? <EmptyState allEmpty /> : null
  }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    paddingBottom: Height(40),
  },
  input: {
    marginLeft: 6,
  },
  containerStyle: {
    paddingTop: Height(20),
    paddingHorizontal:Height(15)
  },
  textStyle: {
    fontSize: FontSize(13),
    paddingBottom:19
  },
  emptyContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: Height(100),
},
emptyText: {
  fontSize: FontSize(14),
  color: '#888',
  textAlign: 'center',
},
});
