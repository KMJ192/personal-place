import { useState, useEffect } from 'react';

function useCount() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((count: number) => count + 1);
  };

  const decrease = () => {
    setCount((count: number) => count - 1);
  };

  return {
    count,
    increase,
    decrease,
  };
}
export default useCount;
