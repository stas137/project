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

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target, index } = props;

  const { t } = useTranslation('article');
  // const [isHover, bindHover] = useHover();

  const types = (
    <Text
      className={cls.types}
      text={article.type.join(', ')}
    />
  );

  const views = (
    <HStack
      gap="8"
      max={false}
    >
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} />
    </HStack>
  );

  const userInfo = (
    <>
      <Avatar
        size={32}
        src={article.user.avatar}
      />
      <Text
        bold
        text={article.user.username}
      />
    </>
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
            title={article.title}
            bold
          />

          <Text
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
      className={classNames(cls.ArticleListItemRedesigned, {}, [
        className,
        cls[view],
      ])}
      to={getRouteArticleDetails(article.id)}
      target={target}
      data-testid="ArticleListItem"
      onClick={handleButtonclick}
    >
      <Card className={cls.card}>
        <AppImage
          className={cls.img}
          src={article.img}
          alt={article.title}
          fallback={
            <Skeleton
              width={200}
              height={200}
            />
          }
        />

        <VStack className={cls.info}>
          <Text
            className={cls.title}
            text={article.title}
          />

          <VStack className={cls.footer}>
            <HStack justify="between">
              <Text
                className={cls.date}
                text={article.createdAt}
              />
              {views}
            </HStack>
            <HStack>
              {userInfo}
              {types}
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
