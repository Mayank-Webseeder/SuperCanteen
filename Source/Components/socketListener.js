import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { initializeSocket } from '../utils/socket';

const SocketListener = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!user?.id) return;
    
    console.log("🔍 Initializing socket for user:", user.id);
    const socket = initializeSocket(user.id);

    const handleOrderUpdate = (updatedOrder) => {
      console.log("📦 Order Updated via Socket:", updatedOrder);
      
      // Show notification
      // showMessage({
      //   message: `Order #${updatedOrder.orderNumber} Updated`,
      //   description: `Status: ${updatedOrder.status.toUpperCase()}`,
      //   type: 'info',
      //   duration: 4000,
      //   floating: true,
      //   icon: 'info'
      // });
    };

    socket.on("orderUpdated", handleOrderUpdate);

    return () => {
      console.log("🧹 Cleaning up socket");
      socket.off("orderUpdated", handleOrderUpdate);
      socket.disconnect();
    };
  }, [user?.id, token]);

  return null;
};

export default SocketListener;