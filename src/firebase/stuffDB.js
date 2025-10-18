// import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, getDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
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

// ✅ get Stuff from data base
export const getStuff = async () => {
  const q = query(collection(db, "stuff"), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const stuff = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return stuff;
};
// update realtime data base
export const subscribeToStuff = (callback) => {
  const q = query(collection(db, "stuff"), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    const stuff = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(stuff);
  });
};

//get Employee
export const getEmployeeById = async (id) => {
  try {
    const empRef = doc(db, "stuff", id);
    const empSnap = await getDoc(empRef);
    return empSnap.data();
  } catch (error) {
    throw new Error("Failed Fetching employee", error);
  }
};
//Add new Employee
export const addEmployee = async (data) => {
  try {
    await addDoc(collection(db, "stuff"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error("Failed Adding employee", error);
  }
};

//Update Employee
export const updateEmployee = async ({ id, data }) => {
    const empRef = doc(db, "stuff", id);
    const empSnap = await getDoc(empRef);
    if (empSnap.exists()) {
      const { createdAt } = empSnap.data();
      await updateDoc(empRef, { ...data, createdAt });
    } else {
      throw new Error("Not found")
    }
};
export const deleteEmployee = async (id) => {
    const empRef = doc(db,"stuff",id)
    await deleteDoc(empRef)
}
