import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkVariant } from 'shared/ui/AppLink/AppLink';
import { HStack } from 'shared/ui/Stack';
import { NotificationButton } from 'features/NotificationButton';
import { AvatarDropdown } from 'features/AvatarDropdown';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          variant={TextVariant.INVERTED}
          title={t('TV Project')}
        />

        <AppLink
          className={cls.createBtn}
          to={RoutePath.article_create}
          variant={AppLinkVariant.SECONDARY}
        >
          {t('create-article')}
        </AppLink>

        <HStack
          className={cls.actions}
          gap="16"
          max={false}
        >
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        variant={ButtonVariant.CLEAR_INVERTED}
        onClick={onShowModal}
      >
        {t('login')}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </header>
  );
});
