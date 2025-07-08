import { RefreshControl } from 'react-native';
import { COLORS } from '@constants/index';

const PullToRefresh = ({ refreshing, onRefresh, children }) => (
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
    colors={[COLORS.green]}
    tintColor={COLORS.green}
    style={{ flex: 1 }}
  >
    {children}
  </RefreshControl>
);

export default PullToRefresh;