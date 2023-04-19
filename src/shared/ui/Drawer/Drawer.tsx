import { ReactNode, memo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';

import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
  className?: string;
  isOpen?: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    isOpen,
    children,
    onClose,
  } = props;

  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />

        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
