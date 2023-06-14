import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { getUserInited, initAuthData } from '@/entities/User';

import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { AppRouter } from './providers/router';

import './styles/index.scss';

export const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const inited = useSelector(getUserInited);

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    // return (
    //   <div
    //     id="app"
    //     className={classNames('app_redesign', {}, [theme])}
    //   >
    //     <AppLoaderLayout />
    //   </div>
    // );

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div
            id="app"
            className={classNames('app_redesign', {}, [theme])}
          >
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div
          id="app"
          className={classNames('app_redesign', {}, [theme])}
        >
          <Suspense fallback="...">
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={<div>toolbar</div>}
            />
          </Suspense>
        </div>
      }
      off={
        <div
          id="app"
          className={classNames('app', {}, [theme])}
        >
          <Suspense fallback="...">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  );
};
