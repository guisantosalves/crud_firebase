//importações padroes
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import env from "react-dotenv";

//configurando o firebase
const firebaseConfig = {
  apiKey: env.API_KEY,

  authDomain: env.AUTH_DOMAIN,

  projectId: env.PROJECT_ID,

  storageBucket: env.STORAGE_BUCKET,

  messagingSenderId: env.MESSAGING_SENDERID,

  appId: env.APP_ID,
};

//inicializando o firebase e o firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}