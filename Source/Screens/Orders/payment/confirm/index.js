import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import CustomCommonHeader from '../../../../components/common/customCommonHeader';
import CustomCartCard from '../../../../components/cartCard/customCartCard';
import AddressView from '../../../../otherComponents/checkOut/addressView';
import {  Height } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function PaymentConfirmationProcess() {
const navigation = useNavigation()

    const onHadle = () => {
        navigation.navigate('OrderConfirm')

    }

    return (
        <View style={styles.container}>
            <CustomCommonHeader navigation={navigation} title={'Confirm Order'} />
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
               <View style={{paddingHorizontal:Height(10),paddingTop:Height(2)}}>
                       <AddressView navigation={navigation}/>
                      </View>
                <CustomCartCard />


            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.selectionBtn}>Select Payment Method</Text>
                <TouchableOpacity
                    
                    style={styles.confirmButton}
                     
                >
                    <Text onPress={onHadle} style={styles.confirmText}>Confirm Your Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


