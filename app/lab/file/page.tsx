'use client';

import React, { ChangeEvent, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import axios from 'axios';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

// const socket = io('http://localhost:8081/events');
// const chunkSize = 10 * 1024; // 10kb

function File() {
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFile = (e: ChangeEvent) => {
    e.stopPropagation();
    const fileList = fileRef.current?.files;
    const img = imgRef.current;
    if (img && fileList && fileList[0]) {
      const file = fileList[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        img.src = String(fileReader.result);
      };
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileList = fileRef.current?.files;
    const img = imgRef.current;
    if (img && fileList) {
      const form = new FormData();
      Object.keys(fileList).forEach((key) => {
        const k = Number(key);
        if (!Number.isNaN(k)) {
          const file = fileList[k];
          form.append('file', file);
        }
      });

      try {
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:8080/api/file/upload',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: form,
        });
        img.src = '';
      } catch (e) {
        console.log(e);
      }
    }
  };

  // const handleMessage = (param: Socket) => {
  //   console.log(param);
  //   setMessage('message');
  // };

  // const onClick = (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   socket.emit('echo', message, (chat: Socket) => {
  //     console.log(chat);
  //   });
  // };

  // useEffect(() => {
  //   socket.on('message', handleMessage);

  //   return () => {
  //     socket.off('message', handleMessage);
  //   };
  // }, []);

  return (
    <>
      <form
        className={cx('form')}
        encType='multipart/form-data'
        onSubmit={onSubmit}
      >
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
      <img src='' alt='thumbnail' ref={imgRef}></img>
      <button
        onClick={() => {
          const img = imgRef.current;
          if (img) {
            img.src = '';
          }
        }}
      >
        제거
      </button>
    </>
  );
}

export default File;
