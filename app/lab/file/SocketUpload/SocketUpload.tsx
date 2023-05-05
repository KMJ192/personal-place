'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Socket, io } from 'socket.io-client';

import classNames from 'classnames/bind';
import style from './SocketUpload.module.scss';
const cx = classNames.bind(style);

function SocketUpload() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState(null);

  // const chunkSize = 10 * 1024; // 10kb
  const chunkSize = 10 * 1024 * 1024;

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const socket = io('http://localhost:8081/events');

    socket.connect();
    socket.emit('echo', '안뇽', (chat: Socket) => {
      console.log(chat);
    });

      socket.disconnect();
  };

  const handleFile = async (e: React.ChangeEvent) => {
    e.stopPropagation();
    const fileList = fileRef.current?.files;

    const socket = io('http://localhost:8081/events', {
      // autoConnect: false,
    });

    try {
      if (fileList && fileList[0]) {
        const file: Blob = fileList[0];
        console.log('start');
        socket.emit('upload-start', {
          name: file.name,
          size: file.size,
        });
        let offset = 0;

        const readSlice = (file: Blob, offset: number, length: number) => {
          return new Promise((res, rej) => {
            const reader = new FileReader();
            const slice = file.slice(offset, offset + length);

            reader.onload = (e: ProgressEvent<FileReader>) => {
              if (e.target) {
                res(e.target.result);
              } else {
                // rej('e.target is null');
              }
            };

            reader.readAsArrayBuffer(slice);
          });
        };

        const uploadSlice = async (file: Blob, offset: number) => {
          const slice = await readSlice(file, offset, chunkSize);
          console.log(slice);
          socket.emit('upload-slice', {
            slice,
            offset,
          });
        };
        while (offset < file.size) {
          // eslint-disable-next-line no-await-in-loop
          await uploadSlice(file, offset);
          offset += chunkSize;
        }

        console.log('end');
        socket.emit('upload-end');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   // socket.on('message', () => {});
  //   socket.connect();
  //   return () => {
  //     // socket.off('message', () => {});
  //     socket.disconnect();
  //   };
  // }, []);

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
