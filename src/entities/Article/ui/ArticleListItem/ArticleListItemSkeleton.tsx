import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { ArticleView } from '../../model/consts/consts';
import { toggleFeatures } from '@/shared/lib/features';

import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    const Card = toggleFeatures<typeof CardDeprecated | typeof CardRedesigned>({
      name: 'isAppRedesigned',
      on: () => CardRedesigned,
      off: () => CardDeprecated,
    });

    if (view === ArticleView.LIST) {
      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Skeleton
                width={30}
                height={30}
                borderRadius="50%"
              />
              <Skeleton
                className={cls.username}
                width={150}
                height={16}
              />
              <Skeleton
                className={cls.date}
                width={100}
                height={16}
              />
            </div>
            <Skeleton
              className={cls.title}
              width={250}
              height={24}
            />
            <Skeleton
              className={cls.img}
              height={200}
            />

            <div className={cls.footer}>
              <Skeleton
                width={200}
                height={36}
              />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <Skeleton
              className={cls.img}
              width={200}
              height={200}
            />
          </div>
          <div className={cls.infoWrapper}>
            <Skeleton
              className={cls.types}
              width={130}
              height={16}
            />
          </div>
          <Skeleton
            className={cls.title}
            width={150}
            height={16}
          />
        </Card>
      </div>
    );
  },
);
