import s from './navbar.module.css';
import cn from 'classnames';

import { ReactComponent as LoginSVG } from '../../../assets/login.svg';

const Navbar = ({
  isActive,
  bgActive = false,
  onClickButton,
  onClickLogin,
}) => {
  const handleClick = () => {
    onClickButton && onClickButton();
  };

  return (
    <nav id={s.navbar} className={cn({ [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={s.loginAndMenu}>
          <div className={s.loginWrap} onClick={onClickLogin}>
            {' '}
            <LoginSVG />
          </div>
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
      </div>
    </nav>
  );
};

export default Navbar;
