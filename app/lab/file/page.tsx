import React from 'react';

import HttpUpload from './HttpUpload/HttpUpload';
import SocketUpload from './SocketUpload/SocketUpload';

// import classNames from 'classnames/bind';
// import style from './style.module.scss';
// const cx = classNames.bind(style);

function File() {
  return (
    <>
      {/* <HttpUpload /> */}
      <SocketUpload />
    </>
  );
}

export default File;
