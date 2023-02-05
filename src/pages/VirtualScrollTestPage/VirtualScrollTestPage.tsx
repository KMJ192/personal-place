import { useRef, useState } from 'react';
import VirtualList from '@src/components/VirtualList/VirtualList';
import type { VirtualListItemProps } from '@src/components/VirtualList/VirtualList';
import { useInterval } from '@src/hooks';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function Column({ index, className, data, style }: VirtualListItemProps) {
  return (
    <div className={className} style={style}>
      {index}
    </div>
  );
}

function VirtualScrollTestPage() {
  const [itemCount, setItemCount] = useState(10000);
  const testRef = useRef(null);

  // useInterval(() => {
  //   setItemCount((itemCount) => itemCount - 1);
  // }, 1000);

  return (
    <VirtualList
      id={'virtual-list'}
      className={cx('list')}
      itemClassName={cx('row')}
      itemCount={itemCount}
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
