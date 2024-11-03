
// Firebase configuration:
const firebaseConfig = {
    apiKey: "AIzaSyCF2LGmFyy8eZtXPoZ0kuzAUrPFDAO2ZmQ",
    authDomain: "bradys-github.firebaseapp.com",
    projectId: "bradys-github",
    storageBucket: "bradys-github.appspot.com",
    messagingSenderId: "868340368524",
    appId: "1:868340368524:web:bdcdee795eade397a2a7a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

//Initialize Authentication:
const auth = firebase.auth();
let isAdminUser = false;