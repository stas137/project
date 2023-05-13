import { useCallback, useEffect, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttleRef = useRef(false);
  const throttleTimeout = useRef<any>(null);

  const throttleCallback = useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        callback(...args);

        throttleRef.current = true;

        throttleTimeout.current = setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      clearTimeout(throttleTimeout.current);
    };
  }, []);

  return throttleCallback;
}
