import { memo, ReactNode } from 'react';
import { Popover as HPopover } from '@headlessui/react';
import { DropdownDirection } from 'shared/types/ui';
import { classNames } from 'shared/lib/classNames/classNames';
import { mapDirectonClass } from '../../styles/consts';

import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
  const {
    className,
    direction = 'bottom left',
    trigger,
    children,
  } = props;

  const menuClasses = [mapDirectonClass[direction]];

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button
        className={popupCls.trigger}
        as="div"
      >
        {trigger}
      </HPopover.Button>

      <HPopover.Panel
        className={classNames(cls.panel, {}, menuClasses)}
      >
        {children}
      </HPopover.Panel>
    </HPopover>
  );
});
