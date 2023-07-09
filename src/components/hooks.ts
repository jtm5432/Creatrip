import { useState, useEffect } from 'react';
/**
 * 지연된 시간 후에 값을 업데이트
 *
 * @param {T} value - 상태 값
 * @param {number} delay - 지연 시간
 * @returns {T} 
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


