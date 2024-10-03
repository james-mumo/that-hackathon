// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmRHyzpVgWo0EruwoWsS_YW325AXqx_Uc",
  authDomain: "elimutec-app.firebaseapp.com",
  projectId: "elimutec-app",
  storageBucket: "elimutec-app.appspot.com",
  messagingSenderId: "343617839554",
  appId: "1:343617839554:web:4039e2e5cb8220c94c765b",
  measurementId: "G-M1K81TFWF6",
};

// Initialize Firebase
const initApp = initializeApp(firebaseConfig);
const appAuth = getAuth(initApp);
const firebaseDB = getDatabase(initApp);

export default initApp;
export { firebaseDB, appAuth };
