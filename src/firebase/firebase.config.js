// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfHWub-0HXCEatHRKQGk8G3Z5JtYsVSE0",
  authDomain: "doctors-portel-cfbd5.firebaseapp.com",
  projectId: "doctors-portel-cfbd5",
  storageBucket: "doctors-portel-cfbd5.appspot.com",
  messagingSenderId: "187344183147",
  appId: "1:187344183147:web:6077df65310f13b697362e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;