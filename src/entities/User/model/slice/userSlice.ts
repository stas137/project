import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { setFeatureFlags } from '@/shared/lib/features';

import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  LOCAL_STORAGE_USER_KEY,
} from '@/shared/const/localstorage';

import { initAuthData } from '../services/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { User, UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;

      if (action.payload.features) {
        setFeatureFlags(action.payload.features);
      }

      localStorage.setItem(LOCAL_STORAGE_USER_KEY, action.payload.id);
      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        action.payload?.features?.isAppRedesigned ? 'new' : 'old',
      );
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        saveJsonSettings.fulfilled,
        (state, action: PayloadAction<JsonSettings>) => {
          if (state.authData) {
            state.authData.jsonSettings = action.payload;
          }
        },
      )
      .addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
        state.authData = action.payload;
        setFeatureFlags(action.payload.features);
        state._inited = true;
      })
      .addCase(initAuthData.rejected, (state) => {
        state._inited = true;
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
