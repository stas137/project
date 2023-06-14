import { ReactElement } from 'react';

import { ScrollToolbar } from '@/widgets/ScrollToolbar';

import { useRouteChange } from '@/shared/lib/router/useRouteChange';

import { AppRoutes } from '@/shared/const/router';

export function useAppToolbar() {
  const appRoute = useRouteChange();

  const togglebarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    [AppRoutes.MAIN]: <div>MAIN</div>,
    [AppRoutes.ABOUT]: <div>ABOUT</div>,
  };

  return togglebarByAppRoute[appRoute];
}
