import { useState } from 'react';
import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { getUserUpdateAsynch } from '../../store/user';
import FirebaseClass from '../../service/firebase';

const loginSignUpUser = async ({ email, password, type }) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  };

  switch (type) {
    case 'Sign Up':
      return await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1Joem4NeY62Hl7loHiQebU8mWNTFjsB4',
        requestOptions
      ).then(res => res.json());

    case 'Login':
      return await await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1Joem4NeY62Hl7loHiQebU8mWNTFjsB4',
        requestOptions
      ).then(res => res.json());

    default:
      return 'I can not login user';
  }
};

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(null);
  const [isOpenModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();
  const handleClickButton = () => {
    setActive(prevState => !prevState);
  };
  const handleClickLogin = () => {
    setOpenModal(prevState => !prevState);
  };

  const handleSubmitLoginForm = async props => {
    const response = await loginSignUpUser(props);
    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Wrong!');
    } else {
      if (props.type === 'Sign Up') {
        const pokemonStart = await fetch(
          'https://reactmarathon-api.herokuapp.com/api/pokemons/starter'
        ).then(res => res.json());
        console.log(pokemonStart);

        for (const item of pokemonStart.data) {
          await fetch(
            `https://pokemon-game-5a474-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`,
            { method: 'POST', body: JSON.stringify(item) }
          );
        }
      }

      localStorage.setItem('idToken', response.idToken);
      FirebaseClass.setLocalID(response.localId);
      NotificationManager.success('Success!');
      dispatch(getUserUpdateAsynch());
      handleClickLogin();
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
        <LoginForm
          isResetField={!isOpenModal}
          onSubmit={handleSubmitLoginForm}
        />
      </Modal>
    </>
  );
};

export default MenuHeader;
