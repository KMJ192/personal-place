import { useState, useEffect } from 'react';

type Props = {
  id: string;
  children: JSX.Element;
};

function VirtualScroll({ id, children }: Props) {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = (e: Event) => {
    requestAnimationFrame(() => {
      const node = e.target as HTMLElement;
      setScrollTop(node.scrollTop);
    });
  };

  useEffect(() => {
    const container = document.getElementById(id);
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, []);

  return children;
}

export default VirtualScroll;
