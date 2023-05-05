import { ReactNode } from 'react';

interface ModalWithoutPortalProps {
  className?: string;
  children?: ReactNode;
  lazy?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 100;

export const ModalWithoutPortal = (props: ModalWithoutPortalProps) => {
  const {
    className,
    children,
    isOpen,
    lazy = false,
    onClose,
  } = props;

  // const { theme } = useTheme();

  // const {
  //   isMounted,
  //   // isOpening,
  //   isClosing,
  //   close,
  // } = useModal({
  //   isOpen,
  //   animationDelay: ANIMATION_DELAY,
  //   onClose,
  // });

  // const mods: Mods = {
  //   [cls.opened]: isOpen,
  //   // [cls.isClosing]: isClosing,
  // };

  // if (lazy) {
  return <div>Modal</div>;
  // }

  // return (
  //   <div className={classNames(cls.Modal, mods, [className, 'app_modal', theme])}>
  //     {/* <Overlay onClick={close} /> */}
  //     <div className={cls.content}>
  //       {children}
  //     </div>
  //   </div>
  // );
};
