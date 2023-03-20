import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from 'entities/Comment/model/types/comment';
import cls from './CommentsList.module.scss';

import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentsList = memo((props: CommentListProps) => {
  const {
    className,
    comments,
    isLoading,
  } = props;

  const { t } = useTranslation();

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            key={comment.id}
            className={cls.comment}
            comment={comment}
            isLoading={isLoading}
          />
        ))
        : <Text text={t('comments-not-found')} />}
    </div>
  );
});
