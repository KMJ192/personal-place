import { forwardRef, useEffect, useRef } from 'react';

import useIntersectionObserver from '@lib/hooks/useIntersectionObserver/useIntersectionObserver';
import useRequestAnimationFrame from '@lib/hooks/useRequestAnimationFrame/useRequestAnimationFrame';

type Props = {
  children: JSX.Element;
  onLoad: () => void;
  className?: string;
};

const InfiniteScroll = forwardRef<HTMLDivElement, Props>(
  ({ children, onLoad, className }: Props, ref) => {
    const curRef = useRef<HTMLDivElement>(null);

    const entry = useIntersectionObserver(curRef, {});

    const next = useRequestAnimationFrame(onLoad);

    useEffect(() => {
      if (entry?.isIntersecting) {
        next();
      }
    }, [entry]);

    return (
      <div
        className={className}
        style={{
          overflowY: 'auto',
        }}
        ref={ref}
      >
        {children}
        <div ref={curRef}></div>
      </div>
    );
  },
);

export default InfiniteScroll;
