import React from 'react';
import { useState } from 'react';
import Input from '../Input/Input';
import s from './loginForm.module.css';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setRegistered] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit && onSubmit({ email, password, isRegistered });
    setEmail('');
    setPassword('');
  };

  const handleLoginRegisterButton = () => {
    setRegistered(prevState => !prevState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          value={email}
          name="email"
          onChange={value => setEmail(value)}
          required
          label="E-mail"
        />
      </div>
      <div>
        <Input
          value={password}
          type="password"
          name="password"
          onChange={value => setPassword(value)}
          required
          label="Password"
        />
      </div>

      <div className={s.flex}>
        <button className={s.buttonLogin}>
          {isRegistered ? 'Sign in' : 'Sign Up'}
        </button>
        <span className={s.span} onClick={handleLoginRegisterButton}>
          {isRegistered ? 'Register?' : 'Login?'}
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
