import {
  forwardRef,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

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
    // const arr = useRef<Array<number>>(
    //   itemCount > 0 ? Array.from({ length: 1 }, (_, idx) => idx) : [],
    // );
    // const listLen = useRef<number>(0);
    // const count = useRef<number>(0);
    const [arr, setArr] = useState(
      itemCount > 0 ? Array.from({ length: 1 }, (_, idx) => idx) : [],
    );
    const [listLen, setListLen] = useState(0);
    const [count, setCount] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
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
        const lLen = Math.ceil(containerHeight / itemHeight);
        setListLen(lLen);
        const newArr = Array.from({ length: lLen + 2 }, (_, idx) => idx);
        setArr(newArr);
      }
    });

    const handleScroll = (e: Event) => {
      const container = e.target as HTMLDivElement;
      if (container.scrollTop >= scrollTop) {
        const next =
          elementSize.item.height - scrollTop + count * elementSize.item.height;
        if (next <= 0) {
          const newArr = Array.from(
            { length: listLen + 2 },
            (_, idx) => idx + count,
          );
          setArr(newArr);
          setCount((count) => count + 1);
        }
      } else {
        const prev =
          elementSize.item.height - scrollTop + count * elementSize.item.height;
        if (prev >= elementSize.item.height) {
          const newArr = Array.from(
            { length: listLen + 2 },
            (_, idx) => arr[idx] - 1,
          );
          setArr(newArr);
          if (0 <= count) {
            setCount((count) => count - 1);
          }
        }
      }
      setScrollTop(() => container.scrollTop);
    };

    useIsomorphicLayoutEffect(() => {
      calculationSize();
    }, []);

    useLayoutEffect(() => {
      const container = (ref as RefObject<HTMLDivElement>).current;
      if (container) {
        container.addEventListener('scroll', handleScroll, {
          capture: false,
        });
        return () => {
          container.removeEventListener('scroll', handleScroll, {
            capture: false,
          });
        };
      }
      return () => {};
    }, [elementSize, scrollTop, arr]);

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

export type { ItemProps };
export default VirtualScroll;
