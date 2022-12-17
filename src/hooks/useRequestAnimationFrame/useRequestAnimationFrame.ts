import { useRef } from 'react';

function useRequestAnimationFrame(callback: () => void) {
  const nextFreamCallback = useRef<number>(0);

  const nextExecution = () => {
    window.cancelAnimationFrame(nextFreamCallback.current);
    nextFreamCallback.current = window.requestAnimationFrame(callback);
  };

  return nextExecution;
}

export default useRequestAnimationFrame;
