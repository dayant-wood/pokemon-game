import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../components/Layout/layout';
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './start.module.css';
import {
  getPokemons,
  getPokemonsAsync,
  selectPokemonsData,
  selectPokemonsLoading,
  selectedPokemonPlayer1,
  handleSelectedPokemons,
} from '../../../../store/pokemons';

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonContext = useContext(PokemonContext);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const selectedPokemonsRedux = useSelector(selectedPokemonPlayer1);
  const isLoading = useSelector(selectPokemonsLoading);
  const dispatch = useDispatch();
  const [pokemons, setPokemonsState] = useState({});
  const history = useHistory();

  useEffect(() => {
    firebase.getPokemonSoket(pokemons => {
      setPokemonsState(pokemons);
      dispatch(getPokemonsAsync());
    });
    return () => firebase.offPokemonSoket();
  }, []);

  useEffect(() => {
    setPokemonsState(pokemonsRedux);
  }, [pokemonsRedux]);
  console.log(pokemonsRedux);

  const handleChangeSelected = key => {
    const pokemon = { ...pokemons[key] };
    console.log(pokemon);
    dispatch(handleSelectedPokemons({ key, pokemon }));
    // pokemonContext.onSelectedPokemons(key, pokemon);
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
      <button
        onClick={handlerStartGame}
        disabled={Object.keys(selectedPokemonsRedux).length < 5}
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
                    Object.keys(selectedPokemonsRedux).length < 5 ||
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
