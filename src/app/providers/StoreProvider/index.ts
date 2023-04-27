import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';

import type { AppDispatch } from './config/store';
import type {
  StateSchema,
  StateSchemaKey,
  ReduxStoreWithManager,
  ThunkConfig,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
};

export type {
  StateSchema,
  StateSchemaKey,
  ReduxStoreWithManager,
  AppDispatch,
  ThunkConfig,
};
