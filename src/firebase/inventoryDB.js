import {
  collection,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// ✅ get Inventory from data base
export const getInventory = async () => {
  const q = query(collection(db, "inventory"), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const inventory = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return inventory;
};
// update realtime data base
export const subscribeToInventory = (callback) => {
  const q = query(collection(db, "inventory"), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    const inventory = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(inventory);
  });
};

//get inventory item
export const getItemById = async (id) => {
  try {
    const itemRef = doc(db, "inventory", id);
    const itemSnap = await getDoc(itemRef);
    return itemSnap.data();
  } catch (error) {
    throw new Error("Failed Fetching item", error);
  }
};
//Add new item
export const addItem = async (data) => {
  try {
    await addDoc(collection(db, "inventory"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error("Failed Adding item", error);
  }
};

//Update item
export const updateItem = async ({ id, data }) => {
  const itemRef = doc(db, "inventory", id);
  const itemSnap = await getDoc(itemRef);
  if (itemSnap.exists()) {
    const { createdAt } = itemSnap.data();
    await updateDoc(itemRef, { ...data, createdAt });
  } else {
    throw new Error("Not found");
  }
};
export const deleteItem = async (id) => {
  const itemRef = doc(db, "inventory", id);
  await deleteDoc(itemRef);
};
