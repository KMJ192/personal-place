import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type FormData = {
  email: string;
  id: string;
  pw: string;
};

function UnControlledForm() {
  const { register, formState, reset, handleSubmit, setFocus } =
    useForm<FormData>({
      mode: 'onSubmit',
      defaultValues: {
        email: '',
        id: '',
        pw: '',
      },
    });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  useEffect(() => {
    if (formState.errors.email) {
      setFocus('email');
    } else if (formState.errors.id) {
      setFocus('id');
    } else if (formState.errors.pw) {
      setFocus('pw');
    }
  }, []);

  return (
    <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        autoComplete='email'
        placeholder='email'
        {...register('email', {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'email 형식에 맞지 않습니다.',
          },
        })}
        className={cx('input', 'email', formState.errors.email && 'error')}
      ></input>
      <input
        type='text'
        placeholder='id'
        autoComplete='id'
        {...register('id')}
        className={cx('input', 'id', formState.errors.id && 'error')}
      ></input>
      <input
        type='password'
        placeholder='password'
        autoComplete='current-password'
        className={cx('input', 'pw', formState.errors.pw && 'error')}
        {...register('pw', {
          minLength: 8,
          maxLength: 24,
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%\^&*()\-_+={}[\]|;:"<>,./?])(?!.*\s).{8,}$/,
            message:
              '비밀번호는 영어 대문자, 소문자, 특수문자가 모두 포함되어야 합니다.',
          },
        })}
      ></input>
      <button type='submit'>제출</button>
      <button
        type='button'
        onClick={() => {
          reset({
            email: '',
            id: '',
            pw: '',
          });
        }}
      >
        초기화
      </button>
    </form>
  );
}

export default UnControlledForm;
