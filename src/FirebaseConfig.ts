import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB98oIlLyALmcZRzsDG6SJjyvhFMjU-pAw",
  authDomain: "nostal-profile.firebaseapp.com",
  projectId: "nostal-profile",
  storageBucket: "nostal-profile.appspot.com",
  messagingSenderId: "606515552991",
  appId: "1:606515552991:web:ad2803d1ac63041caabf6a",
  measurementId: "G-3S4K6BHD41",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const PROFILES_KEY = "nostal-profiles";
export const storage = getStorage();
