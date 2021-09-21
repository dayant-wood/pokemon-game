import { useRouteMatch, Switch, Route } from 'react-router-dom';
import StartPage from './routes/Start/start';
import BoardPage from './routes/Board/board';
import FinishPage from './routes/Finish/finish';
import { PokemonContext } from '../../context/pokemonContext';
import { useState } from 'react';

const GamePage = () => {
  const match = useRouteMatch();
  const [selectedPokemon, setSelectedPokemons] = useState({});
  console.log(selectedPokemon);
  const handlerSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons(prevState => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];

        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };
  return (
    <PokemonContext.Provider
      value={{
        pokemons: selectedPokemon,
        onSelectedPokemons: handlerSelectedPokemons,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
