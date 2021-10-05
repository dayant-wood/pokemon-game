import React from 'react';
import { removeUser, selectUser } from '../../store/user';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import s from './user.module.css';

const UserPage = () => {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOutUser = () => {
    localStorage.removeItem('idToken');
    dispatch(removeUser());
    history.replace('/');
  };
  return (
    <>
      <div className={s.root}>
        <div className={s.content}>
          <h4>Email :</h4> {userData.email}
        </div>
        <div className={s.content}>
          <h4>LocalID :</h4> {userData.localId}
        </div>
        <div className={s.content}>
          <h4>Created at :</h4>
          {new Date(Number(userData.createdAt)).toLocaleDateString()}
        </div>
      </div>
      <button onClick={handleLogOutUser}>Log Out User</button>
    </>
  );
};

export default UserPage;
