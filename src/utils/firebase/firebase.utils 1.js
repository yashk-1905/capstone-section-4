//we are not going to return any jsx from it because this file is just to use firebase 

//firebase is a suite of tools and similarly firestore is one of the tools inside and it comes from a library within firebase called app

import {initializeApp} from firebase/app;
// this initializeApp function creates an app instance for you based on some kind of config 

// this config is an object that allows us to attach this firebase app instance to the instance we have online 

// now going to homepage of firebase> web > Add firebase to your web > register a web app {crwn-clothing-web-app} > after registering one package will be generated >> we are going to copy the config from over there and paste it over here 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbzRzQGPGZqt2cuMPvu4lvKuwfJGowt74",
    authDomain: "crwn-clothing-db-64675.firebaseapp.com",
    projectId: "crwn-clothing-db-64675",
    storageBucket: "crwn-clothing-db-64675.appspot.com",
    messagingSenderId: "870824986193",
    appId: "1:870824986193:web:6fea74ae6740133de51a70"
  };
  
  // Initialize Firebase
  //   const app = initializeApp(firebaseConfig);

  // we are gonna call this firebaseApp and through this only we can do our CRUD operations
  const firebaseApp = initializeApp(firebaseConfig);