import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { LOCAL_STORAGE_ARTICLES_LIST_ITEM_IDX } from '@/shared/const/localstorage';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';

import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleListItemProps } from '../ArticleListItem';

import cls from './ArticleListItemRedesigned.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target, index } = props;

  const { t } = useTranslation('article');
  // const [isHover, bindHover] = useHover();

  const types = <Text text={article.type.join(', ')} />;

  const views = (
    <HStack
      gap="8"
      max={false}
    >
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} />
    </HStack>
  );

  const handleButtonclick = () => {
    if (index) {
      localStorage.setItem(
        LOCAL_STORAGE_ARTICLES_LIST_ITEM_IDX,
        JSON.stringify(index),
      );
    }
  };

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        className={classNames(cls.ArticleListItemRedesigned, {}, [
          className,
          cls[view],
        ])}
        padding="24"
        data-testid="ArticleListItem"
      >
        <VStack gap="16">
          <HStack gap="8">
            <Avatar
              size={32}
              src={article.user.avatar}
            />
            <Text
              text={article.user.username}
              bold
            />
            <Text text={article.createdAt} />
          </HStack>

          <Text
            // className={cls.title}
            title={article.title}
            bold
          />

          <Text
            // className={cls.title}
            title={article.subtitle}
            size="s"
          />

          {/* {types} */}

          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            fallback={
              <Skeleton
                width="100%"
                height="250px"
              />
            }
          />

          {textBlock?.paragraphs && (
            // <ArticleTextBlockComponent
            //   className={cls.textBlock}
            //   block={textBlock}
            // />
            <Text
              className={cls.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(' ')}
            />
          )}

          <HStack justify="between">
            <AppLink
              to={getRouteArticleDetails(article.id)}
              target={target}
            >
              <Button
                variant="outline"
                onClick={handleButtonclick}
              >
                {t('read-more')}
              </Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      // {...bindHover}
      data-testid="ArticleListItem"
      className={classNames(cls.ArticleListItemRedesigned, {}, [
        className,
        cls[view],
      ])}
      to={getRouteArticleDetails(article.id)}
      target={target}
      onClick={handleButtonclick}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            fallback={
              <Skeleton
                width="200px"
                height="200px"
              />
            }
          />
          <Text
            className={cls.date}
            text={article.createdAt}
          />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text
          className={cls.title}
          text={article.title}
        />
      </Card>
    </AppLink>
  );
});
