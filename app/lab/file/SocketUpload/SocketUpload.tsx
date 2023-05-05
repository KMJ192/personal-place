'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Socket, io } from 'socket.io-client';

import classNames from 'classnames/bind';
import style from './SocketUpload.module.scss';
const cx = classNames.bind(style);

function SocketUpload() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<Blob | null>(null);

  // const chunkSize = 100 * 1024; // 100kb
  const chunkSize = 100 * 1024 * 1024;

  const handleFileSelect = (e: React.ChangeEvent) => {
    e.stopPropagation();
    const element = fileRef.current;
    if (element) {
      const fileList = element.files;
      if (fileList && fileList[0]) {
        const f = fileList[0];
        setFile(f);
        element.files = null;
        element.value = '';
      }
    }
  };

  const handleFile = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (file) {
      try {
        const socket = io('ws://localhost:8081/file-upload', {
          autoConnect: false,
        });
        socket.connect();
        socket.emit(
          'upload-start',
          {
            name: file.name,
            size: file.size,
          },
          (value: string) => {
            console.log(value);
          },
        );

        const readSlice = (file: Blob, offset: number, length: number) => {
          return new Promise(
            (
              res: (result: string | ArrayBuffer | null) => void,
              rej: (e: Error) => void,
            ) => {
              const reader = new FileReader();
              const slice = file.slice(offset, offset + length);

              reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                  res(e.target.result);
                } else {
                  rej(new Error('not result'));
                }
              };

              reader.readAsArrayBuffer(slice);
            },
          );
        };

        const uploadSlice = async (file: Blob, offset: number) => {
          const slice = await readSlice(file, offset, chunkSize);
          socket.emit(
            'upload-slice',
            {
              slice,
              offset,
            },
            (offset: number) => {
              console.log(offset);
            },
          );
        };

        for (let i = 0; i < file.size; i += chunkSize) {
          // eslint-disable-next-line no-await-in-loop
          await uploadSlice(file, i);
        }

        socket.emit('upload-end', 'end', (value: string) => {
          console.log(value);
          socket.disconnect();
        });

        setFile(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const echo = () => {
    const socket = io('ws://localhost:8081/file-upload', {
      autoConnect: false,
    });
    socket.connect();
    socket.emit('echo', '안뇽', (echo: string) => {
      socket.disconnect();
    });
  };

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
          onChange={handleFileSelect}
          ref={fileRef}
        ></input>
        <div>{file?.name ?? ''}</div>
        <button type='submit' onClick={handleFile}>
          전송
        </button>
      </form>
      <button onClick={echo}>Echo</button>
    </>
  );
}

export default SocketUpload;
