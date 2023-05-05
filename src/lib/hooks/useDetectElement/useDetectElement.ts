import type { RefObject } from 'react';

type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

function useDetectElement() {
  const isOutOfView = (elementRef: RefObject<Element>) => {
    const element = elementRef.current;
    if (!element || !window) return false;

    const nodeRect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return (
      Math.floor(nodeRect.left) <= viewportWidth &&
      Math.floor(nodeRect.right) >= 0 &&
      Math.floor(nodeRect.top) <= viewportHeight &&
      Math.floor(nodeRect.bottom) >= 0
    );
  };

  const isPartOutOfView = (elementRef: RefObject<Element>) => {
    const element = elementRef.current;
    if (!element || !window) return false;

    const nodeRect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return (
      Math.floor(nodeRect.left) < 0 ||
      Math.floor(nodeRect.right) > viewportWidth ||
      Math.floor(nodeRect.top) < 0 ||
      Math.floor(nodeRect.bottom) > viewportHeight
    );
  };

  const isWillOutOfView = (nodeRect: Rect) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return (
      Math.floor(nodeRect.left) <= viewportWidth &&
      Math.floor(nodeRect.right) >= 0 &&
      Math.floor(nodeRect.top) <= viewportHeight &&
      Math.floor(nodeRect.bottom) >= 0
    );
  };

  const isWillPartOutOfView = (nodeRect: Rect) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return (
      Math.floor(nodeRect.left) < 0 ||
      Math.floor(nodeRect.right) > viewportWidth ||
      Math.floor(nodeRect.top) < 0 ||
      Math.floor(nodeRect.bottom) > viewportHeight
    );
  };

  return {
    isOutOfView,
    isPartOutOfView,
    isWillOutOfView,
    isWillPartOutOfView,
  };
}

export default useDetectElement;
