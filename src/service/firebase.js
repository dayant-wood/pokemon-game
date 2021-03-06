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

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
    this.host = 'https://pokemon-game-5a474-default-rtdb.firebaseio.com';
    this.localID = null;
  }

  getPokemonSoket = cb => {
    this.database.ref('pokemons').on('value', snapshot => {
      cb(snapshot.val());
    });
  };

  offPokemonSoket = () => {
    this.database.ref('pokemons').off();
  };

  getPokemonsOnce = async () => {
    return await this.database
      .ref('pokemons')
      .once('value')
      .then(snapshot => snapshot.val());
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  IDToken = () => localStorage.getItem('idToken');

  setLocalID = localId => (this.localID = localId);

  addPokemon = async data => {
    const res = await fetch(
      `${this.host}/${this.localID}/pokemons.json?auth=${this.IDToken()}`,
      { method: 'POST', body: JSON.stringify(data) }
    ).then(res => res.json());
    return res;
  };
}

const FirebaseClass = new Firebase();

export default FirebaseClass;
