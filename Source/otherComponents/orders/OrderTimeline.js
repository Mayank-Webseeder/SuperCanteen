import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Width } from '../../constants/constants';

const OrderTimeline = ({ status }) => {
  const steps = [
    { title: 'Order Placed', icon: 'shopping-cart', status: 'completed' },
    { title: 'Shipped', icon: 'local-shipping', status: status === 'cancelled' ? 'cancelled' : 'completed' },
    { title: 'In Transit', icon: 'flight', status: ['arriving', 'delivered'].includes(status) ? 'completed' : 'pending' },
    { title: 'Delivered', icon: 'check-circle', status: status === 'delivered' ? 'completed' : 'pending' },
  ];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View style={styles.stepWrapper} key={index}>
          {/* Step Icon and Line */}
          <View style={styles.stepTopRow}>
            <Icon 
              name={step.icon} 
              size={24} 
              color={step.status === 'completed' ? '#2E6074' : '#ccc'} 
            />
            {index < steps.length - 1 && (
              <View style={[
                styles.connector,
                step.status === 'completed' && styles.completedConnector
              ]} />
            )}
          </View>

          {/* Step Label */}
          <Text style={[
            styles.stepText,
            step.status === 'completed' && styles.completedText
          ]}>
            {step.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stepWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    
  },
  stepTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:Width(25)
  },
  connector: {
    width: Width(30),
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  completedConnector: {
    backgroundColor: '#2E6074',
  },
  stepText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
 marginRight:Width(25)
  },
  completedText: {
    color: '#2E6074',
    fontWeight: '600',
  },
});

export default OrderTimeline;
