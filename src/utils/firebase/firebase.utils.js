import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // firebase provides us with these observable listners which is a way for us to hook into a stream of events like signIn or signOut events and based on these changes we are able to trigger something 
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,  
  doc,  
  getDoc,
  setDoc
} from "firebase/firestore";
import { useCallback } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCbzRzQGPGZqt2cuMPvu4lvKuwfJGowt74",
  authDomain: "crwn-clothing-db-64675.firebaseapp.com",
  projectId: "crwn-clothing-db-64675",
  storageBucket: "crwn-clothing-db-64675.appspot.com",
  messagingSenderId: "870824986193",
  appId: "1:870824986193:web:6fea74ae6740133de51a70",
};
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
      const {displayName,email} = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        }) 
      }catch (error){
        console.log('error creating the user',error.message);
      }
    }
    return userDocRef;
} 

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser  = async () => {
  await signOut(auth); 
}

// onAuthStateChanged takes in two parameters first one is gonna be the auth that's gonna keep track of the signIn and signOut events, and second one will be a callback that's gonna trigger everytime this auth state changes 
export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback)

//now we are gonna use onAuthStateChangedListner in our context as the majority of the code that has to do with fetching and keeping track of what the user value is should probably be kept in a place where we are also storing it 