// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8wrTLKz-0C1I_voqgt3WuIjOiFNI_yp4",
  authDomain: "todoapp-1514e.firebaseapp.com",
  databaseURL: "https://todoapp-1514e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoapp-1514e",
  storageBucket: "todoapp-1514e.appspot.com",
  messagingSenderId: "654926884436",
  appId: "1:654926884436:web:88f7557e7a57e6320607c1",
  measurementId: "G-KPQQFSH9SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);