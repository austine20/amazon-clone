import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCEDZpPUS1eggNu47uMFIo924FnTF8KUjs",
    authDomain: "clone-6905e.firebaseapp.com",
    projectId: "clone-6905e",
    storageBucket: "clone-6905e.appspot.com",
    messagingSenderId: "1009409546349",
    appId: "1:1009409546349:web:ac57d9a3ff7d7cc5ecc764",
    measurementId: "G-J21L4W9SNN"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  export const db = getFirestore(firebaseApp);
  export const auth = getAuth(firebaseApp);
