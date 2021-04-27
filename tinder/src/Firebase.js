import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBxHJLDoc0lJLCUAiyUuke_cgXYzXiuI64",
    authDomain: "tinder-clone-f766a.firebaseapp.com",
    projectId: "tinder-clone-f766a",
    storageBucket: "tinder-clone-f766a.appspot.com",
    messagingSenderId: "1027051288077",
    appId: "1:1027051288077:web:33f39e1f5ee885408dc744",
    measurementId: "G-7C5RYFLL9V"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const database = firebaseApp.firestore();
  export default database;
