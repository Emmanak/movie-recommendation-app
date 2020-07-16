import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDQ4goo6PwT4g_jZp3N9L1rrlLdmanVk2w",
    authDomain: "emmanuel-augustine.firebaseapp.com",
    databaseURL: "https://emmanuel-augustine.firebaseio.com",
    projectId: "emmanuel-augustine",
    storageBucket: "emmanuel-augustine.appspot.com",
    messagingSenderId: "739192872005",
    appId: "1:739192872005:web:de21982d811ada30bf572c",
    measurementId: "G-VN4338SFCL"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//const db = firebase.firestore().settings( {timestampsInSnapshots: true});
const db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

// Initialize the FirebaseUI Widget using Firebase.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider
  ]
};

export { db }; 
export {increment, decrement};
export {uiConfig};