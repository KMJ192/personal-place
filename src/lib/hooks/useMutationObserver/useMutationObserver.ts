import type { RefObject } from 'react';

function useMutationObserver<T extends Element>(
  ref: RefObject<T>,
  callback?: () => void,
) {
  const nextMutation = () => {
    const node = ref.current;
    const config = { attributes: true, childList: true, subtree: true };
    if (node) {
      const observer = new MutationObserver((entries) => {
        if (entries.length > 0) {
          if (callback) {
            callback();
          }
        }
      });
      observer.observe(node, config);

      return () => {
        observer.disconnect();
      };
    }
    return () => {};
  };

  return {
    nextMutation,
  };
}

export default useMutationObserver;
