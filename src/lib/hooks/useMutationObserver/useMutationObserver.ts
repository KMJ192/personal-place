import { useState } from 'react';
import type { RefObject } from 'react';

function useMutationObserver<T extends Element>(
  ref: RefObject<T>,
  callback?: () => void,
) {
  const [isMutation, setIsMutation] = useState({
    current: false,
  });

  const nextMutation = () => {
    const node = ref.current;
    const config = { attributes: true, childList: true, subtree: true };
    if (node) {
      const observer = new MutationObserver(() => {
        setIsMutation({
          current: true,
        });
        if (callback) {
          callback();
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
    isMutation,
    nextMutation,
  };
}

export default useMutationObserver;
