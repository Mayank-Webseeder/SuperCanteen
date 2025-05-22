import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../Components/CustomHeader'
import CustomSearchInput from '../../Components/CustomSearch'
import CustomCategoryList from '../../Components/CustomCategoryList'
import Products from '../../Mock/Data/Prodcuts'
import CustomProductCard from '../../Components/CustomProductCard'
import offerData from '../../Mock/Data/offerData'
import { Height, Width } from '../../constants/constants'
import ColorCustomSlider from '../../Components/ColorCustomSlider'
import { ScrollView } from 'react-native-gesture-handler'
import CustomBottomSheet from '../../Components/Modals/CustomBottomSheet'
import CustomFilterBtn from '../../Components/CustomFilterBtn'
import CustomBtn from '../../Components/CustomFilterBtn'
import Icon from 'react-native-vector-icons/MaterialIcons'
import WatchStoreData from '../../Mock/Data/WatchStoreData'
import SortBottomSheet from '../../Components/Modals/SortBottomSheet'


const WatchStore = ({ navigation }) => {
  const [showSheet, setShowSheet] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  return (
    <ScrollView>
      <View>
        <CustomHeader label={'Watch Store'} />
        <CustomSearchInput />
        <View style={{ marginVertical: 20 }} >

          <CustomCategoryList height={50} width={62} gap={15} horizontal={true} borderRadius={5} data={WatchStoreData} />

        </View>


        <View style={{ flexDirection: "row", marginHorizontal: 10, columnGap: 10 }} >


          <SortBottomSheet
            visible={sortSheetVisible}
            onClose={() => setSortSheetVisible(false)}
          />

          <CustomBtn
            title="Filter"
            width={80}
            height={30}
            onPress={() => setShowSheet(true)}

            icon={<Icon name="filter-list" size={20} color="#1C1B1F7D" />}
          />
          <CustomBtn
            title="Sort"
            width={80}
            height={30}
            onPress={() => setSortSheetVisible(true)}

            icon={
              <View style={{ transform: [{ rotate: '270deg' }] }}>
                <Icon name="sync-alt" size={20} color="#1C1B1F7D" />
              </View>
            }

          />


        </View>



        <CustomBottomSheet visible={showSheet} onClose={() => setShowSheet(false)}>
          <CustomFilterBtn
            onPress={() => console.log("Filter pressed")}
            label="Filter Options"
          />
        </CustomBottomSheet>






        <Pressable >
          <CustomProductCard
            height={Height(120)}
            imageSize={Width(80)}

            navigation={navigation}
            bgColor="#D4DEF226"
            numColumns={2}
            width={Width(150)}
            horizontal={false}
            data={Products}
          />

        </Pressable>




      </View>


      <ColorCustomSlider data={Products} />


      <Pressable >
        <CustomProductCard
          height={Height(120)}
          navigation={navigation}

          bgColor="#D4DEF226"
          numColumns={2}
          width={Width(150)}
          horizontal={false}
          data={Products}
        />

      </Pressable>

    </ScrollView>

  )
}

export default WatchStore

const styles = StyleSheet.create({})