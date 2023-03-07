import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/ProfileSchema';

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,

};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // setAuthData: (state, action: PayloadAction<User>) => {
    //   state.authData = action.payload;
    // },
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
