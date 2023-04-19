import { useTheme } from 'app/providers/ThemeProvider';
import {
  MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  lazy?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 100;

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    lazy = false,
    onClose,
  } = props;

  const { theme } = useTheme();

  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const timerIsOpeningRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);

      timerRef.current = setTimeout(
        () => {
          onClose();
          setIsClosing(false);
          setIsOpening(false);
        },
        ANIMATION_DELAY,
      );
    }
  }, [onClose]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);

      timerIsOpeningRef.current = setTimeout(
        () => {
          setIsOpening(true);
        },
        ANIMATION_DELAY,
      );
    }
  }, [isOpen]);

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

  const mods: Mods = {
    [cls.opened]: isOpening,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    // <Portal element={document.getElementById('app') ?? document.body}>
    <Portal>
      <div className={classNames(cls.Modal, mods, [className, 'app_modal', theme])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
