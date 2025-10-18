import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

// ✅ get Meals from data base
export const getOrders = async () => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const orders = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return orders;
};

// update realtime data base
export const subscribeToOrders = (callback) => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(orders);
  });
};

// ✅ Add Orders to data base
export const addOrder = async (data) => {
  try {
    await addDoc(collection(db, "orders"), {
      ...data,
      status: "new",
      createdAt: serverTimestamp(),
    });
    console.log("order added");
  } catch (error) {
    console.error("Error adding order:", error);
  }
  return data;
};

// ✅ Update order
export const updateOrders = async ({ id, data }) => {
  const orderRef = doc(db, "orders", id);
  const orderSnap = await getDoc(orderRef);
  if (orderSnap.exists()) {
    const { createdAt } = orderSnap.data(); // Extract the existing `createdAt`
    await updateDoc(orderRef, { ...data, createdAt }); // Preserve `createdAt` while updating other fields
    console.log("Order updated successfully:", id, data);
  } else {
    console.error("Order not found");
    throw new Error("Order not found");
  }
};

// ✅ Delete Order
export const deleteOrder = async (id) => {
  await deleteDoc(doc(db, "orders", id));
};

// ✅ Get Order by id
export const getOrderById = async (id) => {
  try {
    const orderRef = doc(db, "orders", id);
    const orderSnap = await getDoc(orderRef);
    return orderSnap.data();
  } catch (error) {
    console.error("Error message", error);
  }
};
