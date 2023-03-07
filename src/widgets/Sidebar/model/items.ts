import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/document.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGElement>>;
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
    Icon: MainIcon,
  },
];
