import { View, Text, Image } from 'react-native'
import {styles} from './styles'
import CustomFavoriteCard from '../../../Components/favoriteCard/customFavoriteCard';

export default function SponsordSection({navigation,searchText}) {
  return (
       <View style={styles.card} >
       <View style={styles.row}>
       <Text style={styles.textStyle} >Style That Doesn’t Clock Out</Text>
       <Image style={styles.iconStyle} source={require('../../../../assets/Icons/av_timer.png')}/>
       </View>
      <CustomFavoriteCard searchText={searchText}  navigation={navigation}  listStyle = {styles.listStyle} whiteBg={true} key="favorites" />
     </View>
  )
}