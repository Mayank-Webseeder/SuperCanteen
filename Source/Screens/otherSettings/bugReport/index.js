import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { submitBugReport } from '../../../redux/slices/bugReportSlice'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Entypo from 'react-native-vector-icons/Entypo';
import { showMessage } from 'react-native-flash-message';

const BugReportScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.bugReport);
  
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [issueType, setIssueType] = useState('bug'); // 'bug', 'feature', 'payment', 'account', 'other'

  useEffect(() => {
    navigation.setOptions({
      title: 'Report an Issue',
      headerStyle: {
        backgroundColor: '#2E6074',
      },
      headerTintColor: '#fff',
    });
  }, []);

  const requestGalleryPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      } else {
        if (Platform.Version >= 33) {
          permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
        } else {
          permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        }
      }

      const status = await check(permission);
      if (status === RESULTS.GRANTED) {
        return true;
      } else if (status === RESULTS.DENIED) {
        const result = await request(permission);
        return result === RESULTS.GRANTED;
      }
      return false;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  };
const selectFromGallery = async () => {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) return;

  const result = await launchImageLibrary({
    mediaType: 'photo',
    quality: 0.8,
    selectionLimit: 1,
  });

  if (result.didCancel || result.errorCode) return;

  if (result.assets && result.assets.length > 0) {
    const asset = result.assets[0];
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000000);
    const fileName = `images-${timestamp}-${random}.jpg`;

    setScreenshot({
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      fileName: fileName,
    });
  }
};



const handleSubmit = async () => {
  if (!description) {
    console.log('Description required.');
    return;
  }

  try {
    const formData = new FormData();

    formData.append('description', description);

    if (screenshot?.uri) {
  formData.append('screenshot', {
    uri: screenshot.uri,
    name: screenshot.fileName || `bug_${Date.now()}.jpg`,
    type: screenshot.type || 'image/jpeg',
  });
}
    await dispatch(submitBugReport(formData)).unwrap();

    showMessage({
      message: 'Bug report submitted successfully!',
      type: 'success',
    });

    setDescription('');
    setScreenshot(null);
  } catch (error) {
    console.error('Bug report failed:', error);
    showMessage({
      message: 'Failed to submit bug report',
      type: 'danger',
    });
  }
};





  const renderIssueTypeButtons = () => {
    const types = [
      { value: 'bug', label: 'Bug' },
      { value: 'feature', label: 'Feature Request' },
      { value: 'payment', label: 'Payment Issue' },
      { value: 'account', label: 'Account Problem' },
      { value: 'other', label: 'Other' },
    ];

    return (
      <View style={styles.issueTypeContainer}>
        <Text style={styles.label}>Issue Type *</Text>
        <View style={styles.issueTypeButtons}>
          {types.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.issueTypeButton,
                issueType === type.value && styles.selectedIssueTypeButton,
              ]}
              onPress={() => setIssueType(type.value)}
            >
              <Text style={[
                styles.issueTypeButtonText,
                issueType === type.value && styles.selectedIssueTypeButtonText,
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <View style={{marginBottom:10,flexDirection:"row",justifyContent:"space-between"}}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
         <Entypo style={{right:12}} name="chevron-small-left" size={26} color="#1C1B1F" />
       </TouchableOpacity>
          <Icon name="bug-report" size={30} color="#2E6074" />
          <View/>
        </View>
        <Text style={styles.headerText}>Found an Issue?</Text>
        <Text style={styles.subHeaderText}>
          Help us improve by reporting any problems you encounter
        </Text>
      </View>

      <View style={styles.card}>
        {renderIssueTypeButtons()}

        <Text style={styles.label}>Describe the issue *</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder={
            issueType === 'bug' ? 'What happened? Steps to reproduce?' :
            issueType === 'feature' ? 'What feature would you like to see?' :
            issueType === 'payment' ? 'Describe your payment issue' :
            'Please describe your issue in detail'
          }
          placeholderTextColor="#888"
          multiline
          numberOfLines={5}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={[styles.label, { marginTop: 8 }]}>Add Screenshot (optional)</Text>
        <Text style={[styles.subHeaderText, {marginBottom: 12}]}>
          Attach a screenshot to help us understand the issue better
        </Text>

        <TouchableOpacity
          style={styles.attachButton}
          onPress={selectFromGallery}
        >
          <Icon name="attach-file" size={20} color="#2E6074" />
          <Text style={styles.attachButtonText}>
            {screenshot ? 'Change Screenshot' : 'Attach Screenshot'}
          </Text>
        </TouchableOpacity>

        {screenshot && (
          <View style={styles.screenshotPreview}>
            <Image
              source={{ uri: screenshot.uri }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setScreenshot(null)}
            >
              <Icon name="close" size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.userInfoNote}>
        <Icon name="info" size={16} color="#2E6074" />
        <Text style={styles.noteText}>
          {user
            ? 'Your account details will be included with this report'
            : 'You can include your contact details in the description if you want us to follow up'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, (!description || loading) && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading || !description}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Report</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    paddingBottom: 30,
    paddingHorizontal:15
  },
  header: {
    paddingTop: 20,
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: '#2E6074',
    marginTop: 10,
    textAlign: "left"
  },
  subHeaderText: {
    fontSize: 12.5,
    color: '#666',
    marginTop: 2,
    fontFamily: "Inter-Regular",
    lineHeight: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: '#333',
    marginBottom: 8,
  },
  descriptionInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fafafa',
    fontFamily: "Inter-Regular",
    marginBottom: 10,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2E6074',
    borderRadius: 8,
    marginBottom: 10,
  },
  attachButtonText: {
    color: '#2E6074',
    fontSize: 14,
    marginLeft: 8,
    fontFamily: "Inter-Medium",
  },
  screenshotPreview: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
  },
  noteText: {
    fontSize: 13,
    color: '#2E6074',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#2E6074',
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E6074',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  issueTypeContainer: {
    marginBottom: 15,
  },
  issueTypeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  issueTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  selectedIssueTypeButton: {
    backgroundColor: '#2E6074',
    borderColor: '#2E6074',
  },
  issueTypeButtonText: {
    fontSize: 12,
    color: '#333',
    fontFamily: "Inter-Medium",
  },
  selectedIssueTypeButtonText: {
    color: 'white',
  },
});

export default BugReportScreen;