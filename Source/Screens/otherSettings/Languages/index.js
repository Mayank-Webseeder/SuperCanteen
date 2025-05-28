import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../Components/customHeader';
import { COLORS } from '../../../constants/constants';

const languages = ['English', 'Hindi'];

export default function LanguageScreen({navigation}) {
  const [selectedLang, setSelectedLang] = useState('English');

  return (
    <View style={styles.container}>
      <CustomHeader  navigation={navigation} label={'Language'} containerStyle={{paddingHorizontal:10}}/>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Choose Language</Text>

        <View style={styles.card}>
          {languages.map((lang, index) => {
            const isSelected = selectedLang === lang;
            return (
              <TouchableOpacity
                key={index}
                style={styles.radioRow}
                onPress={() => setSelectedLang(lang)}
              >
                <View style={[styles.outerCircle, isSelected && styles.activeCircle]}>
                  {isSelected && <View style={styles.innerDot} />}
                </View>
                <Text style={styles.langText}>{lang}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
    fontFamily:'Inter-SemiBold'
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  outerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  activeCircle: {
    borderColor: '#34C759',
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  langText: { fontSize: 14,fontFamily:'Inter-Regular' , color:COLORS.black },
  
});
