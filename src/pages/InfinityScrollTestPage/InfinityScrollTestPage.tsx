import { useState } from 'react';
import InfinityScroll from '@src/components/InfiniteScroll/InfiniteScroll';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function InfinityScrollTestPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(Array.from({ length: 5 }, () => 0));

  const onLast = () => {
    setLoading(true);
    setTimeout(() => {
      console.log(1);
      setData((prevData) => {
        const newArray = [...prevData, ...Array.from({ length: 5 }, () => 0)];
        return newArray;
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <InfinityScroll
      className={cx('list')}
      loading={false}
      onLast={onLast}
      throttle={3000}
    >
      {
        <div>
          {data.map((_, idx) => {
            return <div key={idx}>{idx}</div>;
          })}
          {loading && <span>loading...</span>}
        </div>
      }
    </InfinityScroll>
  );
}

export default InfinityScrollTestPage;
