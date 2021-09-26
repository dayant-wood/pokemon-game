import React, { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import s from './finish.module.css';
import { FireBaseContext } from '../../../../context/firebaseContext';

const FinishPage = () => {
  const { pokemons, player2Pokemons } = useContext(PokemonContext);
  const pokemonContext = useContext(PokemonContext);
  const [choosePokemon, setChoosePokemon] = useState({});
  const [player2, setPlayer2] = useState(player2Pokemons);
  const firebase = useContext(FireBaseContext);
  const history = useHistory();

  const handlerFinish = () => {
    pokemonContext.clearContext();
    if (choosePokemon && choosePokemon != {}) {
      firebase.addPokemon(choosePokemon);
    }

    history.replace('/game');
  };

  // const handlerChooseCard = id => {
  //   if (pokemonContext.winner === 1) {
  //     Object.values(player2Pokemons).map(item => {
  //       if (item.id === id) {
  //         setChoosePokemon(item);
  //         item.selected = true;
  //       }

  //       return item;
  //     });
  //   }
  // };

  const handlerChooseCard = id => {
    setPlayer2(prevState => {
      return Object.values(prevState).reduce((acc, item) => {
        item.isSelected = false;
        if (item.id === id) {
          setChoosePokemon(item);
          item.isSelected = true;
        }
        acc.push(item);
        return acc;
      });
    }, []);
  };

  return (
    <>
      <div className="root">
        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([key, { values, id, name, type, img, possession, isActive }]) => (
              <PokemonCard
                className={s.card}
                key={key}
                values={values}
                name={name}
                type={type}
                id={id}
                img={img}
                isActive={true}
              />
            )
          )}
        </div>

        <button onClick={handlerFinish}>END GAME</button>

        <div className={s.flex}>
          {Object.entries(player2Pokemons).map(
            ([key, { values, id, name, type, img, selected }]) => (
              <PokemonCard
                className={s.card}
                key={key}
                values={values}
                name={name}
                type={type}
                id={id}
                img={img}
                isActive={true}
                isSelected={selected}
                onClickPokemon={handlerChooseCard}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default FinishPage;
