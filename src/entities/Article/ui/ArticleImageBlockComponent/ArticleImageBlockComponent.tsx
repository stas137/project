import { memo } from 'react';

import { TextAlign, Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import { ArticleImageBlock } from '../../model/types/article';

import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        <img
          className={cls.img}
          src={block.src}
          alt={block.title}
        />
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <Text
                text={block.title}
                align="center"
              />
            }
            off={
              <TextDeprecated
                text={block.title}
                align={TextAlign.CENTER}
              />
            }
          />
        )}
      </div>
    );
  },
);
