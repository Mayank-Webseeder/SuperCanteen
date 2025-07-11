import { COLORS } from '@constants/index';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginBottom:8,
    

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily:"Inter-SemiBold",
    color: COLORS.black,
    marginLeft: 6,
  },
  markAllText: {
    color: COLORS.green,
    fontWeight: '500',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,

  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 15,
    fontFamily:"Inter-SemiBold",
    color: COLORS.black,
    marginBottom: 4,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  notificationMessage: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: 4,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.gray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.darkGray,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
    textAlign: 'center',
  },
  loader: {
    marginTop: 40,
  }
});