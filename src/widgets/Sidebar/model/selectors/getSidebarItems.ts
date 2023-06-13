import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import { toggleFeatures } from '@/shared/lib/features';

import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';

import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/document.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/info.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';

import { SidebarItemType } from '../types/sidebar';

// export const getSidebarItems = createSelector(getUserAuthData, (userData) => {});

export const useSidebarItems = () => {
  const userData = useSelector(getUserAuthData);

  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      text: 'main',
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
    },
    {
      path: getRouteAbout(),
      text: 'about',
      Icon: AboutIcon,
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        text: 'profile',
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: 'articles',
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated,
        }),
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
};
