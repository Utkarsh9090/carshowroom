import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "orders";

export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    let orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { status });
    return { id, status };
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
