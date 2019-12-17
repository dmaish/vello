
// const firebaseConfig = {

// export default firebaseConfig;


import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyDyhc5laV1rfcMV526XpdEsQ6dKIkzOYjQ",
    authDomain: "vello-67918.firebaseapp.com",
    databaseURL: "https://vello-67918.firebaseio.com/",
};

  // Initialize Firebase
const firebaseObj = firebase.initializeApp(firebaseConfig);

export default firebaseObj;