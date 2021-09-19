import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB1Joem4NeY62Hl7loHiQebU8mWNTFjsB4',
  authDomain: 'pokemon-game-5a474.firebaseapp.com',
  databaseURL: 'https://pokemon-game-5a474-default-rtdb.firebaseio.com',
  projectId: 'pokemon-game-5a474',
  storageBucket: 'pokemon-game-5a474.appspot.com',
  messagingSenderId: '334295187674',
  appId: '1:334295187674:web:76e58f0a8a90d75a06e5e3',
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();
export default database;
