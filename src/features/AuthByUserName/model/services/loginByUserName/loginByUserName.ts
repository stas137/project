import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localstorage';

interface LoginByUserNameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUserNameProps,
  ThunkConfig<string>
  >(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
      const { extra, dispatch, rejectWithValue } = thunkAPI;

      try {
      // const response = await axios.post<User>('http://localhost:8000/login', authData);

        const response = await extra.api.post<User>('/login', authData);

        // extra.navigate('/about');

        if (!response.data) {
          throw new Error();
        }

        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response.data));
        dispatch(userActions.setAuthData(response.data));

        return response.data;
      } catch (e) {
        return rejectWithValue('Error');
      }
    },
  );
