import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const getArticleCanEditUser = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, authData) => {
    if (!article || !authData) {
      return false;
    }

    return article.user.id === authData.id;
  },
);
