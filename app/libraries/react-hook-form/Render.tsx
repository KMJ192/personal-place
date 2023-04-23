'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import style from './Render.module.scss';
const cx = classNames.bind(style);

type FormData = {
  email: string;
  id: string;
  pw: string;
};

function Render() {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const {
    register,
    formState,
    watch,
    reset,
    handleSubmit,
    setError,
    setFocus,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      id: '',
      pw: '',
    },
  });

  console.log(formState.errors);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  return (
    <form className={cx('form')}>
      <input
        type='text'
        // onChange={onChangeEmail}
        // value={email}
        autoComplete='email'
        placeholder='email'
        {...register('email', {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'email 형식에 맞지 않습니다.',
          },
        })}
      ></input>
      <input
        type='text'
        onChange={onChangeId}
        value={id}
        placeholder='id'
        autoComplete='id'
      ></input>
      <input
        onChange={onChangePw}
        value={pw}
        type='password'
        placeholder='password'
        autoComplete='current-password'
      ></input>
      <button type='submit' onClick={onSubmit}>
        제출
      </button>
    </form>
  );
}

export default Render;
