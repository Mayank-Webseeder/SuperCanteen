import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

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


export default OrderTimeline;
