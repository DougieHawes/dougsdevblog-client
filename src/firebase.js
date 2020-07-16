import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAetTXmrBl7oFqQa7Umipta1LBE4lpwNQo",
  authDomain: "mern-gql-135c2.firebaseapp.com",
  // databaseURL: "https://mern-gql-135c2.firebaseio.com",
  projectId: "mern-gql-135c2",
  storageBucket: "mern-gql-135c2.appspot.com",
  // messagingSenderId: "457279515849",
  appId: "1:457279515849:web:702e2d9632fdc1fba1b118",
  measurementId: "G-1PE75MXQB0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
