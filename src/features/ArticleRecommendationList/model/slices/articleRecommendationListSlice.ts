import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleRecommendationListSchema } from '../types/ArticleRecommendationListSchema';

const initialState: ArticleRecommendationListSchema = {
  
};

export const articleRecommendationListSlice = createSlice({
  name: 'articleRecommendationList',
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

export const { actions: articleRecommendationListActions } = articleRecommendationListSlice;
export const { reducer: articleRecommendationListReducer } = articleRecommendationListSlice;
