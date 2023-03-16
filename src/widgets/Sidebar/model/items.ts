import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/document.svg';
import ProfileIcon from 'shared/assets/icons/profile-24x24.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
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
  {
    path: RoutePath.profile,
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
];
