import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import { formatCategoryData } from '../../../utils/dataFormatters';
import { COLORS, FontSize, Height, Width } from '@constants/index';

const GetCategory = ({ selectedIndex, setSelectedIndex, categories, navigation }) => {
  if (!categories) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={COLORS.green} />
      </View>
    );
  }

  if (categories.length === 0) {
    return <View style={styles.emptyContainer} />;
  }

  const formattedCategories = formatCategoryData(categories).slice(0, 7);

  const modifiedCategories = [
    ...formattedCategories,
    {
      _id: 'all-icons',
      name: 'All',
      icon: require('../../../../assets/Icons/AlIcons.png'),
      isAllIcon: true,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Categories</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CustomCategoryList
          data={modifiedCategories}
          horizontal
          selected={selectedIndex}
          onSelect={(id) => {
            if (id === 'all-icons') {
              navigation.navigate('Main', { screen: 'Categories' });
            } else {
              setSelectedIndex(id);
            }
          }}
          bgColor="#D4E7F2"
          width={50}
          height={50}
          borderRadius={32}
          textColor="#333"
          textStyle={styles.textStyle}
          imageSize={36}
          showsHorizontalScrollIndicator={false}
          imageStyle={styles.imageStyle}
          contentContainerStyle={styles.listContent}
          categoryContainerStyle={{ marginRight: Height(1) }}
          imageContainerStyle={{ backgroundColor: 'transparent' }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    height: Height(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    height: Height(100),
  },
  header: {
    paddingTop: Height(8),
    paddingHorizontal: Width(20),
    paddingBottom: Height(6),
  },
  headerTitle: {
    fontSize: FontSize(15),
    fontFamily: "Inter-SemiBold",
    color: COLORS.green,
  },
  scrollContent: {
    paddingBottom: Height(10),
  },
  listContent: {
    paddingLeft: Width(20),
    paddingRight: Width(20),
    paddingTop:4,
  },
  textStyle: {
    fontSize: 12,
    marginTop: Height(8),
  },
  imageStyle: {
    borderRadius: Width(18),
  },
});

export default GetCategory;