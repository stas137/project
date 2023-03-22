import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/document.svg';
import ProfileIcon from 'shared/assets/icons/profile-24x24.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: RoutePath.main,
        text: 'main',
        Icon: MainIcon,
      },
      {
        path: RoutePath.about,
        text: 'about',
        Icon: AboutIcon,
      },

    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: RoutePath.profile + userData.id,
          text: 'profile',
          Icon: ProfileIcon,
          authOnly: true,
        },
        {
          path: RoutePath.articles,
          text: 'articles',
          Icon: MainIcon,
          authOnly: true,
        },
      );
    }

    return sidebarItemsList;
  },
);
