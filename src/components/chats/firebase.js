// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJpnEQj3RRm7KcUyzytm5HVSNWgBLLImU",
  authDomain: "fastaff-sarl.firebaseapp.com",
  projectId: "fastaff-sarl",
  storageBucket: "gs://fastaff-sarl.firebasestorage.app", // <- fixed storage URL
  messagingSenderId: "892009827993",
  appId: "1:892009827993:web:9aee155742ce3f69f9f208",
  measurementId: "G-S84YH8GMBY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Export instances
export { app, analytics, db, storage };
