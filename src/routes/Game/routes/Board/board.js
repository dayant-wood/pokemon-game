import { PokemonContext } from '../../../../context/pokemonContext';
import { useContext } from 'react';
import s from './board.module.css';
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';

const BoardPage = () => {
  const { pokemons } = useContext(PokemonContext);

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {Object.values(pokemons).map(({ values, name, type, id, img }) => (
          <PokemonCard
            className={s.card}
            key={id}
            values={values}
            name={name}
            type={type}
            id={id}
            img={img}
            isActive
            minimize
          />
        ))}
      </div>
      <div className={s.board}>
        <div className={s.boardPlate}>1</div>
        <div className={s.boardPlate}>2</div>
        <div className={s.boardPlate}>3</div>
        <div className={s.boardPlate}>4</div>
        <div className={s.boardPlate}>5</div>
        <div className={s.boardPlate}>6</div>
        <div className={s.boardPlate}>7</div>
        <div className={s.boardPlate}>8</div>
        <div className={s.boardPlate}>9</div>
      </div>
    </div>
  );
};

export default BoardPage;
