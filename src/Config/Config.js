import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCfOPKLRyIyXthurni7zbvLYhVJw3eecaY",
    authDomain: "react-todo-4972f.firebaseapp.com",
    databaseURL: "https://react-todo-4972f-default-rtdb.firebaseio.com",
    projectId: "react-todo-4972f",
    storageBucket: "react-todo-4972f.appspot.com",
    messagingSenderId: "620627086607",
    appId: "1:620627086607:web:70e253298558442cbcc27a",
    measurementId: "G-TRFCFBRWT3"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db}