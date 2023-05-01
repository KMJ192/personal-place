'use client';

import React, { useState, useEffect, useRef } from 'react';

import { Socket, io } from 'socket.io-client';

import classNames from 'classnames/bind';
import style from './SocketUpload.module.scss';
const cx = classNames.bind(style);

const socket = io('http://localhost:8081/events', {
  autoConnect: false,
});
const chunkSize = 10 * 1024; // 10kb

function SocketUpload() {
  const fileRef = useRef<HTMLInputElement>(null);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();

    socket.emit('echo', '안뇽', (chat: Socket) => {
      console.log(chat);
    });
  };

  const handleFile = () => {
    // 파일 바뀌자 마 chunking 및 전송
  };

  useEffect(() => {
    // socket.on('message', () => {});
    socket.connect();
    return () => {
      // socket.off('message', () => {});
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <form className={cx('form')} encType='multipart/form-data'>
        <label htmlFor='file' className={cx('file-uploader-view')}>
          파일 첨부
        </label>
        <input
          className={cx('file-uploader')}
          type='file'
          id='file'
          name='file'
          formEncType='multipart/form-data'
          onChange={handleFile}
          ref={fileRef}
        ></input>
        <button type='submit'>전송</button>
      </form>
      <button onClick={onClick}>Echo</button>
    </>
  );
}

export default SocketUpload;
