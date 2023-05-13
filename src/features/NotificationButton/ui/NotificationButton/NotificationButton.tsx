import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover } from '@/shared/ui/Popups';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import ProfileIcon from '@/shared/assets/icons/profile-24x24.svg';
import { NotificationList } from '@/entities/Notification';

import { Drawer } from '@/shared/ui/Drawer';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Button
      variant={ButtonVariant.CLEAR}
      onClick={onOpenDrawer}
    >
      <Icon
        Svg={ProfileIcon}
        inverted
      />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer
          isOpen={isOpen}
          onClose={onCloseDrawer}
        >
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
