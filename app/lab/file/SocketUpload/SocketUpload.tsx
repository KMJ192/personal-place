'use client';

import React, { useState, useEffect, useRef } from 'react';

import { Socket, io } from 'socket.io-client';

import classNames from 'classnames/bind';
import style from './SocketUpload.module.scss';
const cx = classNames.bind(style);

const socket = io('http://localhost:8081/events', {
  autoConnect: false,
});
// const chunkSize = 10 * 1024; // 10kb
const chunkSize = 100 * 1024 * 1024;
const callback = (isEnd: DOMException | null, result: Uint8Array) => {
  if (isEnd === null) {
    console.log('result', result);
  }
}

function SocketUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();

    socket.emit('echo', '안뇽', (chat: Socket) => {
      console.log(chat);
    });
  };

  const handleFile = (e: React.ChangeEvent) => {
    // 파일 바뀌자 마 chunking 및 전송
    e.stopPropagation();

    const fileList = fileRef.current?.files;
    const img = imgRef.current;

    if (img && fileList && fileList[0]) {
      const file: Blob = fileList[0];
      const fileReader = new FileReader();
      let offset = 0;
      let fileSize = file.size;

      // fileReader.readAsArrayBuffer(file);
      // fileReader.readAsDataURL(file);

      const readSlice =(start: number, length: number) => {
        let slice = file.slice(start, start + length);
        fileReader.readAsArrayBuffer(slice);
      }

      fileReader.onloadstart = () => {
        // socket을 연다
        console.log('start', offset);
      }

      fileReader.onprogress = (e: ProgressEvent<FileReader>) => {
        // 서버로 전송한다.
        console.log((e.loaded * 100) / e.total);
      };
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        // console.log((e.loaded * 100) / e.total);
        if (fileReader.error) {
          console.log(fileReader.error);
          return;
        }

        if(fileReader.result) {
          callback(null, new Uint8Array(fileReader.result));
        }

        if (offset < fileSize) {
          readSlice(offset, chunkSize);
          console.log(offset);
          offset += chunkSize;
        }
      }

      readSlice(offset, chunkSize)

      fileReader.onerror = () => {
        console.log(fileReader.error); 
      }

      fileReader.onloadend = () => {
        // img.src = String(fileReader.result);
        // socket을 닫는다
        console.log('end', offset, offset + chunkSize);
      };
    }
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
