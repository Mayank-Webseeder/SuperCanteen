import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import CustomAuthButton from '../../CustomAuthButton';
import { Height, Width } from '../../../constants';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { IMGURL } from '../../../utils/dataFormatters';

const OrderCard = ({
  onCancel,
  onTrack,
  onReplace,
  onViewDetails,
  onReorder,
  onExchange,
  onReturn,
  onRate,
  cancelTitle = 'Cancel',
  trackTitle = 'Track',
  replaceTitle = 'Replace',
  enableCancel = true,
  enableTrack = true,
  enableReplace = true,
  item = {},
  status = 'awaited'
}) => {
  // Generate unique keys for all elements
  const cardKey = `order_${item.id || 'unknown'}_${status}`;
  const imageKey = `${cardKey}_image`;
  const starsKey = `${cardKey}_stars`;

  const createdAt = new Date(item.createdAt || item.date);
const deliveryDays = item?.orderItems?.[0]?.product?.deliveryDays || 0;
const expectedDate = new Date(createdAt.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
const formattedExpectedDate = expectedDate.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'short',
  day: 'numeric'
});
  // Enhanced status mapping
  const getUIStatus = () => {
    const statusMap = {
      'awaited': 'arriving',
      'delivered': 'delivered',
      'cancelled': 'cancelled',
      'shipped': 'arriving',
      'processing': 'arriving',
      'exchange_initiated': 'exchange_initiated',
      'return_initiated': 'exchange_initiated',
      'refunded': 'cancelled',
      'completed': 'delivered'
    };
    return statusMap[status?.toLowerCase()] || 'arriving';
  };

  const uiStatus = getUIStatus();

  // Action handlers with fallbacks
  const handleAction = (action, defaultMessage) => {
    return () => {
      if (action) {
        action();
      } else {
        console.log(defaultMessage, item.id);
      }
    };
  };

  // Render stars with unique keys
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity 
        key={`${starsKey}_${index}`}
        onPress={handleAction(() => onRate?.(index + 1), 'Rate')}
      >
        <FontAwesome
          name="star"
          size={20}
          color="#D9D9D9"
          style={styles.starIcon}
        />
      </TouchableOpacity>
    ));
  };

  // Status-specific content
  const renderStatusContent = () => {
    const dateText = item.date || 'unknown date';
    

    switch(uiStatus) {
      case "arriving":
        return (
          item?.deliveryDate && 
       <View style={styles.productRow}>
      <FastImage
        style={styles.truckIcon}
        source={require('../../../../assets/Icons/delivery_truck_speed.png')}
      />
      <Text style={styles.productDescription}>
        Expected by {item?.deliveryDate}
      </Text>
    </View>
        );
      
      case "cancelled":
        return (
          <View style={styles.productRow}>
            <Icon name="circle-with-cross" size={18} color="#8E8E8E" />
            <Text style={styles.productDescription}>
              Cancelled on {dateText}
            </Text>
          </View>
        );
      
      case "delivered":
        return (
          <>
            <View style={styles.productRow}>
              <FastImage
                style={styles.truckIcon}
                source={require('../../../../assets/Icons/deployed_code_account.png')}
              />
              <Text style={styles.productDescription}>
                Delivered on {dateText}
              </Text>
            </View>
            <View style={[styles.buttonRow, {marginBottom: 20, marginTop: 6}]}>
              <CustomAuthButton
                key={`${cardKey}_reorder`}
                width={65}
                height={30}
                title={'Reorder'}
                textStyle={[styles.buttonText, { fontSize: 10 }]}
                backgroundColor="#fff"
                onPress={handleAction(onReorder, 'Reorder')}
                borderColor="#2E607426"
                borderWidth={1}
              />
              <CustomAuthButton
                key={`${cardKey}_exchange`}
                width={65}
                height={30}
                title={'Exchange'}
                textStyle={[styles.buttonText, { fontSize: 10 }]}
                backgroundColor="#fff"
                onPress={handleAction(onExchange, 'Exchange')}
                borderColor="#2E607426"
                borderWidth={1}
              />
              <CustomAuthButton
                key={`${cardKey}_return`}
                width={65}
                height={30}
                title={'Return'}
                textStyle={[styles.buttonText, { fontSize: 10 }]}
                backgroundColor="#fff"
                onPress={handleAction(onReturn, 'Return')}
                borderColor="#2E607426"
                borderWidth={1}
              />
            </View>
          </>
        );
      
      case "exchange_initiated":
        return (
          <>
            <View style={styles.productRow}>
              <FastImage
                style={styles.truckIcon}
                source={require('../../../../assets/Icons/currency_rupee_circle.png')}
              />
              <Text style={styles.productDescription}>
                Expected by {item?.deliveryDate}
              </Text>
            </View>
            <Text style={styles.productDescription}>
              Exchange/Return portal closed on {item.returnByDate || dateText}
            </Text>
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackText}>Rate and Review</Text>
              <View style={styles.starRow}>
                {renderStars()}
              </View>
            </View>
          </>
        );
      
      default:
        return null;
    }
  };

  // Action buttons for arriving status
  const renderActionButtons = () => {
    if (uiStatus === "arriving") {
      return (
        <View style={styles.buttonRow}>
          {enableCancel && (
            <CustomAuthButton
              key={`${cardKey}_cancel`}
              width={65}
              height={30}
              title={cancelTitle}
              textStyle={[styles.buttonText, { fontSize: 12 }]}
              backgroundColor="#fff"
              onPress={handleAction(onCancel, 'Cancel')}
              borderColor="#2E607426"
              borderWidth={1}
            />
          )}
          {/* {enableTrack && (
            <CustomAuthButton
              key={`${cardKey}_track`}
              width={65}
              height={30}
              title={trackTitle}
              textStyle={[styles.buttonText, { fontSize: 12 }]}
              backgroundColor="#fff"
              onPress={handleAction(onTrack, 'Track')}
              borderColor="#2E607426"
              borderWidth={1}
            />
          )} */}
          {/* {enableReplace && (
            <CustomAuthButton
              key={`${cardKey}_replace`}
              width={65}
              height={30}
              title={replaceTitle}
              textStyle={[styles.buttonText, { fontSize: 12 }]}
              backgroundColor="#fff"
              onPress={handleAction(onReplace, 'Replace')}
              borderColor="#2E607426"
              borderWidth={1}
            />
          )} */}
        </View>
      );
    }
    return null;
  };

const getVariantImage = (orderItem) => {
  const baseUrl = IMGURL;
  const matchedVariant = orderItem?.product?.variants?.find(
    variant => variant._id === orderItem?.variantId
  );

  if (matchedVariant?.images?.[0]) {
    return `${baseUrl}${matchedVariant.images[0]}`;
  }

  const fallbackImage = orderItem?.product?.images?.[0] || orderItem?.image;
  return fallbackImage?.startsWith('http') ? fallbackImage : `${baseUrl}${fallbackImage}`;
};



  return (
    <View style={styles.card} key={cardKey}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
       <FastImage
  key={imageKey}
  style={styles.icon}
  source={{ uri: getVariantImage(item.orderItems[0]) }}
  resizeMode="contain"
/>
        
        </View>

        <View style={styles.infoContainer}>
          <Text 
            style={styles.brand} 
            numberOfLines={1} 
            ellipsizeMode="tail"
            key={`${cardKey}_brand`}
          >
            {item.brand || 'Brand'}
          </Text>
          <Text 
            style={styles.productName} 
            numberOfLines={1} 
            ellipsizeMode="tail"
            key={`${cardKey}_product`}
          >
            {item.name || 'Product'}
          </Text>

          {renderStatusContent()}

          <TouchableOpacity 
            onPress={handleAction(onViewDetails, 'View Details')}
            key={`${cardKey}_details`}
          >
            <Text style={[
              styles.linkText, 
              {marginTop: uiStatus === "cancelled" ? Height(15) : 0}
            ]}>
              View Order Details
            </Text>
          </TouchableOpacity>

          {renderActionButtons()}
        </View>
      </View>
    </View>
  );
};

export default React.memo(OrderCard);