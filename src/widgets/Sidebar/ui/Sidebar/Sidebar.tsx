import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button';
import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/document.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={cls.items}>

        <AppLink
          to={RoutePath.main}
          className={cls.item}
          theme={AppLinkTheme.SECONDARY}
        >
          <MainIcon className={cls.icon} />
          <span className={cls.link}>
            {t('main')}
          </span>
        </AppLink>

        <AppLink
          to={RoutePath.about}
          theme={AppLinkTheme.SECONDARY}
          className={cls.item}
        >
          <AboutIcon className={cls.icon} />
          <span className={cls.link}>
            {t('about')}
          </span>
        </AppLink>

      </div>

      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapsedBtn}
        variant={ButtonVariant.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher className={cls.lang} short={collapsed} />
      </div>
    </div>
  );
};
