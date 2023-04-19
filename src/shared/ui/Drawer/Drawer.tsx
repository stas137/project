import { ReactNode, memo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';

import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

import cls from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  children: ReactNode;
  onClose?: () => void;
}

const ANIMATION_DELAY = 100;

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    isOpen,
    lazy = false,
    children,
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
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />

        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
