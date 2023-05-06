'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useLogin from './hooks/useLogin';
import type { User } from './hooks/useLogin';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function Render() {
  const { register, formState, reset, handleSubmit, setFocus } = useForm<User>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync } = useLogin();

  const onInit = () => {
    reset({
      email: '',
      password: '',
    });
  };

  const onSubmit = async (data: User) => {
    const response = await mutateAsync(data);
    console.log(response);
    reset({
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    if (formState.errors.email) {
      setFocus('email');
    } else if (formState.errors.password) {
      setFocus('password');
    }
  }, []);

  return (
    <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cx('email')}>
        <input
          type='text'
          placeholder='email'
          autoComplete='off'
          {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'email 형식에 맞지 않습니다.',
            },
          })}
        ></input>
      </div>
      <div className={cx('password')}>
        <input
          type='password'
          placeholder='placeholder'
          autoComplete='off'
          {...register('password', {
            // pattern: {
            //   value:
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%\\^&*()\-_+={}[\]|;:"<>,./?])(?!.*\s).{8,}$/,
            //   message:
            //     '비밀번호는 영어 대문자, 소문자, 특수문자가 모두 포함되어야 합니다.',
            // },
          })}
        ></input>
      </div>
      <button type='submit'>제출</button>
      <button type='button' onClick={onInit}>
        초기화
      </button>
    </form>
  );
}

export default Render;
