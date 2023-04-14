import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';

import type { AppDispatch } from './config/store';
import type {
  StateSchema,
  ReduxStoreWithManager,
  ThunkConfig,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
};

export type {
  StateSchema,
  ReduxStoreWithManager,
  AppDispatch,
  ThunkConfig,
};
