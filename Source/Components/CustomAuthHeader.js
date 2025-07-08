import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontSize, Height } from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';

const CustomAuthHeader = ({ title = 'Title', onBackPress , notShowBackArrow }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {!notShowBackArrow && <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress || (() => navigation.goBack())}
      >
       <Entypo name={ 'chevron-small-left'} size={27} color="#333" style={{left:8}} />
      </TouchableOpacity> }
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSpace} />
    </View>
  );
};

export default CustomAuthHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    justifyContent:"center",
    marginTop:Height(30),
    marginBottom:Height(20)
 
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSize(22),
    color: '#000',
    fontFamily:'Inter-SemiBold'
  },
  rightSpace: {
    width: 40, 
  },
});
