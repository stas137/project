import { memo } from 'react';

import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import { getRouteProfile } from '@/shared/const/router';

import { Comment } from '../../model/types/comment';

import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  if (isLoading) {
    return (
      <VStack
        data-testid="CommentCard.Loading"
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
        gap="8"
      >
        <div className={cls.header}>
          <Skeleton
            width={30}
            height={30}
            borderRadius="50%"
          />
          <Skeleton
            className={cls.username}
            width={100}
            height={20}
          />
        </div>
        <Skeleton
          className={cls.text}
          width="100%"
          height={50}
        />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          padding="16"
          fullWidth
        >
          <VStack
            data-testid="CommentCard.Content"
            className={classNames(cls.CommentCardRedesigned, {}, [className])}
            gap="8"
          >
            <AppLink to={getRouteProfile(comment.user.id)}>
              <HStack gap="8">
                {comment.user.avatar && (
                  <Avatar
                    src={comment.user.avatar}
                    size={30}
                  />
                )}
                <Text
                  text={comment.user.username}
                  bold
                />
              </HStack>
            </AppLink>
            <Text text={comment.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          data-testid="CommentCard.Content"
          className={classNames(cls.CommentCard, {}, [className])}
          gap="8"
        >
          <AppLinkDeprecated
            className={cls.header}
            to={getRouteProfile(comment.user.id)}
          >
            {comment.user.avatar && (
              <AvatarDeprecated
                src={comment.user.avatar}
                size={30}
              />
            )}
            <TextDeprecated
              className={cls.username}
              title={comment.user.username}
            />
          </AppLinkDeprecated>
          <TextDeprecated text={comment.text} />
        </VStack>
      }
    />
  );
});
