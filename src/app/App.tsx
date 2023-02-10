import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'shared/contexts/ThemeProvider/lib/useTheme';

import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar/ui';
import { AppRouter } from './providers/router';

import './styles/index.scss';

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="Loading language">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};
