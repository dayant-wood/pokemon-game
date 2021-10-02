import React from 'react';
import s from './input.module.css';

const Input = ({ value, label, type = 'text', name, onChange, required }) => {
  const handleLocalChange = e => {
    onChange && onChange(e.target.value);
  };
  return (
    <>
      <div className={s.root}>
        <input
          value={value}
          type={type}
          name={name}
          className={s.input}
          required
          onChange={handleLocalChange}
          required={required}
        />
        <span className={s.highlight}></span>
        <span className={s.bar}></span>
        <label className={s.label}>{label}</label>
      </div>
    </>
  );
};

export default Input;
