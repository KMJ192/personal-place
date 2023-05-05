import { useRef } from 'react';

function useRequestAnimationFrame(callback: () => void) {
  const nextFrameCallback = useRef<number>(0);

  const nextExecution = () => {
    window.cancelAnimationFrame(nextFrameCallback.current);
    nextFrameCallback.current = window.requestAnimationFrame(callback);
  };

  return nextExecution;
}

export default useRequestAnimationFrame;
