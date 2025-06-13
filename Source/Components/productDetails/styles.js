import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../constants";

export const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    container: {
      backgroundColor: '#fff',
    },
    loadingContainer:{
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    },
    mainContainer:{
      paddingHorizontal:Width(10)
    },
    heartIconWrapper: {
      flexDirection:"row",
      justifyContent:"flex-end",
      marginHorizontal:Height(15),
      marginTop:10
    },
     detailsWrapper: {
    paddingHorizontal: Height(4),
    backgroundColor: '#fff',
    borderRadius: Height(10),
    marginHorizontal: 10,
  },
  title: {
    fontSize: FontSize(16),
   fontFamily:'Inter-SemiBold',
    color: '#2E6074E8',
    marginBottom: 12,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    fontFamily:'Inter-SemiBold'
  },
  noRatingText: {
    fontSize: 14,
    color: '#999',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E6074',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 14,
    color: '#416F81',
    marginLeft: 6,
  },
  sellerContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  sellerText: {
    fontSize: 14,
    color: '#666',
  },
  sellerName: {
    fontSize: 14,
    color: '#416F81',
    fontWeight: '600',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  sizeLabel: {
    fontSize: 14,
    color: '#666',
  },
  sizeValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  offersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  offersButtonText: {
    fontSize: 14,
    color: '#2E6074',
    fontFamily:'Inter-Bold',
    marginRight: 4,
    textDecorationLine:"underline"
  },
 
   
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
  
      subText: {
      color: 'gray',
      fontSize: 14,
      marginVertical: Height(4),
    },
    label: {
      color: '#000',
      fontFamily: 'Inter-Medium',
      marginVertical: 5,
      fontSize: 14,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginVertical: 6,
      marginTop:10,
      // paddingVertical:6
    },
    borderStyle:{
       borderTopWidth: 1,
   marginTop:Height(5),
    borderColor: '#E8E8E8'
    },
    infoText: {
      marginLeft: 10,
      fontSize: 14,
      color: '#000',
    },
   
    sectionWrapper: {
      
      paddingVertical: Height(5),
      paddingTop:Height(10)
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily:'Inter-SemiBold',
      color: '#000',
      paddingHorizontal:Height(10)
    
    },
  });
  