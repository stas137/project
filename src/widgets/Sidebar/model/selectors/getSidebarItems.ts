import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import { SidebarItemType } from '../types/sidebar';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';

import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/info.svg';
import ArticleIcon from '@/shared/assets/icons/avatar.svg';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      text: 'main',
      Icon: MainIcon,
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
        Icon: ArticleIcon,
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
});
