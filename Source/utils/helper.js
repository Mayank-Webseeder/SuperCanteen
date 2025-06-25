import Toast from 'react-native-toast-message';

// Add this helper function to convert color names to hex codes
export const getColorHex = (colorName) => {
  const colorMap = {
    'ivory': '#FFFFF0',
    'toffee': '#D1B48C',
    // Add more color mappings as needed
  };
  
  // Try to match the color name (case insensitive)
 const lowerColor = colorName.toLowerCase();
  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerColor.includes(key)) {
      return value;
    }
  }
  
  // Default color if no match found
  return '#CCCCCC';
};

export const showWishlistToast = (message, type = 'success') => {
  Toast.show({
    type: 'wishlistToast',
    text1: message,
    position: 'bottom',
    visibilityTime: 2000,
    autoHide: true,
    bottomOffset: 70,
  });
};



