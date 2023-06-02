import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  Card as CardDeprecated,
  CardVariant,
} from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Notification } from '../../model/types/notification';

import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures';
import { Card } from '@/shared/ui/redesigned/Card';

import cls from './NotificationItem.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          className={classNames(cls.NotificationItem, {}, [className])}
          variant="light"
        >
          <Text
            title={item.title}
            text={item.description}
          />
        </Card>
      }
      off={
        <CardDeprecated
          className={classNames(cls.NotificationItem, {}, [className])}
          variant={CardVariant.OUTLINE}
        >
          <TextDeprecated
            title={item.title}
            text={item.description}
          />
        </CardDeprecated>
      }
    />
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
