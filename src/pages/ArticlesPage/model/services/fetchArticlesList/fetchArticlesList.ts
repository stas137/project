import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleType } from 'entities/Article';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticleListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticleListProps,
  // void,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    // const { page = 1 } = props;

    const page = getArticlesPageNum(getState());
    const limit = getArticlesPageLimit(getState());
    const order = getArticlesPageOrder(getState());
    const sort = getArticlesPageSort(getState());
    const search = getArticlesPageSearch(getState());
    const type = getArticlesPageType(getState());

    try {
      // window.history.pushState(null, '', `?search=${search}`);

      addQueryParams({
        sort, order, search, type,
      });

      const response = await extra.api.get<Article[]>(
        '/articles',
        {
          params: {
            _expand: 'user',
            _page: page,
            _limit: limit,
            _order: order,
            _sort: sort,
            q: search,
            type: type === ArticleType.ALL ? undefined : type,
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
