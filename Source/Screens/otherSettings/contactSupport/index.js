import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView
} from 'react-native';
import { styles } from './styles';
import CustomHeader from '../../../Components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ContactSupport({ navigation }) {
  const openEmail = () => {
    Linking.openURL('mailto:support@gstourism.com');
  };

  const openDialer = () => {
    Linking.openURL('tel:+919999999999');
  };

  return (
    <View style={styles.container}>
      <CustomHeader containerStyle={styles.containerStyle} label="Contact Support" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.helpTitle}>Need Help? We're just a tap away.</Text>
        <Text style={styles.helpSubText}>
          Reach out via call or email, or send us a quick message. Our support team is always here to assist you.
        </Text>

        <TouchableOpacity style={styles.cardBox} onPress={openEmail}>
          <View style={styles.row}>
            <Ionicons name="mail" size={20} color="#2E6074" />
            <Text style={styles.cardTitle}> Email Us</Text>
          </View>
          <Text style={styles.cardValue}>support@gstourism.com</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardBox} onPress={openDialer}>
          <View style={styles.row}>
            <Ionicons name="call" size={20} color="#2E6074" />
            <Text style={styles.cardTitle}> Call Us</Text>
          </View>
          <Text style={styles.cardValue}>+91 99999 99999</Text>
        </TouchableOpacity>

        <View style={styles.messageRow}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#000" />
          <Text style={styles.messageLabel}> Send us a message</Text>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          multiline
          numberOfLines={5}
          maxLength={500}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>0/500</Text>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
