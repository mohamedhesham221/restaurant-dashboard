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

// ✅ get Reservations from data base
export const getReservations = async () => {
  const q = query(collection(db, "reservations"), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const reservations = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return reservations
}

// update realtime data base
export const subscribeToReservations = (callback) => {
  const q = query(collection(db, "reservations"), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    const reservations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(reservations);
  });
};

// ✅ Add Reservations to data base
export const addReservation = async (data) => {
  try {
    await addDoc(collection(db, "reservations"), {
      ...data,
      createdAt: serverTimestamp(),
    })
    console.log("Reservation added");
  } catch (error) {
    console.error("Error adding Reservation:", error);
  }
  return data
}

// ✅ Update Reservation
export const updateReservation = async ({ id, data }) => {
  const reservationRef = doc(db, "reservations", id)
  const reservationSnap = await getDoc(reservationRef);
  if (reservationSnap.exists()) {
    const { createdAt  } = reservationSnap.data(); // Extract the existing `createdAt`
    await updateDoc(reservationRef, { ...data, createdAt }); // Preserve `createdAt` while updating other fields
  } else {
    console.error("Reservation not found");
  }
}

// ✅ Delete Reservation
export const deleteReservation = async (id) => {
  await deleteDoc(doc(db, "reservations", id))
}

// ✅ Get Reservation by id
export const getReservationById = async (id) => {
  try {
    const reservationRef = doc(db, "reservations", id);
    const reservationSnap = await getDoc(reservationRef);
    return reservationSnap.data()
  } catch (error) {
    console.error("Error message", error);
  }
}