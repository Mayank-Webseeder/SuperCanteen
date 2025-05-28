// components/CouponCard.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CopyIcon } from '../../../../assets/Icons/svgIcons/copy';
import { COLORS } from '../../../constants/constants';
import { styles } from './styles';

const CouponCard = ({ item, isSingleCard,isCoupons }) => {
  return (
    <View style={[styles.card, isSingleCard && styles.singleCard, {paddingBottom: !isCoupons ? 10 : 0}]}>
      <View style={[styles.mainView,{paddingBottom: !isCoupons ? 8 : 0}]}>
      {isCoupons ?   <Text style={styles.cardTitle}>{item.title}</Text> : <Text style={styles.cardTitle}>{item.title} OFF</Text>}
        <Text style={styles.cardDescription}>{item.description}</Text>

{isCoupons &&  <View style={styles.dottedLineWrapper}>
          <Svg height="1" width="100%" style={styles.dottedLine}>
            <Line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke={COLORS.black}
              strokeDasharray="4"
              strokeWidth="5"
            />
          </Svg>
          <MaterialCommunityIcons
            name="content-cut"
            size={16}
            color={COLORS.black}
            style={styles.rightScissorIcon}
          />
        </View>}
       
      </View>

      <View style={styles.rowView}>
        <Text style={styles.cardCode}>Code: {item.code}</Text>
        <TouchableOpacity>
          <Text><CopyIcon /></Text>
        </TouchableOpacity>
      </View>

    {isCoupons ?   <Text style={styles.cardCode}>
        Expiry: <Text style={styles.expiry}>{item.expiry}</Text>
      </Text> :   <Text style={styles.cardCode}>
        Valid till: <Text style={styles.expiry}>{item.expiry}</Text>
      </Text>}

     {isCoupons &&  <TouchableOpacity>
        <Text style={styles.applyText}>Apply Coupon</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default CouponCard;
