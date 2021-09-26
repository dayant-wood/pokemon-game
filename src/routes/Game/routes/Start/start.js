import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../../../../components/Layout/layout';
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './start.module.css';

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonContext = useContext(PokemonContext);

  const [pokemons, setPokemonsState] = useState({});
  const history = useHistory();

  useEffect(() => {
    firebase.getPokemonSoket(pokemons => {
      setPokemonsState(pokemons);
    });
    return () => firebase.offPokemonSoket();
  }, []);

  const handleChangeSelected = key => {
    const pokemon = { ...pokemons[key] };

    pokemonContext.onSelectedPokemons(key, pokemon);
    setPokemonsState(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  const handlerStartGame = () => {
    history.push('/game/board');
  };

  return (
    <>
      {/* <button onClick={handleClick}>Return to Home</button> */}
      <button
        onClick={handlerStartGame}
        disabled={Object.keys(pokemonContext.pokemons).length < 5}
      >
        Start Game
      </button>
      <Layout colorBg="lightblue">
        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([key, { name, values, type, id, img, selected }]) => (
              <PokemonCard
                className={s.card}
                key={key}
                values={values}
                name={name}
                type={type}
                id={id}
                img={img}
                onClickPokemon={() => {
                  if (
                    Object.keys(pokemonContext.pokemons).length < 5 ||
                    selected
                  ) {
                    handleChangeSelected(key);
                  }
                }}
                isActive={true}
                isSelected={selected}
              />
            )
          )}
        </div>
      </Layout>
    </>
  );
};

export default StartPage;
