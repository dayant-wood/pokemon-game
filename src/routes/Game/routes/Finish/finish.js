import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import FirebaseClass from '../../../../service/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearState,
  winner,
  selectedPokemonPlayer1,
  selectedPokemonPlayer2,
} from '../../../../store/pokemons';
import { selectLocalID } from '../../../../store/user';
import s from './finish.module.css';

const FinishPage = () => {
  const history = useHistory();
  const pokemonsPlayer1Redux = useSelector(selectedPokemonPlayer1);
  const pokemonsPlayer2Redux = useSelector(selectedPokemonPlayer2);
  const winnerRedux = useSelector(winner);

  const [choosePokemon, setChoosePokemon] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [player2, setPlayer2] = useState(Object.entries(pokemonsPlayer2Redux));

  const localId = useSelector(selectLocalID);
  const dispatch = useDispatch();

  const handlerBackToStart = e => {
    if (winnerRedux === 0 || winnerRedux === 2) {
      dispatch(clearState());
      history.replace('/game');
    }

    if (winnerRedux === 1) {
      dispatch(clearState());
      FirebaseClass.addPokemon({ ...choosePokemon, selected: false }, localId);
      history.replace('/game');
    }
  };

  if (isDisabled === true && (winnerRedux === 0 || winnerRedux === 2)) {
    setDisabled(false);
  }

  const handlerChooseCard = id => {
    if (winnerRedux === 1) {
      setPlayer2(prevState => {
        return prevState.reduce((acc, item) => {
          item[1] = { ...item[1], selected: false };

          if (item[1].id === id) {
            item[1].selected = true;
            setChoosePokemon(item[1]);
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
          {Object.entries(pokemonsPlayer1Redux).map(
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
          {player2.map(([key, { values, id, name, type, img, selected }]) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default FinishPage;
