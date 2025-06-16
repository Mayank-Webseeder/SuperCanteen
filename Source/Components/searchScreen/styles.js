import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../constants";

export const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Height(15),
    paddingHorizontal:Height(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    elevation: 2,
  },
  iconStyle: {
    padding: Height(5),
    marginRight: Width(10),
  },
  searchContainer: {
    flex: 1,
  },
   disabledStyle: {
    opacity: 1
  },
   searchInput: {
    height: Height(34),  // Reduced height
    borderRadius: 5,     // Tighter radius
    paddingHorizontal: 12,
    fontSize: 14,        // Smaller font
  },
  scrollContainer: {
    paddingBottom: Height(20),
    paddingTop: Height(10),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Height(200),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Height(200),
    paddingHorizontal: Height(20),
  },
  noDataText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    marginBottom: Height(5),
  },

  suggestionSection: {
    marginBottom: Height(6),
    paddingHorizontal: Width(15),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Height(15),
   
  },
  suggestionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: Width(8),
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchSuggestionItem: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: Height(15),
    paddingVertical: Height(10),
    borderRadius: 20,
    marginRight: Width(10),
    marginBottom: Height(10),
  },
  searchSuggestionText: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  containerView: {
    marginTop: Height(4)
  },
  textStyle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: Height(5),
    fontFamily: "Inter-Medium"
  },






debouncingText: {
  marginTop: Height(10),
  color: '#666',
},

resultsCount: {
  fontSize: 14,
  color: '#666',
  paddingHorizontal: Height(15),
  paddingVertical: Height(10),
},


suggestionsContainer: {
  paddingHorizontal: Height(15),
  marginBottom: Height(20),
},
suggestionItem: {
  paddingVertical: Height(12),
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
},
suggestionText: {
  fontSize: 15,
  color: '#333',
},
popularSearchesContainer: {
  paddingVertical: Height(5),
},
popularSearchItem: {
  backgroundColor: '#f0f8ff',
  paddingHorizontal: Height(15),
  paddingVertical: Height(10),
  borderRadius: 20,
  marginRight: Width(10),
  borderWidth: 1,
  borderColor: '#008ECC20',
},
popularSearchText: {
  color: '#008ECC',
  fontSize: 14,
  fontWeight: '500',
},
recentSearchesContainer: {
  justifyContent: 'space-between',
},
recentSearchItem: {
  backgroundColor: '#f5f5f5',
  paddingHorizontal: Height(12),
  paddingVertical: Height(8),
  borderRadius: 20,
  marginRight: Width(10),
  marginBottom: Height(10),
  width: Width(170),
},
recentSearchText: {
  color: '#333',
  fontSize: 14,
},
categorySection: {
  marginBottom: Height(20),
},


});