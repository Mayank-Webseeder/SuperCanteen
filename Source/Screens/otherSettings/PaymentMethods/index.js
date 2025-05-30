import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { paymentMethodsData } from '../../../Mock/Data/paymentData';
import CustomHeader from '../../../Components/CustomHeader';

const PaymentMethodItem = ({ item }) => {
  return (
    <View style={styles.methodCard}>
      <View style={styles.methodLeft}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={item.icon} size={22} color="#fff" />
        </View>
        <View style={styles.methodText}>
          <Text style={styles.methodTitle}>{item.title}</Text>
          {item.subtitle && <Text style={styles.methodSubtitle}>{item.subtitle}</Text>}
        </View>
      </View>

      {item.action && (
        <TouchableOpacity
          style={item.hasActionButton ? styles.primaryActionButton : styles.textButton}
        >
          <Text
            style={item.hasActionButton ? styles.primaryActionText : styles.textActionText}
          >
            {item.action}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const PaymentScreen = ({ navigation }) => {
  const renderSection = ({ item }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.section}</Text>
      <FlatList
        data={item.items}
        renderItem={({ item: methodItem }) => <PaymentMethodItem item={methodItem} />}
        keyExtractor={(methodItem) => methodItem.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <CustomHeader label={'Payment Methods'} navigation={navigation} />
      </View>

      <FlatList
        data={paymentMethodsData}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default PaymentScreen;
