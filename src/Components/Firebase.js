import firebase from 'firebase';


const app = firebase.initializeApp({
    apiKey: "AIzaSyC8HvO880Ltqn5LNu3zRQWE9Ke2QMBnPEI",
    authDomain: "bumago-notes-application.firebaseapp.com",
    projectId: "bumago-notes-application",
    storageBucket: "bumago-notes-application.appspot.com",
    messagingSenderId: "840648010576",
    appId: "1:840648010576:web:37ac813b5a91090dd89a55"
});


const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };