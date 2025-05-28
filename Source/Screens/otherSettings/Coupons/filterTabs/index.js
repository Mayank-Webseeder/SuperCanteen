import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/constants';
import { FontSize } from '../../../../constants/constants';
import { Height ,  Width } from '../../../../constants/constants';

const FilterTabs = ({ data, selected, onSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tabContainer}
    >
      {data.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => onSelect(item)}
          style={[
            styles.tabItem,
            selected === item && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selected === item && styles.activeTabText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    marginHorizontal: Width(7),
  },
  tabItem: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 20,
    height: Height(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderColor: '#2E6074',
    borderBottomWidth: 1,
  },
  tabText: {
    color: COLORS.black,
    fontSize: FontSize(13),
    fontFamily: 'Inter-Medium',
    marginTop: Height(10),
  },
  activeTabText: {
    color: '#2E6074',
    fontFamily: 'Inter-Medium',
  },
});

export default FilterTabs;
