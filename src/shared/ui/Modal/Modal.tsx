import { useTheme } from 'app/providers/ThemeProvider';
import { ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

import cls from './Modal.module.scss';

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

  const {
    isMounted,
    isOpening,
    isClosing,
    close,
  } = useModal({
    isOpen,
    animationDelay: ANIMATION_DELAY,
    onClose,
  });

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
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
