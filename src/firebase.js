import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoGz0DK2RP_FDq6DiiF1L2I4v-__x4WEk",
  authDomain: "todoappzwei.firebaseapp.com",
  databaseURL: "https://todoappzwei-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoappzwei",
  storageBucket: "todoappzwei.appspot.com",
  messagingSenderId: "645967297108",
  appId: "1:645967297108:web:30855448558637ed75cbc1",
  measurementId: "G-B3GGY16V6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);