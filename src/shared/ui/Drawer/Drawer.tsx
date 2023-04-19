import {
  ReactNode, memo, useCallback, useEffect,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { useTheme } from '@/app/providers/ThemeProvider';
import { useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
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

const HEIGHT = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
  const {
    className,
    isOpen,
    lazy = false,
    children,
    onClose,
  } = props;

  const { theme } = useTheme();
  const { Spring, Gesture } = useAnimationLibs();

  const [{ y }, api] = Spring.useSpring(() => ({ y: HEIGHT }));

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: HEIGHT,
      immediate: false,
      config: {
        ...Spring.config.stiff,
        velocity,
      },
      onResolve: onClose,
    });
  };

  const bind = Gesture.useDrag(
    ({
      last, velocity: [, vy], direction: [, dy], movement: [, my], cancel,
    }) => {
      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) {
        cancel();
      }

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) {
        if (my > HEIGHT * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }

      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
    },
    {
      from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
    },
  );

  if (!isOpen) {
    return null;
  }

  const display = y.to((py) => {
    return py < HEIGHT ? 'block' : 'none';
  });

  return (
    <Portal>
      <div className={classNames(cls.Drawer, {}, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />

        <Spring.a.div
          className={cls.sheet}
          style={{
            display, bottom: `calc(-100vh + ${HEIGHT - 100}px)`, y,
          }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});

export const Drawer = memo((props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
});
