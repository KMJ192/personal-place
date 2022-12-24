import { forwardRef, Fragment, RefObject, useEffect, useState } from 'react';
import {
  useRequestAnimationFrame,
  useIsomorphicLayoutEffect,
} from '@src/hooks';

import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

type ChildrenProps = {
  index: number;
  data?: { [key: string]: any };
};

type Props = {
  id: string;
  itemClassName: string;
  itemCount: number;
  data?: { [key: string]: any };
  className?: string;
  children: (props: ChildrenProps) => JSX.Element;
};

const VirtualScroll = forwardRef<HTMLDivElement, Props>(
  ({ children, id, itemClassName, itemCount, data, className }, ref) => {
    const [listRen, setListRen] = useState(itemCount > 0 ? 1 : 0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const rm = useRequestAnimationFrame(() => {
      const items = document.getElementsByClassName(itemClassName);
      const container = (ref as RefObject<HTMLDivElement>).current;
      if (items && items.length > 0 && container) {
        setScrollHeight(container.scrollHeight);
        const item = items[0];
        const { height: containerHeight } = container.getBoundingClientRect();
        const { height: itemHeight } = item.getBoundingClientRect();

        setListRen(Math.ceil(containerHeight / itemHeight));
      }
    });

    const handleScroll = (e: Event) => {
      const container = e.target as HTMLDivElement;
      setScrollTop(container.scrollTop);
    };

    useIsomorphicLayoutEffect(() => {
      rm();
    }, []);

    useEffect(() => {
      const container = (ref as RefObject<HTMLDivElement>).current;

      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => {
          container.removeEventListener('scroll', handleScroll);
        };
      }
      return () => {};
    }, [scrollTop]);

    return (
      <div id={id} className={`${className} ${cx('virtual-scroll')}`} ref={ref}>
        {/* <div
          className={cx('scroll')}
          style={{
            top: `${100}px`,
          }}
        ></div> */}
        {Array.from({ length: listRen }, () => 0).map((_, idx) => {
          return (
            <Fragment key={idx}>{children({ index: idx, data })}</Fragment>
          );
        })}
      </div>
    );
  },
);

export default VirtualScroll;
