import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';

import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  index?: number;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target, index } = props;

  const { t } = useTranslation('article');

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );

  // const [isHover, bindHover] = useHover();

  // const types = (
  //   <Text
  //     className={cls.types}
  //     text={article.type.join(', ')}
  //   />
  // );

  // const views = (
  //   <>
  //     <Text
  //       className={cls.views}
  //       text={String(article.views)}
  //     />
  //     <Icon Svg={EyeIcon} />
  //   </>
  // );

  // const handleButtonclick = () => {
  //   if (index) {
  //     localStorage.setItem(
  //       LOCAL_STORAGE_ARTICLES_LIST_ITEM_IDX,
  //       JSON.stringify(index),
  //     );
  //   }
  // };

  // if (view === ArticleView.LIST) {
  //   const textBlock = article.blocks.find(
  //     (block) => block.type === ArticleBlockType.TEXT,
  //   ) as ArticleTextBlock;

  //   return (
  //     <div
  //       data-testid="ArticleListItem"
  //       className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
  //     >
  //       <Card className={cls.card}>
  //         <div className={cls.header}>
  //           <Avatar
  //             size={30}
  //             src={article.user.avatar}
  //           />
  //           <Text
  //             className={cls.username}
  //             text={article.user.username}
  //           />
  //           <Text
  //             className={cls.date}
  //             text={article.createdAt}
  //           />
  //         </div>
  //         <Text
  //           className={cls.title}
  //           title={article.title}
  //         />
  //         {types}

  //         <AppImage
  //           className={cls.img}
  //           src={article.img}
  //           alt={article.title}
  //           fallback={
  //             <Skeleton
  //               width="100%"
  //               height="250px"
  //             />
  //           }
  //         />

  //         {textBlock && (
  //           <ArticleTextBlockComponent
  //             className={cls.textBlock}
  //             block={textBlock}
  //           />
  //         )}
  //         <div className={cls.footer}>
  //           <AppLink
  //             to={getRouteArticleDetails(article.id)}
  //             target={target}
  //           >
  //             <Button onClick={handleButtonclick}>{t('read-more')}</Button>
  //           </AppLink>
  //           {views}
  //         </div>
  //       </Card>
  //     </div>
  //   );
  // }

  // return (
  //   <AppLink
  //     // {...bindHover}
  //     data-testid="ArticleListItem"
  //     className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
  //     to={getRouteArticleDetails(article.id)}
  //     target={target}
  //     onClick={handleButtonclick}
  //   >
  //     <Card className={cls.card}>
  //       <div className={cls.imageWrapper}>
  //         <AppImage
  //           className={cls.img}
  //           src={article.img}
  //           alt={article.title}
  //           fallback={
  //             <Skeleton
  //               width="200px"
  //               height="200px"
  //             />
  //           }
  //         />
  //         <Text
  //           className={cls.date}
  //           text={article.createdAt}
  //         />
  //       </div>
  //       <div className={cls.infoWrapper}>
  //         {types}
  //         {views}
  //       </div>
  //       <Text
  //         className={cls.title}
  //         text={article.title}
  //       />
  //     </Card>
  //   </AppLink>
  // );
});
