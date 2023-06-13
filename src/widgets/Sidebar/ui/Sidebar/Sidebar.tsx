import { memo, useMemo, useState } from 'react';

import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { classNames } from '@/shared/lib/classNames/classNames';

import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from './SidebarItem/SidebarItem';

import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSidebarItems(); // useSelector(getSidebarItems);

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem
          key={item.path}
          item={item}
          collapsed={collapsed}
        />
      )),
    [collapsed, sidebarItemsList],
  );

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.SidebarRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [className],
      )}
    >
      <AppLogo
        className={cls.appLogo}
        size={collapsed ? 30 : 75}
      />
      <VStack
        className={cls.items}
        gap="8"
        role="navigation"
      >
        {itemsList}
      </VStack>
      <Icon
        className={cls.collapsedBtn}
        data-testid="icon-toggle"
        clickable
        Svg={ArrowIcon}
        onClick={onToggle}
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher
          className={cls.lang}
          short={collapsed}
        />
      </div>
    </aside>
  );
});
