import {
  MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';

interface UseModalProps {
  isOpen?: boolean;
  animationDelay: number;
  onClose?: () => void;
}

export function useModal({
  isOpen, animationDelay, onClose,
}: UseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  // const [isOpening, setIsOpening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const timerIsOpeningRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const close = useCallback(
    () => {
      console.log('close');
      // if (onClose) {
      setIsClosing(true);

      timerRef.current = setTimeout(
        () => {
          onClose?.();
          setIsClosing(false);
          // setIsOpening(false);
          setIsMounted(false);
        },
        animationDelay,
      );
    },
    // }
    [animationDelay, onClose],
  );

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);

      // timerIsOpeningRef.current = setTimeout(
      //   () => {
      //     setIsOpening(true);
      //   },
      //   animationDelay,
      // );
      // } else if (isMounted) {
      //   setIsClosing(true);

    //   timerIsOpeningRef.current = setTimeout(
    //     () => {
    //       setIsClosing(false);
    //       // setIsOpening(false);
    //       setIsMounted(false);
    //     },
    //     animationDelay,
    //   );
    }
  }, [animationDelay, isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    } else {
      window.removeEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isOpen, onKeyDown]);

  return {
    isMounted,
    // isOpening,
    isClosing,
    close,
  };
}
