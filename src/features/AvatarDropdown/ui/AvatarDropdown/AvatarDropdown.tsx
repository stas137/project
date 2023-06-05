import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

// import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return (
      <AvatarDeprecated
        size={30}
        src=""
        inverted
      />
    );
    // return null;
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t('admin-panel'),
            href: getRouteAdminPanel(),
          },
        ]
      : []),
    {
      content: t('profile'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('logout'),
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      items={items}
      trigger={
        <Avatar
          size={38}
          src={authData.avatar}
        />
      }
      direction="bottom left"
    />
  );
});
