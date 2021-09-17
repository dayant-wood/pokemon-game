import { useState } from 'react';
import { useHistory } from 'react-router';
import Layout from '../../components/Layout/layout';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import s from './game.module.css';
import pokemonsList from '../../data/pokemon.json';

const GamePage = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  const [pokemons, setPokemonsState] = useState(pokemonsList.slice(0, 5));

  const handleOpenPokemons = id => {
    setPokemonsState(prev =>
      prev.map(item =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };
  return (
    <>
      <button onClick={handleClick}>Return to Home</button>
      <Layout colorBg="lightblue">
        <div className={s.flex}>
          {pokemons.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              values={pokemon.values}
              name={pokemon.name}
              type={pokemon.type}
              id={pokemon.id}
              img={pokemon.img}
              onClickPokemon={handleOpenPokemons}
              isActive={pokemon.active}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default GamePage;
