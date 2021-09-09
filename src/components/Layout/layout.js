import s from './layout.module.css';

const Layout = ({ title, descr, urlBg, colorBg = 'lightblue' }) => {
  const styleRoot = urlBg
    ? { backgroundImage: `url(${urlBg})` }
    : { background: `${colorBg}` };
  return (
    <section className={s.root} style={styleRoot}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            {title ? <h3>{title}</h3> : null}
            <span className={s.separator}></span>
          </div>
          <div className={`${s.desc} ${s.full}`}>
            {descr ? <p>{descr}</p> : null}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
