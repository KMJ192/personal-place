import { useState, useEffect, forwardRef, RefObject } from 'react';
import {
  useRequestAnimationFrame,
  useIsomorphicLayoutEffect,
} from '@src/hooks';

type Props = {
  children: JSX.Element;
  rowClassName: string;
  className?: string;
};

const VirtualScroll = forwardRef<HTMLDivElement, Props>(
  ({ children, rowClassName, className }, ref) => {
    const rm = useRequestAnimationFrame(() => {
      const row = document.getElementsByClassName(rowClassName);
      const container = (ref as RefObject<HTMLDivElement>).current;
      if (row.length > 0 && container) {
        const bbox = row[0].getBoundingClientRect();
      }
    });

    useIsomorphicLayoutEffect(() => {
      rm();
    }, []);

    return (
      <div
        className={className}
        ref={ref}
        style={{
          overflowY: 'scroll',
        }}
      >
        {children}
      </div>
    );
  },
);

export default VirtualScroll;
