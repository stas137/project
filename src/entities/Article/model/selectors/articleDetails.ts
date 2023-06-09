import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

import { getUserAuthData } from '@/entities/User';

export const getArticleDetailsData = (state: StateSchema) =>
  state.articleDetails?.data;
export const getArticleDetailsIsLoading = (state: StateSchema) =>
  state.articleDetails?.isLoading || false;
export const getArticleDetailsError = (state: StateSchema) =>
  state.articleDetails?.error;

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
