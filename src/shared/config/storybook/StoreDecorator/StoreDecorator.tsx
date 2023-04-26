import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article';
import { addCommentFormReducer } from '@/features/AddCommentForm';
import { loginReducer } from '@/features/AuthByUserName';
import { profileReducer } from '@/features/EditableProfileCard';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage';
import { Reducers } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: Reducers = {
  login: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  articleDetailsPage: articleDetailsPageReducer,
  addCommentForm: addCommentFormReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: Reducers,
) => (StoryComponent: Story) => (
  <StoreProvider
    initialState={state}
    asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
  >
    <StoryComponent />
  </StoreProvider>
);
