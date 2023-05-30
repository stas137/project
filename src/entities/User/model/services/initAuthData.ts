import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localstorage';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/userSchema';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (!userId) {
      return rejectWithValue('Error');
    }

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      if (!response) {
        return rejectWithValue('Error');
      }

      return response;
    } catch (err) {
      console.log(err);
      return rejectWithValue('Error');
    }
  },
);
