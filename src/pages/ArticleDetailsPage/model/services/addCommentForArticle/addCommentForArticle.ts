import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';

import {
  fetchCommentsByArticleId,
} from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
  >(
    'articleDetailsComments/addCommentForArticle',
    async (text, thunkAPI) => {
      const {
        extra, rejectWithValue, dispatch, getState,
      } = thunkAPI;

      const userData = getUserAuthData(getState());
      const article = getArticleDetailsData(getState());

      if (!userData || !text || !article) {
        return rejectWithValue('No data');
      }

      try {
        const response = await extra.api.post<Comment>('/comments', {
          text,
          userId: userData.id,
          articleId: article.id,
        });

        if (!response.data) {
          throw new Error();
        }

        dispatch(fetchCommentsByArticleId(article.id));

        return response.data;
      } catch (e) {
        return rejectWithValue('Error');
      }
    },
  );
