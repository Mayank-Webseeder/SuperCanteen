import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../components/customHeader';
import { styles } from './styles';

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


