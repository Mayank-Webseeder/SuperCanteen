import { StyleSheet,Dimensions } from "react-native";
import { Height } from "../../../constants";

const { width, height } = Dimensions.get('window');


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
   listContainer: {
    padding: width * 0.04, // 4% of screen width
    paddingBottom: height * 0.2, // 10% of screen height
  },
  loadingContainer:{
    flex:1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 16,
    fontFamily: 'Inter-SemiBold',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
    fontFamily: 'Inter-Regular',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: Height(23),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop:Height(-10),
    
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 12,
  },
  addressTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E6074',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addressTypeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Inter-SemiBold',
  },
  defaultAddressCard: {
  borderLeftWidth: 4,
  borderLeftColor: '#2E6074',
},
  defaultBadge: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  defaultBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  setDefaultButton: {
  padding: 2,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#2E6074',
  marginLeft: 10,
  paddingHorizontal:10
},
setDefaultButtonText: {
  color: '#2E6074',
  fontSize: 10,
},
  actionsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 12,
  },
  deleteButton: {},
  cardBody: {},
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    fontFamily: 'Inter-SemiBold',
  },
  contactText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  addressDetails: {
    flexDirection: 'row',
    marginTop: 12,
  },
  locationIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  addButton: {
    position: 'absolute',
    bottom: Height(55),
    right: 24,
    backgroundColor: '#2E6074',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
  },
  selectedCard: {
  borderWidth: 1,
   borderColor: '#416E81',
    backgroundColor: '#f5f9fa',
},



});