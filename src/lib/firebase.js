import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsWl0jst5WjNJykYetbzHdMF2h7EoSAaw",
  authDomain: "pinterest-fc96e.firebaseapp.com",
  projectId: "pinterest-fc96e",
  storageBucket: "pinterest-fc96e.appspot.com",
  messagingSenderId: "192037213539",
  appId: "1:192037213539:web:c645db2f1afb79fa48ef56"
};
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
