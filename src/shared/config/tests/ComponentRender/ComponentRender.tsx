import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Theme } from '@/shared/const/theme';
import i18nForTests from '../../i18n/i18nForTests';
// eslint-disable-next-line project-path-checker-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

// eslint-disable-next-line project-path-checker-plugin/layer-imports
import '@/app/styles/index.scss';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderProps {
  options?: componentRenderOptions,
  children: ReactNode;
}

export function TestProvider(props: TestProviderProps) {
  const { options = {}, children } = props;

  const {
    route = '/',
    initialState,
    asyncReducers,
    theme = Theme.LIGHT,
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider
        initialState={initialState}
        asyncReducers={asyncReducers}
      >
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
              {children}
            </div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export function ComponentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  return render(
    <TestProvider options={options}>
      {component}
    </TestProvider>,
  );
}
