import { render } from '@testing-library/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nForTests from '../../i18n/i18nForTests';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export function ComponentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  const {
    route = '/',
    initialState,
    asyncReducers,
  } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider
        initialState={initialState}
        asyncReducers={asyncReducers}
      >
        <I18nextProvider i18n={i18nForTests}>
          {component}
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  );
}
