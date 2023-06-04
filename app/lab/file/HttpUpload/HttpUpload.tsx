'use client';

import React, { ChangeEvent, useRef } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import style from './HttpUpload.module.scss';
const cx = classNames.bind(style);

function HttpUpload() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent) => {
    e.stopPropagation();

    const fileList = fileRef.current?.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadstart = () => {
        // socket을 연다
        console.log('start');
      };
      fileReader.onloadend = () => {
        // img.src = String(fileReader.result);
        // socket을 닫는다
      };
      fileReader.onprogress = (e: ProgressEvent<FileReader>) => {
        // 서버로 전송한다.
        console.log((e.loaded * 100) / e.total);
      };
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileList = fileRef.current?.files;
    if (fileList) {
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
        // img.src = '';
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
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
  );
}

export default HttpUpload;
