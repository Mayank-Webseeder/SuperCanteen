import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomHeader from '../../../Components/customHeader';
import { COLORS, Height } from '../../../constants/constants';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16,marginTop:Height(18),borderWidth:1,borderColor:'#d2d2d2',marginHorizontal:20 },
  sectionTitle: { marginBottom: 10 , fontFamily:'Inter-SemiBold'},
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  label: { fontSize: 12, color: '#999', fontFamily:'Inter-SemiBold' },
  value: { fontSize: 14, marginTop: 2 , fontFamily:'Inter-Regular'},
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  editText: { color: COLORS.green, fontSize: 12 },
});
