import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { COUNT_ARTICLES_LIST_VIEW, COUNT_ARTICLES_TILE_VIEW } from 'shared/const/const';
import { LOCAL_STORAGE_ARTICLES_VIEW_KEY } from 'shared/const/localstorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticlesPage = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: '',
    view: ArticleView.TILE,
    page: 1,
    hasMore: true,
    ids: [],
    entities: {},
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      state.limit = action.payload === ArticleView.LIST
        ? COUNT_ARTICLES_LIST_VIEW : COUNT_ARTICLES_TILE_VIEW;

      localStorage.setItem(LOCAL_STORAGE_ARTICLES_VIEW_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = localStorage
        .getItem(LOCAL_STORAGE_ARTICLES_VIEW_KEY) as ArticleView || ArticleView.TILE;

      state.view = view;
      state.limit = view === ArticleView.LIST
        ? COUNT_ARTICLES_LIST_VIEW : COUNT_ARTICLES_TILE_VIEW;

      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;

        if (action.payload.length > 0) {
          articlesAdapter.addMany(state, action);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
