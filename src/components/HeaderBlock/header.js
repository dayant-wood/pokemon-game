import s from './header.module.css';

const HeaderBlock = ({ title, descr, onClickButton }) => {
  const handleClick = () => {
    console.log('<Header>');
    onClickButton && onClickButton('game');
  };
  return (
    <>
      <header className={s.root}>
        <div className={s.forest}></div>
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
