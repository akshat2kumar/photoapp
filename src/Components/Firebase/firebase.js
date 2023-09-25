
import {initializeApp} from "firebase/app";
import{getStorage} from 'firebase/storage';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyA8mkPJMGYOsvHxhf6x1N5D9z-Yzd8DLvM",

  authDomain: "image-6d07f.firebaseapp.com",

  projectId: "image-6d07f",

  storageBucket: "image-6d07f.appspot.com",

  messagingSenderId: "1039740479178",

  appId: "1:1039740479178:web:a4d30fe9787c5d1dceb633",

  measurementId: "G-HVNG7DYTE6"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const dataref=firebase.database();
export const storage=getStorage(app)


