import s from './navbar.module.css';
import cn from 'classnames';

const Navbar = ({ isActive, bgActive = false, onClickButton }) => {
  const handleClick = () => {
    onClickButton && onClickButton();
  };

  return (
    <nav id={s.navbar} className={cn({ [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div
          className={cn(s.menuButton, {
            [s.active]: isActive,
            [s.deactive]: !isActive,
          })}
          onClick={handleClick}
        >
          <span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
