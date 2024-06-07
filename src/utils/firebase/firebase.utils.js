import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbzRzQGPGZqt2cuMPvu4lvKuwfJGowt74",
  authDomain: "crwn-clothing-db-64675.firebaseapp.com",
  projectId: "crwn-clothing-db-64675",
  storageBucket: "crwn-clothing-db-64675.appspot.com",
  messagingSenderId: "870824986193",
  appId: "1:870824986193:web:6fea74ae6740133de51a70",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
