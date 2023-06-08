import { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

import cls from './Modal.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  lazy?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 100;

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, lazy = false, onClose } = props;

  const { theme } = useTheme();

  const {
    isMounted,
    // isOpening,
    isClosing,
    close,
  } = useModal({
    isOpen,
    animationDelay: ANIMATION_DELAY,
    onClose,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return <div />;
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          'app_modal',
          theme,
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalNew,
            off: () => cls.modalOld,
          }),
        ])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
