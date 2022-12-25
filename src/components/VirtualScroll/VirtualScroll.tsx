import { forwardRef, RefObject, useEffect, useRef, useState } from 'react';

import type { Properties as CSSType } from 'csstype';

import {
  useRequestAnimationFrame,
  useIsomorphicLayoutEffect,
} from '@src/hooks';

type ItemProps = {
  index: number;
  className: string;
  style?: CSSType;
  data?: any;
};

type Props = {
  id: string;
  itemClassName: string;
  itemCount: number;
  style?: CSSType;
  itemStyle?: CSSType;
  data?: any;
  className?: string;
  children: (props: ItemProps) => JSX.Element;
};

const VirtualScroll = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      id,
      itemClassName,
      itemCount,
      data,
      className,
      style,
      itemStyle,
    },
    ref,
  ) => {
    const itemWrapperRef = useRef<HTMLDivElement | null>(null);
    const maxLen = useRef<number>(0);
    const [elementSize, setElementSize] = useState({
      container: {
        width: 0,
        height: 0,
      },
      itemWrapper: {
        width: 0,
        height: 0,
      },
      item: {
        width: 0,
        height: 0,
      },
    });

    const [scrollTop, setScrollTop] = useState(0);
    const [arr, setArr] = useState<Array<number>>(
      itemCount > 0 ? Array.from({ length: 1 }, (_, idx) => idx) : [],
    );
    const [test, setTest] = useState(0);

    const calculationSize = useRequestAnimationFrame(() => {
      const items = document.getElementsByClassName(itemClassName);
      const container = (ref as RefObject<HTMLDivElement>).current;
      if (items && items.length > 0 && container) {
        const item = items[0];
        const { width: containerWidth, height: containerHeight } =
          container.getBoundingClientRect();
        const { width: itemWidth, height: itemHeight } =
          item.getBoundingClientRect();

        setElementSize({
          container: {
            width: containerWidth,
            height: containerHeight,
          },
          itemWrapper: {
            width: containerWidth,
            height: itemHeight * itemCount,
          },
          item: {
            width: itemWidth,
            height: itemHeight,
          },
        });
        const listLen = Math.ceil(containerHeight / itemHeight);
        const newArr = Array.from({ length: listLen }, (_, idx) => idx);

        setArr(newArr);
        maxLen.current = listLen + 1;

        setTest(itemHeight);
      }
    });

    const handleScroll = (e: Event) => {
      const container = e.target as HTMLDivElement;
      if (container.scrollTop >= scrollTop) {
        console.log('down', test, test - container.scrollTop);
      } else {
        console.log('up', test, test - container.scrollTop);
      }
      setScrollTop(container.scrollTop);
      if (elementSize.item.height - scrollTop >= 0) {
        // if (arr.length < maxLen.current) {
        //   console.log(
        //     '양수',
        //     elementSize.item.height * test - container.scrollTop,
        //     test,
        //   );
        //   setArr((arr) => {
        //     const newArr = Array.from(
        //       { length: arr.length + 1 },
        //       (_, idx) => idx,
        //     );
        //     return newArr;
        //   });
        //   if (test - 1 > 1) {
        //     setTest(test - 1);
        //   }
        // }
      } else {
        // if (arr.length === maxLen.current) {
        //   console.log(
        //     '음수',
        //     elementSize.item.height * test - container.scrollTop,
        //     test,
        //   );
        //   setTest(test + 1);
        //   maxLen.current -= 1;
        //   setArr((arr) => {
        //     const newArr = Array.from(
        //       { length: arr.length - 1 },
        //       (_, idx) => idx,
        //     );
        //     return newArr;
        //   });
        // }
      }
    };

    useIsomorphicLayoutEffect(() => {
      calculationSize();
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
    }, [elementSize, scrollTop]);

    return (
      <div
        id={id}
        className={className}
        ref={ref}
        style={{
          ...style,
          position: 'relative',
          overflowY: 'scroll',
          display: 'block',
        }}
      >
        <div
          ref={itemWrapperRef}
          style={{
            width: '100%', // `${elementSize.itemWrapper.width}px`,
            height: `${elementSize.itemWrapper.height}px`,
          }}
        >
          {arr.map((count, idx) => {
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: '100%',
                  top: `${elementSize.item.height * count}px`,
                }}
              >
                {children({
                  index: count,
                  data,
                  style: itemStyle,
                  className: itemClassName,
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

// 스크롤의 크기는 따로 계산하지 않는다.
// container의 크기는 영역의 크기만큼 주고 스크롤을 생성 시킨다.

export type { ItemProps };
export default VirtualScroll;
