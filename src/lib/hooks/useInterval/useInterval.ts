import { useEffect, useRef } from 'react';

import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
