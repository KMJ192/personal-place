import { useEffect, useRef } from 'react';

function useComponentDidMount(callback: () => void | (() => void)) {
  const isMount = useRef<boolean>(false);

  useEffect(() => {
    let unmount: void | (() => void);
    if (isMount.current === false) {
      isMount.current = true;
      unmount = callback();
    }

    if (typeof unmount === 'function') {
      return unmount;
    }
  }, [callback]);
}

export default useComponentDidMount;
