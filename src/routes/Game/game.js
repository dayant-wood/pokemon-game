import s from './game.module.css';

const GamePage = ({ onChangePage }) => {
  const handleClick = () => {
    console.log('Game');
    onChangePage && onChangePage('app');
  };

  return (
    <div>
      This is GamePage!
      <button className={s.button} onClick={handleClick}>
        Return to Home
      </button>
    </div>
  );
};

export default GamePage;
