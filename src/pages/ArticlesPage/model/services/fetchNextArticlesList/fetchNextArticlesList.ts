import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesList = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articles/fetchNextArticlesList',
  async (_, thunkApi) => {
    const {
      extra, rejectWithValue, dispatch, getState,
    } = thunkApi;

    const page = getArticlesPageNum(getState());
    const hasMore = getArticlesPageHasMore(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1));
      // dispatch(fetchArticlesList({ page: page + 1 }));
      dispatch(fetchArticlesList({}));
    }
  },
);
