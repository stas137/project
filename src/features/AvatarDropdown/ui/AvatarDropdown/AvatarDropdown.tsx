import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';

import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';

// import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const {
    className,
  } = props;

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
    return null;
  }

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      items={[
        ...(isAdminPanelAvailable ? [{
          content: t('admin-panel'),
          href: getRouteAdminPanel(),
        }] : []),
        {
          content: t('profile'),
          href: getRouteProfile(authData.id),
        },
        {
          content: t('logout'),
          onClick: onLogout,
        },
      ]}
      trigger={
        <Avatar size={30} src={authData.avatar} inverted />
      }
      direction="bottom left"
    />
  );
});
