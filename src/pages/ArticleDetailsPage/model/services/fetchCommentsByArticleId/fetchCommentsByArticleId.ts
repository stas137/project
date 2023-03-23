import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
Comment[],
string | undefined,
ThunkConfig<string>
>(
  'articleDetailsComments/fetchCommentsByArticleId',
  async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!articleId) {
      rejectWithValue('Error');
    }

    try {
      const response = await extra.api.get<Comment[]>(
        '/comments',
        {
          params: {
            articleId,
            _expand: 'user',
          },
        },
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (err) {
      return rejectWithValue('Error');
    }
  },
);