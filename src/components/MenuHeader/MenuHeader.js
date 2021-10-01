import { useState } from 'react';
import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import { NotificationManager } from 'react-notifications';

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(null);
  const [isOpenModal, setOpenModal] = useState(true);

  const handleClickButton = () => {
    setActive(prevState => !prevState);
  };
  const handleClickLogin = () => {
    setOpenModal(prevState => !prevState);
  };

  const handleSubmitLoginForm = async ({ email, password, isRegistered }) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };
    let response;
    if (isRegistered === false) {
      response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1Joem4NeY62Hl7loHiQebU8mWNTFjsB4',
        requestOptions
      ).then(res => res.json());
      console.log(response);
    }
    if (isRegistered === true) {
      response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1Joem4NeY62Hl7loHiQebU8mWNTFjsB4',
        requestOptions
      ).then(res => res.json());
      console.log(response);
    }
    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Wrong!');
    } else {
      if (isRegistered === true) {
        localStorage.setItem('idToken', response.idToken);
      }
      NotificationManager.success('Success!');
    }
  };

  return (
    <>
      <Menu
        isActive={isActive}
        onClickButton={handleClickButton}
        onClickLogin
      />
      <Navbar
        onClickButton={handleClickButton}
        bgActive={bgActive}
        isActive={isActive}
        onClickLogin={handleClickLogin}
      />
      <Modal
        isOpen={isOpenModal}
        onCloseModal={handleClickLogin}
        title="Log in"
      >
        <LoginForm onSubmit={handleSubmitLoginForm} />
      </Modal>
    </>
  );
};

export default MenuHeader;
