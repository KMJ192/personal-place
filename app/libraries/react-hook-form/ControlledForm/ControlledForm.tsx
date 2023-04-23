import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function ControlledForm() {
  const [email, setEmail] = useState({
    value: '',
    error: false,
  });
  const [id, setId] = useState({
    value: '',
    error: false,
  });
  const [pw, setPw] = useState({
    value: '',
    error: false,
  });

  const onSubmit = () => {
    console.log(email, id, pw);
  };

  const reset = () => {
    setEmail({
      value: '',
      error: false,
    });
    setId({
      value: '',
      error: false,
    });
    setPw({
      value: '',
      error: false,
    });
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setId({
      value,
      error: false,
    });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailReg.test(value)) {
      setEmail({
        value,
        error: false,
      });
    } else {
      setEmail({
        value,
        error: true,
      });
    }
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const pwReg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%\^&*()\-_+={}[\]|;:"<>,./?])(?!.*\s).{8,}$/;
    if (pwReg.test(value)) {
      setPw({
        value,
        error: false,
      });
    } else {
      setPw({
        value,
        error: true,
      });
    }
  };

  return (
    <form className={cx('form')} onSubmit={onSubmit}>
      <input
        type='text'
        autoComplete='email'
        placeholder='email'
        value={email.value}
        onChange={onChangeEmail}
        className={cx('input', 'email', email.error && 'error')}
      ></input>
      <input
        type='text'
        placeholder='id'
        autoComplete='id'
        value={id.value}
        onChange={onChangeId}
        className={cx('input', 'id', id.error && 'error')}
      ></input>
      <input
        type='password'
        placeholder='password'
        autoComplete='current-password'
        value={pw.value}
        onChange={onChangePw}
        className={cx('input', 'pw', pw.error && 'error')}
      ></input>
      <button type='submit'>제출</button>
      <button
        type='button'
        onClick={() => {
          reset();
        }}
      >
        초기화
      </button>
    </form>
  );
}

export default ControlledForm;
