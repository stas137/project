import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useGetNotificationList } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

// import cls from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;

  const {
    data: notificationList,
    isLoading,
    error,
  } = useGetNotificationList(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        className={classNames('', {}, [className])}
        gap="16"
      >
        <Skeleton
          width="100%"
          borderRadius="10px"
          height="80px"
        />
        <Skeleton
          width="100%"
          borderRadius="10px"
          height="80px"
        />
        <Skeleton
          width="100%"
          borderRadius="10px"
          height="80px"
        />
      </VStack>
    );
  }

  return (
    <VStack
      className={classNames('', {}, [className])}
      gap="16"
    >
      {notificationList?.map((notification) => (
        <NotificationItem
          key={notification.id}
          item={notification}
        />
      ))}
    </VStack>
  );
});
