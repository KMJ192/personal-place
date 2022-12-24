import { useState, useRef } from 'react';
import VirtualScroll from '@src/components/VirtualScroll/VirtualScroll';

import { FixedSizeList } from 'react-window';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

const list = Array.from({ length: 100 }, () => 0);

type Props = {
  index: number;
  data?: { [key: string]: any };
};

function Column({ index, data }: Props) {
  return <div className={cx('row')}>{index}</div>;
}

function VirtualScrollTestPage() {
  const testRef = useRef(null);

  return (
    <VirtualScroll
      id={'virtual-scroll'}
      className={cx('list')}
      itemClassName={cx('row')}
      itemCount={100}
      ref={testRef}
    >
      {Column}
    </VirtualScroll>
  );
}

export default VirtualScrollTestPage;
