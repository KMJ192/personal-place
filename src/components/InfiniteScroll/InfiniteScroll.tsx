import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';

type Props = {
  children: JSX.Element;
  loading: boolean;
  onLast: () => void;
  className?: string;
};

function InfinityScroll({ children, loading, onLast, className }: Props) {
  console.log('loading', loading);
  const curRef = useRef<HTMLDivElement>(null);

  const { entry } = useIntersectionObserver(
    curRef,
    {},
    { isObserving: loading ? false : true },
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      onLast();
    }
  }, [entry]);

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
