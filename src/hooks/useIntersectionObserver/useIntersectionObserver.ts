import { RefObject, useState, useEffect } from 'react';

type Props = IntersectionObserverInit & {};

type OberverHooksType = {
  entry: IntersectionObserverEntry;
};

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%' }: Props,
): Partial<OberverHooksType> {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry: IntersectionObserverCallback = (entries: Array<IntersectionObserverEntry>) => {
    setEntry(entries[0]);
  };

  useEffect(() => {
    const node = elementRef?.current;
    if (!node) return;

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef?.current, threshold, root, rootMargin]);

  return {
    entry,
  };
}

export default useIntersectionObserver;
