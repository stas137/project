import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesList } from './fetchNextArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesList.test', () => {
  it('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesList, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 3,
        isLoading: false,
        hasMore: true,
      },
    });

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticlesList).toBeCalledWith({ page: 3 });
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  it('fetchNextArticlesList is not called, hasMore = false', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesList, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 3,
        isLoading: false,
        hasMore: false,
      },
    });

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  it('fetchNextArticlesList is not called, isLoading = true', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesList, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 3,
        isLoading: true,
        hasMore: true,
      },
    });

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  // it('error', async () => {
  //   const thunk = new TestAsyncThunk(fetchNextArticlesList);

  //   const result = await thunk.callThunk();

  //   expect(thunk.dispatch).toBeCalledTimes(2);
  //   expect(thunk.api.get).toHaveBeenCalled();
  //   expect(result.meta.requestStatus).toBe('rejected');
  //   expect(result.payload).toEqual('Error');
  // });
});
