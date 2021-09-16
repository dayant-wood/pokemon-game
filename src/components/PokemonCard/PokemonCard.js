import { useState } from 'react';
import cn from 'classnames';
import s from './pokemon.module.css';
import CardBackImage from './assets/card-back-side.jpg';

const PokemonCard = ({
  name,
  img,
  id,
  type,
  values: { top, left, right, bottom },
  isActive = false,
  onClickPokemon,
}) => {
  const handlerClick = () => {
    onClickPokemon && onClickPokemon(id);
  };

  return (
    <div className={s.root}>
      <div
        onClick={handlerClick}
        className={cn(s.pokemonCard, { [s.active]: isActive })}
      >
        <div className={s.cardFront}>
          <div className={`${s.wrap} ${s.front}`}>
            <div className={`${s.pokemon} ${s[type]}`}>
              <div className={s.values}>
                <div className={`${s.count} ${s.top}`}> {top}</div>
                <div className={`${s.count} ${s.right}`}>{right}</div>
                <div className={`${s.count} ${s.bottom}`}>{bottom}</div>
                <div className={`${s.count} ${s.left}`}>{left}</div>
              </div>
              <div className={s.imgContainer}>
                <img src={img} alt={name} />
              </div>

              <div className={s.info}>
                <span className={s.number}> #{id}</span>
                <h3 className={s.name}>{name}</h3>
                <small className={s.type}>
                  Type: <span>{type}</span>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className={s.cardBack}>
          <div className={`${s.wrap} ${s.back}`}>
            <img src={CardBackImage} alt="Сard Backed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
