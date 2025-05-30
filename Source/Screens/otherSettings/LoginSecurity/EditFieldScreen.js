import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import { COLORS } from '../../../constants';

export default function EditFieldScreen({ route, navigation }) {
  const { label, fieldKey, initialValue } = route.params;
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    // You can call API or update global state here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <View style={{paddingHorizontal:8}}>
             <CustomHeader navigation={navigation} label={`Edit ${label}`}/>
        </View>
      <View style={styles.form}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={fieldKey === 'password'}
          value={value}
          onChangeText={setValue}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
 
  form: {
    padding: 16,
    marginTop: 10,
    borderWidth:1,borderColor:'#d2d2d2',marginHorizontal:20
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily:'Inter-SemiBold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor:COLORS.green,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
