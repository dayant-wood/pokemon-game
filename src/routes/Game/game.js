import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import database from '../../service/firebase';
import Layout from '../../components/Layout/layout';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import data from '../../data/pokemon.json';
import s from './game.module.css';

const GamePage = () => {
  const history = useHistory();

  // const handleClick = () => {
  //   history.push('/');
  // };

  const [pokemons, setPokemonsState] = useState({});

  useEffect(() => {
    database.ref('pokemons').once('value', snapshot => {
      setPokemonsState(snapshot.val());
    });
  }, [pokemons]);

  const handleOpenPokemons = (id, objID, isActive) => {
    setPokemonsState(prevState => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === id) {
          pokemon.active = true;
        }

        acc[item[0]] = pokemon;

        return acc;
      }, {});
    });

    database.ref('pokemons/' + objID).set({
      ...pokemons[objID],
      active: !isActive,
    });
  };

  const addNewPock = () => {
    const getRandom = max => {
      return Math.floor(Math.random() * max);
    };

    let randomId = getRandom(data.length);

    const newKey = database.ref().child('pokemons').push().key;
    database.ref('pokemons/' + newKey).set(data[randomId]);
  };

  return (
    <>
      {/* <button onClick={handleClick}>Return to Home</button> */}
      <button onClick={addNewPock}>Add new pockemon</button>
      <Layout colorBg="lightblue">
        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([key, { name, values, type, id, img, active }]) => (
              <PokemonCard
                key={key}
                objID={key}
                values={values}
                name={name}
                type={type}
                id={id}
                img={img}
                onClickPokemon={handleOpenPokemons}
                isActive={active}
              />
            )
          )}
        </div>
      </Layout>
    </>
  );
};

export default GamePage;
