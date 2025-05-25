import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, getDoc, serverTimestamp, query, orderBy } from "firebase/firestore";

// Import the necessary Firebase modules

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// ✅ get Meals from data base
export const getMeals = async () => {
  const q = query(collection(db, "meals"), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const meals = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return meals
}

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
    })
    console.log("Meal added");
  } catch (error) {
    console.error("Error adding meal:", error);
  }
  return data
}

// ✅ Update Meal
export const updateMeal = async ({ id, data }) => {
  const mealRef = doc(db, "meals", id)
  const mealSnap = await getDoc(mealRef);
  if (mealSnap.exists()) {
    const { createdAt, quantity } = mealSnap.data(); // Extract the existing `createdAt`
    await updateDoc(mealRef, { ...data, createdAt, quantity }); // Preserve `createdAt` while updating other fields
  } else {
    console.error("Meal not found");
  }
}

// ✅ Delete Meal
export const deleteMeal = async (id) => {
  await deleteDoc(doc(db, "meals", id))
}

// ✅ Get Meal by id
export const getMealById = async (id) => {
  try {
    const mealRef = doc(db, "meals", id);
    const mealSnap = await getDoc(mealRef);
    return mealSnap.data()
  } catch (error) {
    console.error("Error message", error);
  }
}