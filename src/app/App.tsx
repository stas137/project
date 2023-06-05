import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { PageLoader } from '@/widgets/PageLoader';
import { MainLayout } from '@/shared/layouts/MainLayout';

import './styles/index.scss';

export const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

  return (
    <div className={classNames('app_redesign', {}, [theme])}>
      <Suspense fallback="...">
        <MainLayout
          header={<Navbar />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
          toolbar={<div>toolbar</div>}
        />
      </Suspense>
    </div>
  );
};
