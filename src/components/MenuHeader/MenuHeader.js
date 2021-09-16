import { useState } from 'react';
import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(null);

  const handleClickButton = () => {
    setActive(prevState => !prevState);
  };

  return (
    <>
      <Menu isActive={isActive} onClickButton={handleClickButton} />
      <Navbar
        onClickButton={handleClickButton}
        bgActive={bgActive}
        isActive={isActive}
      />
    </>
  );
};

export default MenuHeader;
