import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import StartPage from './routes/Start/start';
import BoardPage from './routes/Board/board';
import FinishPage from './routes/Finish/finish';
import { PokemonContext } from '../../context/pokemonContext';

const GamePage = () => {
  const match = useRouteMatch();

  const [selectedPokemon, setSelectedPokemons] = useState({});
  const [selectedPokemon2, setSelectedPokemons2] = useState([]);
  const [winner, setWinner] = useState(0);

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

  const handleSetWinner = id => {
    setWinner(id);
  };

  const handleSelectedPokemons2 = poks => {
    setSelectedPokemons2({ ...poks });
  };

  const cleanPokemons = () => {
    setSelectedPokemons(prevState => {
      return {};
    });
    setSelectedPokemons2(prevState => {
      return [];
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: selectedPokemon,
        player2Pokemons: selectedPokemon2,
        onSelectedPokemons: handlerSelectedPokemons,
        onSelectedPokemons2: handleSelectedPokemons2,
        winner: winner,
        onSetWinner: handleSetWinner,
        clearContext: cleanPokemons,
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
