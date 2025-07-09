import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// Add a new shipment
// Corrected version
export const addShipment = async (shipmentData) => {
  try {
    const docRef = await addDoc(collection(db, "shipments"), shipmentData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding shipment: ", error);
    throw error;
  }
};


// Get all shipments for a user
export const getUserShipments = async (userId) => {
  try {
    const q = query(
      collection(db, "shipments"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting shipments: ", error);
    throw error;
  }
};

// Get shipment by ID
export const getShipmentById = async (shipmentId) => {
  try {
    const docRef = doc(db, "shipments", shipmentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("No such shipment!");
    }
  } catch (error) {
    console.error("Error getting shipment: ", error);
    throw error;
  }
};

// Update shipment status
export const updateShipmentStatus = async (shipmentId, newStatus) => {
  try {
    const shipmentRef = doc(db, "shipments", shipmentId);
    await updateDoc(shipmentRef, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating shipment: ", error);
    throw error;
  }
};

// firestore.js - add this with your other exports
export const listenToUserShipments = (userId, onUpdate, onError) => {
  const q = query(collection(db, "shipments"), where("userId", "==", userId));
  return onSnapshot(
    q,
    (querySnapshot) => {
      const shipments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      onUpdate(shipments);
    },
    onError
  );
};