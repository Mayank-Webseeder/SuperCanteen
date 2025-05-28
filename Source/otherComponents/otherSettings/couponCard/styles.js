// components/couponCardStyles.js

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/constants';
import { FontSize } from '../../../constants/constants';
import { Height , Width } from '../../../constants/constants';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: Height(6),
    elevation: 2,
    marginTop: Height(15),
    overflow: 'hidden',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: '48%',
   
  },
  singleCard: {
    maxWidth: '48%',
  },
  mainView: {
    backgroundColor: "#2E6074E8",
    paddingTop: Height(9),
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: FontSize(15),
    color: COLORS.white,
    textAlign: "center",
    fontFamily: 'Inter-SemiBold'
  },
  cardDescription: {
    fontSize: 12,
    color: '#C0CFD5',
    marginVertical: 4,
    textAlign: "center"
  },
  dottedLineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    top: 4
  },
  dottedLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    zIndex: -1,
  },
  rightScissorIcon: {
    zIndex: 1,
    right: Width(10)
  },
  rowView: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Height(10)
  },
  cardCode: {
    fontSize: FontSize(12),
    color: '#8E8E8E',
    textAlign: "center"
  },
  expiry: {
    fontSize: FontSize(12),
    color: '#D9534F',
    marginVertical: 2,
  },
  applyText: {
    color: '#2E6074',
    fontFamily: 'Inter-SemiBold',
    fontSize: FontSize(13),
    textAlign: "center",
    marginVertical: Height(10),
  },
});
