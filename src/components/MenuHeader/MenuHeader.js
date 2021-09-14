import { useState } from 'react';
import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';

const MenuHeader = () => {
 
  const [isActive, setActive] = useState(undefined);

  const handleClickButton = () => {
    setActive(!isActive)
  }
  
  return (
    <>
      
      <Menu isActive={isActive} />
      <Navbar onClickButton={handleClickButton} isActive={isActive} />
    </>
  );
};

export default MenuHeader;
