import { useEffect } from 'react';
import type { RefObject } from 'react';

function useResizeObserver<T extends Element>(
  ref: RefObject<T>,
  callback?: () => void,
) {
  useEffect(() => {
    const node = ref.current;
    if (node) {
      const observer = new ResizeObserver((entries) => {
        if (entries.length > 0) {
          if (callback) {
            callback();
          }
        }
      });
      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    }

    return () => {};
  }, []);
}

export default useResizeObserver;
