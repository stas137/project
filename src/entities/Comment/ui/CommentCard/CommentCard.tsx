import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const {
    className,
    comment,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <VStack gap="8" className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} borderRadius="50%" />
          <Skeleton className={cls.username} width={100} height={20} />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack
      className={classNames(cls.CommentCard, {}, [className])}
      gap="8"
    >
      <AppLink
        className={cls.header}
        to={getRouteProfile(comment.user.id)}
      >
        {comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text text={comment.text} />
    </VStack>
  );
});
