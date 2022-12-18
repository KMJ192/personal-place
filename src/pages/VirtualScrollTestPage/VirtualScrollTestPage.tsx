import VirtualScroll from '@src/components/VirtualScroll/VirtualScroll';

import classNames from 'classnames/bind';
import { useRef } from 'react';
import style from './style.module.scss';
const cx = classNames.bind(style);

const list = Array.from({ length: 1000000 }, () => 0);

function VirtualScrollTestPage() {
  const testRef = useRef(null);

  return (
    <VirtualScroll
      className={cx('list')}
      rowClassName={cx('row')}
      ref={testRef}
    >
      <>
        {Array.from({ length: 100 }, () => 0).map((_, idx) => {
          return (
            <div key={idx} className={cx('row')}>
              {idx}
            </div>
          );
        })}
      </>
    </VirtualScroll>
  );
}

export default VirtualScrollTestPage;
