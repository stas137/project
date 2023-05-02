import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/document.svg';
import ProfileIcon from '@/shared/assets/icons/profile-24x24.svg';
import { SidebarItemType } from '../types/sidebar';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
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
          Icon: MainIcon,
          authOnly: true,
        },
      );
    }

    return sidebarItemsList;
  },
);
