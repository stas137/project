import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_USER_KEY } from 'shared/const/localstorage';
import { Profile } from '../../types/ProfileSchema';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      if (localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
        extra.api.defaults.headers.common.Authorization = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      }

      const response = await extra.api.get<Profile>('/profile');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('Error');
    }
  },
);
