'use client';

import { useRef, useState, useEffect } from 'react';
import useResizeObserver from '@src/lib/hooks/useResizeObserver/useResizeObserver';

import classNames from 'classnames/bind';
import style from './page.module.scss';
const cx = classNames.bind(style);

function Test() {
  const ref = useRef(null);
  const [containerSize, setContainerSize] = useState({
    width: 100,
    height: 100,
  });

  useResizeObserver(ref, () => {
    if (ref.current) {
      console.log((ref.current as HTMLDivElement).getBoundingClientRect());
    }
  });

  return (
    <div
      className={cx('container')}
      style={{
        width: containerSize.width,
        height: containerSize.height,
      }}
    >
      <div className={cx('object')} ref={ref}></div>
      <button
        className={cx('btn')}
        onClick={() => {
          setContainerSize({
            width: containerSize.width + 100,
            height: containerSize.height + 100,
          });
        }}
      >
        size 변경
      </button>
    </div>
  );
}

export default Test;
