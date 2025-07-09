import { createContext, useContext, useState, useEffect } from "react";
import {
  addShipment,
  getUserShipments,
  getShipmentById,
  updateShipmentStatus,
   listenToUserShipments,
} from "../firebase/firestore";
import { UserAuth } from "./AuthContext";

const ShipmentContext = createContext();

export function ShipmentContextProvider({ children }) {
  const { user } = UserAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  let unsubscribe;

  if (user) {
    setLoading(true);
    unsubscribe = listenToUserShipments(
      user.uid,
      (userShipments) => {
        setShipments(userShipments);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, [user]);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const userShipments = await getUserShipments(user.uid);
      setShipments(userShipments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createShipment = async (shipmentData) => {
    try {
      const shipmentWithUser = {
        ...shipmentData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        status: "Processing",
        shippingCost: shipmentData.shippingCost || 0
      };
      const shipmentId = await addShipment(shipmentWithUser);
      await fetchShipments();
      return shipmentId;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getShipment = async (shipmentId) => {
    try {
      return await getShipmentById(shipmentId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

 
  const updateStatus = async (shipmentId, newStatus) => {
    try {
      await updateShipmentStatus(shipmentId, newStatus);
      await fetchShipments();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <ShipmentContext.Provider
      value={{
        shipments,
        loading,
        error,
        createShipment,
        getShipment,
        updateStatus,
        fetchShipments,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
}

export function useShipment() {
  return useContext(ShipmentContext);
}