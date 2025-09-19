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
       flex: 1,
  padding: 15, 
  backgroundColor: '#fff',
  paddingTop:Height(20),
  alignItems:"center",
  justifyContent:"center"
    },
    mainContainer:{
      paddingHorizontal:Width(6)
    },
    
     disabledStyle: {
    opacity: 1
  },
    searchInput: {
    height: Height(34), 
    borderRadius: 5,     
    paddingHorizontal: 12,
    fontSize: 14,       
    marginHorizontal:7
  },
     detailsWrapper: {
    paddingHorizontal: Height(4),
    backgroundColor: '#fff',
    borderRadius: Height(10),
    marginHorizontal: 10,
  },
  row:{
   flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"center",
  },
  title: {
    fontSize: FontSize(16),
   fontFamily:'Inter-SemiBold',
    color: '#2E6074E8',
    marginBottom: 5,
    lineHeight: 24,
  },
  colorText: {
  fontSize: 14,
  color: '#666', // subtle grey
  marginBottom: 5,
   fontFamily:'Inter-Regular',
},
textStyle:{
        color: '#808080', 
        fontFamily:"Inter-Medium",
          fontSize: 12,
          marginBottom:1
    },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
  // paddingHorizontal: 16,
  paddingTop: 6,
},
rowTop: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
},
leftTop: {
  flex: 1,            // give left block the flexible width
  marginRight: 8,
},
priceLine: {
  flexDirection: 'row',
  alignItems: 'baseline',
  flexShrink: 1,
},
price: {
  fontSize: 20,
 fontFamily:"Inter-SemiBold",
 color:COLORS.green
},
unitText: {
  fontSize: 13,
  color: '#67707A',
  marginLeft: 3,
  flexShrink: 1,
   fontFamily:"Inter-Regular",
},
unitTextLong: {
  fontSize: 13,
  color: '#67707A',
  marginTop: 2,
  flexShrink: 1,
     fontFamily:"Inter-Regular",
},
rowBottom: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
  marginBottom:8
},
originalPrice: {
  fontSize: 14,
  color: '#8A8F98',
  textDecorationLine: 'line-through',
  marginRight: 8,
     fontFamily:"Inter-Regular",
},
discount: {
  fontSize: 13,
   fontFamily:"Inter-Medium",
  color: COLORS.success,
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
     variantTitle: {
    fontSize: 12.6,
    fontFamily: "Inter-SemiBold",
    marginBottom: 4,
    color: "#333",
     textTransform: "uppercase",
    
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
      paddingBottom:10 ,
      marginTop:10
       
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
     paddingHorizontal:10, 
      paddingVertical: Height(5),
      paddingTop:Height(5)
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily:'Inter-SemiBold',
      color: '#000',
      paddingHorizontal:Height(10)
    
    },
  });
  