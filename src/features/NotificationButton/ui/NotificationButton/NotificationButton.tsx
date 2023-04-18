import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import ProfileIcon from 'shared/assets/icons/profile-24x24.svg';
import { NotificationList } from 'entities/Notification';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const {
    className,
  } = props;

  return (
    <Popover
      className={classNames(cls.NotificationButton, {}, [className])}
      trigger={(
        <Button variant={ButtonVariant.CLEAR}>
          <Icon
            Svg={ProfileIcon}
            inverted
          />
        </Button>
      )}
    >
      <NotificationList
        className={cls.notifications}
      />
    </Popover>
  );
});
