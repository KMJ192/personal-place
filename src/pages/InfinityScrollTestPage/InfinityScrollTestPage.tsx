import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from '@src/components/InfiniteScroll/InfiniteScroll';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function InfinityScrollTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLSpanElement>(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Array<number>>([]);

  const onLoad = () => {
    if (!loading) {
      setLoading(() => true);
      setTimeout(() => {
        setData((prevData) => {
          const newArray = [...prevData, ...Array.from({ length: 7 }, () => 0)];
          return newArray;
        });
        setLoading(() => false);
      }, 1000);
    }
  };

  return (
    <InfiniteScroll className={cx('list')} onLoad={onLoad} ref={containerRef}>
      {
        <div>
          {data.map((_, idx) => {
            return <div key={idx}>{idx}</div>;
          })}
          {loading && <span ref={loadingRef}>loading...</span>}
        </div>
      }
    </InfiniteScroll>
  );
}

export default InfinityScrollTestPage;
