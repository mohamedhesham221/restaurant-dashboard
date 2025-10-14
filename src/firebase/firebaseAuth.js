import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

// Environment variables for Firebase configuration
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

// Initialize Firebase Authentication
export const auth = getAuth(app);

// ✅ Register a new user with email and password + update their display name
export const registerUser = async (email, password, name) => {
  const userCredintals = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(userCredintals.user, {
    displayName: name
  })
  return userCredintals.user
}
// ✅ Sign in an existing user
export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}
// ✅ Log out the current user
export const logOutUser = () => {
  return signOut(auth)
}

// ✅ Get current user 
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscripe = onAuthStateChanged(auth, (user) => {
      unsubscripe()
      resolve(user ? user : null)
    })
  })

}

