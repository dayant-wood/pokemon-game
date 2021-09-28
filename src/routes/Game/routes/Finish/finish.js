import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
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
  const [isDisabled, setDisabled] = useState(true);
  const [selected, isSelected] = useState(null);
  const firebase = useContext(FireBaseContext);
  const history = useHistory();

  const handlerBackToStart = () => {
    if (pokemonContext.winner === 0 || pokemonContext.winner === 2) {
      pokemonContext.clearContext();
      history.replace('/game');
    }

    if (choosePokemon && choosePokemon != {}) {
      pokemonContext.clearContext();
      const selectedPokemon = player2.find(item => item.selected);
      if (selectedPokemon) {
        firebase.addPokemon({
          ...selectedPokemon,
          selected: !selectedPokemon.selected,
        });
      }

      history.replace('/game');
    }
  };

  if (
    isDisabled === true &&
    (pokemonContext.winner === 0 || pokemonContext.winner === 2)
  ) {
    setDisabled(false);
  }

  const handlerChooseCard = id => {
    if (pokemonContext.winner === 1) {
      setPlayer2(prevState => {
        return prevState.reduce((acc, item) => {
          item.selected = false;
          if (item.id === id) {
            item.selected = true;
            setChoosePokemon(item);
          }
          acc.push(item);
          return acc;
        }, []);
      });
      setDisabled(false);
    }
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

        <button disabled={isDisabled} onClick={handlerBackToStart}>
          END GAME
        </button>

        <div className={s.flex}>
          {Object.entries(player2).map(
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
