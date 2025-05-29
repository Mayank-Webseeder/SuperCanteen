import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { styles } from './styles';

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


export default FilterTabs;
