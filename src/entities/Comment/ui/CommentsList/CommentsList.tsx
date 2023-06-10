import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentsList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack
        className={classNames('', {}, [className])}
        gap="16"
      >
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack
      data-testid="CommentsList.Content"
      className={classNames('', {}, [className])}
      gap="16"
    >
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isLoading={isLoading}
          />
        ))
      ) : (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text text={t('comments-not-found')} />}
          off={<TextDeprecated text={t('comments-not-found')} />}
        />
      )}
    </VStack>
  );
});
