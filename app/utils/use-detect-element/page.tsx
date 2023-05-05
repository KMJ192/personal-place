'use client';

import { useRef } from 'react';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function DetectElement() {
  const testRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cx('container')}>
      <div ref={testRef} className={cx('test-node')}>
        test Node
      </div>
      <button className={cx('btn')} onClick={() => {}}>
        node
      </button>
    </div>
  );
}

export default DetectElement;
