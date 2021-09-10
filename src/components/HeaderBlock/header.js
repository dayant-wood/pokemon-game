import s from './header.module.css';

const HeaderBlock = ({ title, descr }) => {
  return (
    <>
      <header className={s.root}>
        <div className={s.forest}></div>
        <div className={s.container}>
          {title ? <h1>{title}</h1> : null}
          {descr ? <p>{descr}</p> : null}
        </div>
      </header>
    </>
  );
};

export default HeaderBlock;
