import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxHY3Zm4PvIzm5oLovwEulUyy8ttSuUSo",
    authDomain: "nemesis-dc980.firebaseapp.com",
    projectId: "nemesis-dc980",
    storageBucket: "nemesis-dc980.appspot.com",
    messagingSenderId: "122657386356",
    appId: "1:122657386356:web:3e5cd13e87c593386e0621",
    measurementId: "G-CGGFPNLB2R"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);