import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import CustomCommonHeader from '../../Components/Common/CustomCommonHeader';
import CustomCartCard from '../../Components/customCartCard';
import AddressView from '../../otherComponents/checkOut/addressView';
import { COLORS, Height, Width } from '../../constants/constants';
import { useNavigation } from '@react-navigation/native';


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

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white},
    contentContainerStyle:{
        paddingBottom:Height(8)
    },
    footer: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 12,
    },
    selectionBtn: {
        textAlign: 'center',
        marginBottom: 8,
        fontWeight: '600',
    },
     confirmButton: {
    backgroundColor: '#2E6074',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
    confirmText: { color: '#fff', fontWeight: '600' },
});
