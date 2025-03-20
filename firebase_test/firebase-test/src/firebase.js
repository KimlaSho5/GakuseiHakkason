import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig= {
    apiKey: "AIzaSyCD2Clbs1J1dbGPoM-3zy_gej4A0vTHnbw",
    authDomain: "fir-t-ad27d.firebaseapp.com",
    projectId: "fir-t-ad27d",
    storageBucket: "fir-t-ad27d.firebasestorage.app",
    messagingSenderId: "510872002672",
    appId: "1:510872002672:web:897f9707c017676f57d4b5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;