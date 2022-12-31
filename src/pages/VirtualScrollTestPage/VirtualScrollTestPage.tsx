import { useRef } from 'react';
import VirtualList from '@src/components/VirtualList/VirtualList';
import type { VirtualListItemProps } from '@src/components/VirtualList/VirtualList';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function Column({ index, className, data, style }: VirtualListItemProps) {
  return (
    <div className={className} style={style}>
      {index + 1}
    </div>
  );
}

function VirtualScrollTestPage() {
  const testRef = useRef(null);

  return (
    <VirtualList
      id={'virtual-list'}
      className={cx('list')}
      itemClassName={cx('row')}
      itemCount={10000}
      ref={testRef}
      data={{}}
      itemStyle={{}}
      style={{}}
    >
      {Column}
    </VirtualList>
  );
}

export default VirtualScrollTestPage;
