import { memo } from 'react';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import { ArticleTextBlock } from '../../model/types/article';

import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <Text
                className={cls.title}
                title={block.title}
              />
            }
            off={
              <TextDeprecated
                className={cls.title}
                title={block.title}
              />
            }
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <Text
                key={paragraph}
                className={cls.paragraph}
                text={paragraph}
              />
            }
            off={
              <TextDeprecated
                key={paragraph}
                className={cls.paragraph}
                text={paragraph}
              />
            }
          />
        ))}
      </div>
    );
  },
);
