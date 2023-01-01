import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect';

function useComponentDidMount(callback: () => void | (() => void)) {
  const isMount = useRef<boolean>(false);

  useIsomorphicLayoutEffect(() => {
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
