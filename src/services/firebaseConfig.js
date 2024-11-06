import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCvZlGmUJ8vt2BDYw59ONNek7Pn757zNNg",
    authDomain: "gestao-de-funcionarios-ad340.firebaseapp.com",
    projectId: "gestao-de-funcionarios-ad340",
    storageBucket: "gestao-de-funcionarios-ad340.appspot.com",
    messagingSenderId: "416422345215",
    appId: "1:416422345215:web:e5ee103014ec95302c4fca",
    measurementId: "G-Q524QBKMRZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
