import { forwardRef, RefObject, useEffect, useRef, useState } from 'react';

import type { Properties as CSSType } from 'csstype';

import { useRequestAnimationFrame } from '@src/hooks';

type VirtualListItemProps = {
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
  children: (props: VirtualListItemProps) => JSX.Element;
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
    const listLen = useRef<number>(0);
    const arr = useRef<Array<number>>(
      itemCount > 0 ? Array.from({ length: 1 }, (_, idx) => idx) : [],
    );
    const first = useRef<number>(0);
    const [last, setLast] = useState(0);
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

        const lLen = Math.ceil(containerHeight / itemHeight);
        const elementSize = {
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
        };

        setElementSize(elementSize);
        arr.current = Array.from({ length: lLen + 2 }, (_, idx) => idx);
        listLen.current = lLen;

        const last = Math.round(
          container.scrollTop / elementSize.item.height + lLen - 1,
        );

        if (last > itemCount) {
          setLast(itemCount);
          return;
        }
        setLast(last);
      }
    });

    useEffect(() => {
      const handleScroll = (e: Event) => {
        const container = e.target as HTMLDivElement;
        const last = Math.round(
          container.scrollTop / elementSize.item.height + listLen.current - 1,
        );

        if (last > itemCount) {
          setLast(itemCount);
          return;
        }
        setLast(last);
        first.current = last - listLen.current;
      };

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
    }, [elementSize, last]);

    useEffect(() => {
      calculationSize();
    }, [itemCount]);

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
            width: `${elementSize.itemWrapper.width}px`,
            // height:
            //   itemCount <= 0 ? `${elementSize.itemWrapper.height}px` : '0',
            height: `${elementSize.itemWrapper.height}px`,
          }}
        >
          {arr.current.map((_, idx) => {
            const count = first.current + idx;
            if (count < 0 || count >= itemCount) {
              return null;
            }
            return (
              <div
                key={count}
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

export type { VirtualListItemProps };
export default VirtualScroll;
