// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqbKm_j8BMgYYnd8vAMvUdjCj9vkUdae0",
  authDomain: "aval-imovel.firebaseapp.com",
  projectId: "aval-imovel",
  storageBucket: "aval-imovel.appspot.com",
  messagingSenderId: "856611254677",
  appId: "1:856611254677:web:0f7d9104c80b2d8989869c",
  storageBucket: "gs://aval-imovel.appspot.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);