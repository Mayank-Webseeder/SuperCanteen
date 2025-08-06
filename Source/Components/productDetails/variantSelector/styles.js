import { COLORS, FontSize, Height } from "@constants/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius:12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    paddingVertical:4,
    paddingBottom:7,
    marginBottom:Height(10),
    borderTopColor:'#F3F4F5',
    borderTopWidth:1,
    
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Height(4),
   
  },
  sectionTitle: {
    fontSize: FontSize(14),
    fontFamily:"Inter-Medium",
    color: '#333',
    marginTop:3,
    marginBottom:1,
   
  },
  selectedSizeText: {
    fontSize: 14,
    color: COLORS.green,
    fontFamily:"Inter-SemiBold",
  
  },
  colorsContainer: {
    paddingBottom: 8,
  },
  colorOption: {
    alignItems: 'center',
    marginRight:Height(8)
    
  },
  colorImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor:'#F3F4F5',
    marginBottom: 2,
    position: 'relative',
   
  },
  colorImage: {
    width: '100%',
    height: '100%',
   
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: COLORS.green,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  checkBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: COLORS.green,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedColorName: {
    color: COLORS.green,
    fontFamily:"Inter-Medium",
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: 4,
  },
  sizeOption: {
    width: 50,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: '#FFF',
    position: 'relative',
    overflow: 'hidden',
  },
  selectedSize: {
    borderColor: COLORS.green,
    backgroundColor: '#D6E4EA',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  sizeDisabled: {
    opacity: 0.6,
  },
  sizeDisabledText: {
    color: '#999',
  },
  sizeOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  defaultOption: {
  backgroundColor: '#F5F5F5',
  justifyContent: 'center',
  alignItems: 'center',
},
defaultBadge: {
  position: 'absolute',
  bottom: 6,
  right: 6,
  backgroundColor: COLORS.gray,
  width: 22,
  height: 22,
  borderRadius: 11,
  justifyContent: 'center',
  alignItems: 'center',
},
imagePlaceholder: {
  width: '100%',
  height: '100%',
  backgroundColor: '#F5F5F5',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 35,
},
errorText: {
  color: COLORS.error,
  fontSize: 14
},
disabledSize: {
  backgroundColor: '#F5F5F5', // faded gray
  borderColor: '#F5F5F5',
},


 disabledText: {
    color: '#999',
  },
});