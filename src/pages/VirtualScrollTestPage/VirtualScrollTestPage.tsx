import VirtualScroll from '@src/components/VirtualScroll/VirtualScroll';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function VirtualScrollTestPage() {
  return (
    <VirtualScroll id='list'>
      <div id='list' className={cx('list')}>
        <div>0</div>
        {/* {Array.from({ length: 100 }, () => 0).map((_, idx) => {
          return <div key={idx}>{idx}</div>;
        })} */}
      </div>
    </VirtualScroll>
  );
}

export default VirtualScrollTestPage;
