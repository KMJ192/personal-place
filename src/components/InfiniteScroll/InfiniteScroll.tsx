import { useEffect, useRef, useState } from 'react';

import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import useThrottle from '@src/hooks/useThrottle/useThrottle';

type Props = {
  children: JSX.Element;
  loading: boolean;
  throttle: number;
  onLast: () => void;
  className?: string;
};

function InfinityScroll({
  children,
  loading,
  throttle,
  onLast,
  className,
}: Props) {
  const pending = useRef<boolean>(loading);
  const mount = useRef<boolean>(false);
  const curRef = useRef<HTMLDivElement>(null);

  const { entry } = useIntersectionObserver(curRef, {}, {});

  const next = useThrottle(
    onLast,
    (() => {
      if (!mount.current) {
        mount.current = true;
        return 0;
      }
      return throttle;
    })(),
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      next();
    }
  }, [entry]);

  useEffect(() => {
    setTimeout(() => {
      pending.current = loading;
    }, 50);
  }, [loading]);

  return (
    <div
      className={className}
      style={{
        overflowY: 'scroll',
      }}
    >
      {children}
      <div ref={curRef}></div>
    </div>
  );
}

export default InfinityScroll;
