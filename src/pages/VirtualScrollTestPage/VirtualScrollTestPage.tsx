import { useState, useRef } from 'react';
import VirtualScroll from '@src/components/VirtualScroll/VirtualScroll';
import type { ItemProps } from '@src/components/VirtualScroll/VirtualScroll';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

const list = Array.from({ length: 100 }, () => 0);

function Column({ index, className, data, style }: ItemProps) {
  return (
    <div className={className} style={style}>
      {index}
    </div>
  );
}

function VirtualScrollTestPage() {
  const testRef = useRef(null);

  return (
    <VirtualScroll
      id={'virtual-scroll'}
      className={cx('list')}
      itemClassName={cx('row')}
      itemCount={10000}
      ref={testRef}
      data={{}}
      itemStyle={{}}
      style={{}}
    >
      {Column}
    </VirtualScroll>
  );
}
/*
  container의 높이
  container의 너비
  item의 높이
  item의 개수
  item의 Props
  item의 style
*/

export default VirtualScrollTestPage;
