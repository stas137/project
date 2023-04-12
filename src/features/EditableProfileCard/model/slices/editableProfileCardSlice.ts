import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditableProfileCardSchema } from '../types/EditableProfileCardSchema';

const initialState: EditableProfileCardSchema = {};

export const editableProfileCardSlice = createSlice({
  name: 'editableProfileCard',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {

    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(template.pending, (state) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(template.fulfilled, (state, action: PayloadAction<string>) => {
  //       state.isLoading = false;
  //       state.username = action.payload.username;
  //     })
  //     .addCase(template.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { actions: editableProfileCardActions } = editableProfileCardSlice;
export const { reducer: editableProfileCardReducer } = editableProfileCardSlice;
