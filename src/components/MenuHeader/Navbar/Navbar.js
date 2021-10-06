import { ReactComponent as LoginSVG } from '../../../assets/login.svg';
import { ReactComponent as UserSVG } from '../../../assets/user.svg';

import { useSelector } from 'react-redux';
import { selectLocalID, selectUserLoading } from '../../../store/user';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import s from './navbar.module.css';

const Navbar = ({
  isActive,
  bgActive = false,
  onClickButton,
  onClickLogin,
}) => {
  const isLoadingUser = useSelector(selectUserLoading);
  const localId = useSelector(selectLocalID);
  const handleClick = () => {
    onClickButton && onClickButton();
  };

  return (
    <nav id={s.navbar} className={cn({ [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={s.loginAndMenu}>
          {!isLoadingUser && !localId && (
            <div className={s.loginWrap} onClick={onClickLogin}>
              <LoginSVG />
            </div>
          )}
          {!isLoadingUser && localId && (
            <Link className={s.loginWrap} to="/user">
              <UserSVG />
            </Link>
          )}
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
