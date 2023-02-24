import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar/ui';
import { AppRouter } from './providers/router';

import './styles/index.scss';

export const App = () => (
  <div className={classNames('app', {})}>
    <Suspense fallback="Loading language">
      <Navbar />
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </Suspense>
  </div>
);
