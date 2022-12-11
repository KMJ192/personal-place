import { useState } from 'react';
import InfinityScroll from '@src/components/InfiniteScroll/InfiniteScroll';

import classNames from 'classnames/bind';
import style from './style.module.scss';
import useThrottle from '@src/hooks/useThrottle/useThrottle';
const cx = classNames.bind(style);

function InfinityScrollTestPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(Array.from({ length: 5 }, () => 0));

  const onLast = useThrottle(() => {
    setLoading(true);
    setTimeout(() => {
      setData((prevData) => {
        const newArray = [...prevData, ...Array.from({ length: 5 }, () => 0)];
        return newArray;
      });
      setLoading(false);
    }, 3000);
  }, 3000);

  return (
    <InfinityScroll className={cx('list')} loading={false} onLast={onLast}>
      {
        <>
          {data.map((_, idx) => {
            return <div key={idx}>{idx}</div>;
          })}
          {loading && <span>loading...</span>}
        </>
      }
    </InfinityScroll>
  );
}

export default InfinityScrollTestPage;
