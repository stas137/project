import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import {
  TextAlign,
  Text as TextDeprecated,
  TextSize,
} from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  Reducers,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import EyeIcon from '@/shared/assets/icons/profile-24x24.svg';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { renderArticleBlock } from './renderArticleBlock';

import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  articleId?: string;
}

const initialReducers: Reducers = {
  articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify="center">
        <AvatarDeprecated
          size={125}
          src={article?.img}
          alt={article?.title}
        />
      </HStack>

      <VStack gap="4">
        <TextDeprecated
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />

        <HStack gap="8">
          <IconDeprecated Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>

        <HStack gap="8">
          <IconDeprecated Svg={EyeIcon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>

      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text
        title={article?.title}
        size="l"
        bold
      />
      <Text title={article?.subtitle} />

      <AppImage
        className={cls.img}
        fallback={
          <Skeleton
            width="100%"
            height={320}
            borderRadius="16px"
          />
        }
        src={article?.img}
      />

      <HStack justify="center">
        <Avatar
          size={125}
          src={article?.img}
          alt={article?.title}
        />
      </HStack>

      <VStack gap="4">
        <HStack gap="8">
          <Icon Svg={EyeIcon} />
          <Text text={String(article?.views)} />
        </HStack>

        <HStack gap="8">
          <Icon Svg={EyeIcon} />
          <Text text={article?.createdAt} />
        </HStack>
      </VStack>

      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, articleId } = props;

  let content;

  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();

  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(articleId));
    }
  }, [dispatch, articleId]);

  if (isLoading) {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <>
            <Skeleton
              className={cls.avatar}
              width={125}
              height={125}
              borderRadius="50%"
            />
            <Skeleton
              width={300}
              height={32}
            />
            <Skeleton
              width={600}
              height={24}
            />
            <Skeleton
              width="100%"
              height={200}
            />
            <Skeleton
              width="100%"
              height={200}
            />
          </>
        }
        off={
          <>
            <SkeletonDeprecated
              className={cls.avatar}
              width={125}
              height={125}
              borderRadius="50%"
            />
            <SkeletonDeprecated
              width={300}
              height={32}
            />
            <SkeletonDeprecated
              width={600}
              height={24}
            />
            <SkeletonDeprecated
              width="100%"
              height={200}
            />
            <SkeletonDeprecated
              width="100%"
              height={200}
            />
          </>
        }
      />
    );
  } else if (error) {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Text
            align="center"
            title={t('article-loader-error')}
          />
        }
        off={
          <TextDeprecated
            align={TextAlign.CENTER}
            title={t('article-loader-error')}
          />
        }
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <VStack
        className={classNames(cls.ArticleDetails, {}, [className])}
        gap="16"
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
