import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showOrderUpdateNotification } from '../services/notificationService';
import { useSocket } from '../path/to/SocketProvider'; 
const SocketListener = () => {
  const dispatch = useDispatch();
  const { socket } = useSocket(); // Get socket from context
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!socket || !user?.id) {
      console.log("⚠️ Socket not ready or user not available");
      return;
    }

    console.log("🟢 SocketListener active with socket ID:", socket.id);

    const handleOrderUpdate = async (data) => {
      try {
        // The backend sends both message and order in the payload
        const { message, order: updatedOrder } = data;
        console.log("📦 Order Updated via Socket:", updatedOrder);

        // Dispatch to Redux
        dispatch({
          type: 'UPDATE_ORDER_FROM_SOCKET',
          payload: updatedOrder
        });

        // Show native notification
        await showOrderUpdateNotification({
          ...updatedOrder,
          message // Include the message in the notification data
        });

      } catch (error) {
        console.error("❌ Error handling order update:", error);
      }
    };

    // Set up listener
    socket.on("orderUpdated", handleOrderUpdate);

    return () => {
      // Clean up listener
      socket.off("orderUpdated", handleOrderUpdate);
    };
  }, [socket, user?.id, dispatch]);

  return null;
};

export default SocketListener;