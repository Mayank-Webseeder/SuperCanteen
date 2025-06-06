import { View, Text } from 'react-native'
import {styles} from './styles'
import CustomFavoriteCard from '../../../Components/favoriteCard/customFavoriteCard';
import FastImage from 'react-native-fast-image';

export default function SponsordSection({navigation,searchText}) {
  return (
       <View style={styles.card} >
       <View style={styles.row}>
       <Text style={styles.textStyle} >Style That Doesn’t Clock Out</Text>
       <FastImage style={styles.iconStyle} source={require('../../../../assets/Icons/av_timer.png')}/>
       </View>
      <CustomFavoriteCard searchText={searchText}  navigation={navigation}  listStyle = {styles.listStyle} whiteBg={true} key="favorites" />
     </View>
  )
}