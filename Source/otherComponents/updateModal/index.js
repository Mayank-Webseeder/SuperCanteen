import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon library
import InAppUpdates from 'sp-react-native-in-app-updates';
import { COLORS } from '../../constants';
import { FontSize } from '../../constants';

const UpdateModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const inAppUpdates = new InAppUpdates({
          checkFrequency: 'ON_APP_START',
        });

        // FOR TESTING IN DEBUG MODE: Simulate different scenarios
        if (__DEV__) {
          // Simulate update available (uncomment one):
          // const result = { shouldUpdate: true }; // Test "update available"
          // const result = { shouldUpdate: false }; // Test "no update"
          // throw new Error("Simulated failure"); // Test "check failed"
          
          // Use real check in production
        } else {
        const result = await inAppUpdates.checkNeedsUpdate();
if (result.shouldUpdate) setShowModal(true);
        }
      } catch (err) {
        console.log('Update check failed:', err);
      }
    };

    checkForUpdates();
  }, []);

  const handleUpdatePress = () => {
    const storeUrl = Platform.select({
      android: 'https://play.google.com/store/apps/details?id=com.supercanteen',
      ios: 'itms-apps://itunes.apple.com/app/idYOUR_APP_ID',
    });
    Linking.openURL(storeUrl);
  };

  return (
    <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => {}}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close Icon (Top-Right) */}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setShowModal(false)}
          >
            <Ionicons name="close" size={24} color="#0f0e0eff" />
          </TouchableOpacity>
<View style={styles.center}>
  <Text style={styles.title}>Update Available</Text>
          <Text style={styles.message}>
            A new version is available. Update now for the latest features!
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleUpdatePress}>
            <Text style={styles.buttonText}>Update Now</Text>
          </TouchableOpacity>
          
</View>
        
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
     fontFamily:'Inter-SemiBold',
    marginBottom: 10,
  },
  message: {
    fontSize: FontSize(12),
    textAlign: 'center',
    marginBottom: 20,
       fontFamily:'Inter-Regular',
       lineHeight:20
  },
  button: {
    backgroundColor:COLORS.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Inter-Medium',
  },
  closeButton:{
    justifyContent:"flex-end",
    alignItems:"flex-end"
  },
  center:{
    alignItems:"center",
    justifyContent:"center"
  }
});

export default UpdateModal;