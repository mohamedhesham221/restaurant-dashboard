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
export const getMeals = async () => {
  const q = query(collection(db, "meals"), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const meals = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return meals;
};

// update realtime data base
export const subscribeToMeals = (callback) => {
  const q = query(collection(db, "meals"), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    const meals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(meals);
  });
};

// ✅ Add Meals to data base
export const addMeal = async (data) => {
  try {
    await addDoc(collection(db, "meals"), {
      ...data,
      quantity: 0,
      createdAt: serverTimestamp(),
    });
    console.log("Meal added");
  } catch (error) {
    console.error("Error adding meal:", error);
  }
  return data;
};

// ✅ Update Meal
export const updateMeal = async ({ id, data }) => {
  const mealRef = doc(db, "meals", id);
  const mealSnap = await getDoc(mealRef);
  if (mealSnap.exists()) {
    const { createdAt, quantity } = mealSnap.data(); // Extract the existing `createdAt`
    await updateDoc(mealRef, { ...data, createdAt, quantity }); // Preserve `createdAt` while updating other fields
  } else {
    console.error("Meal not found");
  }
};

// ✅ Delete Meal
export const deleteMeal = async (id) => {
  await deleteDoc(doc(db, "meals", id));
};

// ✅ Get Meal by id
export const getMealById = async (id) => {
  try {
    const mealRef = doc(db, "meals", id);
    const mealSnap = await getDoc(mealRef);
    return mealSnap.data();
  } catch (error) {
    console.error("Error message", error);
  }
};
