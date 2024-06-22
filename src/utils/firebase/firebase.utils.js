import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,  
  doc,  
  getDoc,
  setDoc,
  collection,
  writeBatch,
  // we need to use these functions of firestore in order to get data from our categories collection inside the shop page
  query, 
  getDocs
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
}

//now we need to get the data from our database collection categories from inside of firestore database 
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  // for generating query on the collectionRef
  const q = query(collectionRef);

  // now this q is gonna get some object that i am gonna store inside the snapshot using the getDocs method as we just imported from the firestore 
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{
    /**
     * docs that we get are like these 
     * hats: {
     *  title: 'Hats',
     *  items: [
     *    {},
     *    {}
     *  ]
     * }
     */
    const {title,items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc
  },{});

  return categoryMap;
}

//now let's go to product context to use this data 


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

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback)