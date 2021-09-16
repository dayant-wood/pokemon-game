import s from './header.module.css';
import { useHistory } from 'react-router';

const HeaderBlock = ({ title, descr, onClickButton }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/game');
  };
  return (
    <>
      <header className={s.root}>
        <div className={s.forest}></div>
        <div className={s.silhouette}></div>
        <div className={s.moon}></div>
        <div className={s.container}>
          {title ? <h1>{title}</h1> : null}
          {descr ? <p>{descr}</p> : null}
          <button onClick={handleClick}>Start Game</button>
        </div>
      </header>
    </>
  );
};

export default HeaderBlock;
