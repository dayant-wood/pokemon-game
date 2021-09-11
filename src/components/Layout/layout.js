import s from './layout.module.css';

const Layout = ({ title,  urlBg, colorBg, children }) => {
  
  const styleRoot = urlBg
    ? { backgroundImage: `url(${urlBg})` }
    : { backgroundColor: `${colorBg}` };
  return (
    <section className={s.root} style={styleRoot}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            {title ? <h3>{title}</h3> : null}
            <span className={s.separator}></span>
          </div>
          <div className={`${s.desc} ${s.full}`}>
            {children}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
