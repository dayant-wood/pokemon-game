import s from './navbar.module.css';
import cn from 'classnames';

const Navbar = ({isActive, onClickButton}) => {
  
  const handleClick = () => {
    onClickButton && onClickButton();
  };

  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <a href="#s"
          className={cn(s.menuButton, { [s.active]: isActive, [s.deactive] : !isActive})}
          onClick={handleClick}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
