import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { createContactUs, resetContactUsState } from '../../../redux/slices/contactUsSlice';
import { showMessage } from 'react-native-flash-message';

export default function ContactSupport({ navigation }) {
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const dispatch = useDispatch();
  const { loading, error, isSubmitted } = useSelector((state) => state.contactUs);
   const { token, user } = useSelector(state => state.auth);
  const openEmail = () => {
    Linking.openURL('mailto:binarytopfunding@gmail.com');
  };

  const openDialer = () => {
    Linking.openURL('tel:+919999999999');
  };

  const handleMessageChange = (text) => {
    setMessage(text);
    setCharCount(text.length);
  };

  const handleSubmit = () => {
    if (!message.trim()) {
       showMessage({
                  message: 'Please enter your message',
                  type: 'danger',
                  icon: 'danger',
                  duration: 4000,
                });
      return;
    }
    
    dispatch(createContactUs({ message }));
  };

  React.useEffect(() => {
    if (isSubmitted) {
        showMessage({
                    message: 'Your message has been submitted successfully!',
                    type: 'success',
                    icon: 'success',
                    duration: 3000,
                  });
      setMessage('');
      setCharCount(0);
      dispatch(resetContactUsState());
    }
    
    if (error) {
     console.log('Error', error);
      dispatch(resetContactUsState());
    }
  }, [isSubmitted, error]);

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
          <Text style={styles.cardValue}>binarytopfunding@gmail.com</Text>
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
          value={message}
          onChangeText={handleMessageChange}
        />
        <Text style={styles.charCount}>{charCount}/500</Text>

        <TouchableOpacity 
          style={[styles.submitBtn, loading && styles.disabledBtn]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? 'Submitting...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}