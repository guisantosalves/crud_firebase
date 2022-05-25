//importações padroes
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//configurando o firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkmJ7_CoFj6D1TXdgsuuXzn9n5dv61PqI",

  authDomain: "next-crud-5d230.firebaseapp.com",

  projectId: "next-crud-5d230",

  storageBucket: "next-crud-5d230.appspot.com",

  messagingSenderId: "405305402966",

  appId: "1:405305402966:web:a314dbfae71ebc0355fdf7",
};

//inicializando o firebase e o firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}