import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomHeader from '../../../components/customHeader';
import { COLORS } from '../../../constants';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import { styles } from './styles';

export default function LoginSecurityScreen({ navigation }) {
  const fields = [
    { label: 'Name', value: 'Apoorva Gaur', key: 'name' },
    { label: 'Email', value: 'abc99@gmail.com', key: 'email' },
    { label: 'Contact', value: '+91 999-999-9999', key: 'contact' },
    { label: 'Password', value: '••••••', key: 'password' },
  ];

  return (
    <View style={styles.container}>
      
     <View style={{paddingHorizontal:8}}>
        <CustomHeader navigation={navigation} label={'Login & Security'}/>
     </View>
  <HorizontalLine lineStyle={{marginTop:0}}/>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Login and Security</Text>

        {fields.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <View>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate('EditField', {
                  label: item.label,
                  fieldKey: item.key,
                  initialValue: item.value,
                })
              }
            >
              <Icon name="edit-2" size={16} color={COLORS.green} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


