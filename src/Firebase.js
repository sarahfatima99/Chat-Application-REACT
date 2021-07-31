import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCtW8ZKlmR2zHjoW5HyKZkdVeKsfASqUBQ",
    authDomain: "react-slack-clone-37548.firebaseapp.com",
    projectId: "react-slack-clone-37548",
    storageBucket: "react-slack-clone-37548.appspot.com",
    messagingSenderId: "1066919104295",
    databaseURL: "https://react-slack-clone-37548-default-rtdb.firebaseio.com",
    appId: "1:1066919104295:web:80c07ded1b8c6af20fe302",
    measurementId: "G-RNMVQX9B4L"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;