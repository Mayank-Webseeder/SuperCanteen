import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomAuthButton from './customAuthButton';
import { Height, Width } from '../constants/constants';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OrderCard = ({
  onCancel,
  onTrack,
  onReplace,
  onViewDetails,
  cancelTitle = 'Cancel',
  trackTitle = 'Track',
  replaceTitle = 'Replace',
  enableCancel = true,
  enableTrack = true,
  enableReplace = true,
  item,
  status
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={item.image}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{item.brand}</Text>
  <Text style={styles.productName}>{item.name}</Text>

{status === "arriving" &&  <View style={styles.productRow}>
            <Image
              style={styles.truckIcon}
              source={require('../../assets/Icons/delivery_truck_speed.png')}
            />
            <Text style={styles.productDescription}>
              Bella Analog Watch for Women
            </Text>
          </View> }

   <View style={styles.productRow}>
       { status === "cancelled"  &&  (
        <>
           <Icon name="circle-with-cross" size={18} color="#8E8E8E" />
            <Text style={styles.productDescription}>Cancelled on your request</Text>
        </>
       )
     }
   </View>

{status === "delivered" &&
<>
<View style={styles.productRow}>
      <Image
                    style={styles.truckIcon}
                    source={require('../../assets/Icons/deployed_code_account.png')}
                  />
        <Text style={styles.productDescription}>Delivered on 20th May</Text>
     </View> 
      <View style={[styles.buttonRow,{marginBottom:20,marginTop:6}]}>
         <CustomAuthButton
                width={65}
                height={30}
                title={'Recorder'}
                textStyle={[styles.buttonText, { fontSize: 10 }]}
                backgroundColor="#fff"
                onPress={() => {}}
                borderColor="#2E607426"
                borderWidth={1}
              />
               <CustomAuthButton
                width={65}
                height={30}
                title={'Exchange'}
                textStyle={[styles.buttonText, { fontSize: 10}]}
                backgroundColor="#fff"
                onPress={() => {}}
                borderColor="#2E607426"
                borderWidth={1}
              />
               <CustomAuthButton
                width={65}
                height={30}
                title={'Return'}
                textStyle={[styles.buttonText, { fontSize: 10 }]}
                backgroundColor="#fff"
                onPress={() => {}}
                borderColor="#2E607426"
                borderWidth={1}
              />
      </View>
      </>
     }



     

          <Text
            onPress={onViewDetails}
            style={[styles.linkText , {marginTop: status === "cancelled" ? Height(15) : ""}]}
          >
            View Order Details
          </Text>

          {status === "arriving"  && <View style={styles.buttonRow}>
            {enableCancel && (
              <CustomAuthButton
                width={65}
                height={30}
                title={cancelTitle}
                textStyle={[styles.buttonText, { fontSize: 12 }]}
                backgroundColor="#fff"
                onPress={onCancel}
                borderColor="#2E607426"
                borderWidth={1}
              />
            )}
            {enableTrack && (
              <CustomAuthButton
                width={65}
                height={30}
                title={trackTitle}
                textStyle={[styles.buttonText, { fontSize: 12 }]}
                backgroundColor="#fff"
                onPress={onTrack}
                borderColor="#2E607426"
                borderWidth={1}
              />
            )}
            {enableReplace && (
              <CustomAuthButton
                width={65}
                height={30}
                title={replaceTitle}
                textStyle={[styles.buttonText, { fontSize: 12 }]}
                backgroundColor="#fff"
                onPress={onReplace}
                borderColor="#2E607426"
                borderWidth={1}
              />
            )}
          </View>}

{status === "exchange_initiated" && (
  <>
  
           <View style={styles.productRow}>
                      <Image
                        style={styles.truckIcon}
                        source={require('../../assets/Icons/currency_rupee_circle.png')}
                      />
                      <Text style={styles.productDescription}>Exchange Delivered on 16th April</Text>
                    </View>
          
                    <Text style={styles.productDescription}>Exchange/Return portal closed on 20th April</Text>
          
                    {/* Feedback Section */}
                    <View style={styles.feedbackContainer}>
                      <Text style={styles.feedbackText}>Rate and Review</Text>
                      <View style={styles.starRow}>
                        {[...Array(5)].map((_, index) => (
                          <FontAwesome
                            key={index}
                            name="star"
                            size={20}
                            color="#D9D9D9"
                            style={styles.starIcon}
                          />
                        ))}
                      </View>
                    </View>
  
  </>
)}

          
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    padding: 16,
    width: 360,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    backgroundColor: '#D4DEF226',
    height: 120,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    width: Height(80),
    height: Height(80),
    resizeMode:"cover"
  },
  infoContainer: {
    flex: 1,
  },
  brand: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
    marginBottom: 4,
  },
  productName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 6,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 6,
  },
  truckIcon: {
    width: 20,
    height: 20,
  },
  productDescription: {
    fontSize: 12,
    color: '#8E8E8E',
    right:Width(2)
  },
  linkText: {
    color: '#2E6074',
    textDecorationLine: 'underline',
    fontSize: 13,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  buttonText: {
    color: '#2E6074E8',
    fontSize: 14,
  },
   feedbackContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  feedbackText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 8,
  }
});
