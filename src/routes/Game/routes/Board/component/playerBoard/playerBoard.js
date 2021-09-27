import React from 'react';
import PokemonCard from '../../../../../../components/PokemonCard/PokemonCard';
import { useEffect } from 'react/cjs/react.development';
import { useState } from 'react';
import cn from 'classnames';
import s from './playerBoard.module.css';

const PlayerBoard = ({ player, cards, onClickCard }) => {
  const [isSelected, setSelected] = useState(null);

  return (
    <>
      {cards.map(item => (
        <div
          key={item.id}
          className={cn(s.cardBoard, { [s.selected]: isSelected === item.id })}
          onClick={() => {
            setSelected(item.id);
            onClickCard && onClickCard({ ...item, player });
          }}
        >
          <PokemonCard
            key={item.id}
            values={item.values}
            name={item.name}
            type={item.type}
            id={item.id}
            img={item.img}
            isActive
            minimize
          />
        </div>
      ))}
    </>
  );
};

export default PlayerBoard;
