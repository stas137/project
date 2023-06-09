import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';

import { Card } from '@/shared/ui/redesigned/Card';

import { classNames } from '@/shared/lib/classNames/classNames';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
  const { className } = props;

  const { id } = useParams<{ id: string }>();

  return (
    <Card
      className={classNames('', {}, [className])}
      padding="24"
      fullWidth
      fullHeight
    >
      <ArticleDetails articleId={id} />
    </Card>
  );
});
