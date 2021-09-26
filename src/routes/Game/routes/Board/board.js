import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import PlayerBoard from './component/playerBoard/playerBoard';
import s from './board.module.css';

const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach(item => {
    if (item.card.possession === 'red') {
      player2Count++;
    }
    if (item.card.possession === 'blue') {
      player1Count++;
    }
  });
  return [player1Count, player2Count];
};

const BoardPage = () => {
  const { pokemons, clearContext, winner } = useContext(PokemonContext);
  const context = useContext(PokemonContext);
  const [board, setBoard] = useState([]);

  const [player1, setPlayer1] = useState(() => {
    return Object.values(pokemons).map(item => ({
      ...item,
      possession: 'blue',
    }));
  });

  const [player2, setPlayer2] = useState([]);
  const [choiseCard, setChoiseCard] = useState(null);
  const [steps, setSteps] = useState(0);

  useEffect(async () => {
    const boardResponse = await fetch(
      'https://reactmarathon-api.netlify.app/api/board'
    );
    const boardRequest = await boardResponse.json();
    setBoard(boardRequest.data);

    const player2Response = await fetch(
      'https://reactmarathon-api.netlify.app/api/create-player'
    );

    const player2Request = await player2Response.json();

    setPlayer2(() => {
      const result = player2Request.data.map(item => ({
        ...item,
        possession: 'red',
      }));
      context.onSelectedPokemons2(result);
      return result;
    });
  }, []);

  const handleClickBoardPlate = async position => {
    if (choiseCard) {
      const params = {
        position,
        card: choiseCard,
        board,
      };
      const res = await fetch(
        'https://reactmarathon-api.netlify.app/api/players-turn',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        }
      );

      const request = await res.json();

      if (choiseCard.player === 1) {
        setPlayer1(prevState =>
          prevState.filter(item => item.id !== choiseCard.id)
        );
      }

      if (choiseCard.player === 2) {
        setPlayer2(prevState =>
          prevState.filter(item => item.id !== choiseCard.id)
        );
      }
      setBoard(request.data);
      setSteps(prevState => {
        const count = prevState + 1;
        return count;
      });
    }
  };

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);
      if (count1 > count2) {
        alert('WIN');
        context.onSetWinner(1);
      } else if (count1 < count2) {
        alert('LOSE');
        context.onSetWinner(2);
      } else {
        alert('DRAW');
        context.onSetWinner(0);
      }
      history.replace('/game/finish');
    }
  }, [steps]);

  const history = useHistory();
  if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  }

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {' '}
        <PlayerBoard
          player={1}
          cards={player1}
          onClickCard={card => setChoiseCard(card)}
        />
      </div>
      <div className={s.board}>
        {board.map(item => (
          <div
            className={s.boardPlate}
            key={item.position}
            onClick={() => !item.card && handleClickBoardPlate(item.position)}
          >
            {item.card && <PokemonCard {...item.card} isActive minimize />}
          </div>
        ))}
      </div>

      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={card => setChoiseCard(card)}
        />
      </div>
    </div>
  );
};

export default BoardPage;
