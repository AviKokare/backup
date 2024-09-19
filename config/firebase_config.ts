import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5sodK0I34reyFJYyr_ueYRiINLS9nmSo",
  authDomain: "bada-player-f5917.firebaseapp.com",
  projectId: "bada-player-f5917",
  storageBucket: "bada-player-f5917.appspot.com",
  messagingSenderId: "910855228928",
  appId: "1:910855228928:web:f07e679fed205b6b7c12e5",
  measurementId: "G-EK929KY998"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
