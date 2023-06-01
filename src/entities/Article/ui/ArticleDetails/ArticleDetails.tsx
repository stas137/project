import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  Reducers,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import EyeIcon from '@/shared/assets/icons/profile-24x24.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import { ArticleBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/consts/consts';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  articleId?: string;
}

const initialReducers: Reducers = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, articleId } = props;

  let content;

  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();

  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(articleId));
    }
  }, [dispatch, articleId]);

  if (isLoading) {
    content = (
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
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t('article-loader-error')}
      />
    );
  } else {
    content = (
      <>
        <HStack justify="center">
          <Avatar
            size={125}
            src={article?.img}
            alt={article?.title}
          />
        </HStack>

        <VStack gap="4">
          <Text
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />

          <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>

          <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>

        {article?.blocks.map(renderBlock)}
      </>
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
