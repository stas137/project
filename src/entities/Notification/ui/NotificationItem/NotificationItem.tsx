import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardVariant } from 'shared/ui/Card/Card';
import { Text } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Notification } from '../../model/types/notification';

import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const {
    className,
    item,
  } = props;

  const { t } = useTranslation();

  const content = (
    <Card
      className={classNames(cls.NotificationItem, {}, [className])}
      variant={CardVariant.OUTLINE}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <AppLink
        className={cls.link}
        to={item.href}
        target="_blank"
      >
        {content}
      </AppLink>
    );
  }

  return content;
});
