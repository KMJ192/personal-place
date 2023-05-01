'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import style from './HttpUpload.module.scss';
const cx = classNames.bind(style);

const chunkSize = 10 * 1024; // 10kb

function HttpUpload() {
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
      fileReader.onprogress = (e: ProgressEvent<FileReader>) => {
        console.log(e);
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
          // const len = Math.ceil(file.size / chunkSize);
          // const chunk = [];
          // for (let i = 0; i < len; i++) {
          //   chunk.push(file.slice(chunkSize * i, chunkSize * (i + 1)));
          // }
          form.append('file', file);
        }
      });

      try {
        // const res = await axios({
        //   method: 'POST',
        //   url: 'http://localhost:8080/api/file/chunk-upload',
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   data: form,
        // });
        img.src = '';
      } catch (e) {
        console.log(e);
      }
    }
  };

  // useEffect(() => {
  //   const fileReader = new FileReader();
  //   fileReader.onloadstart = () => {
  //     console.log('loadstart');
  //   };
  //   fileReader.onprogress = () => {
  //     console.log('onprogress');
  //   };
  //   fileReader.onloadend = () => {
  //     console.log('end');
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
          name='file'
          id='file'
          multiple
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

export default HttpUpload;
