import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button/Button';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher';

import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSelector(getSidebarItems);

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
    <SidebarItem
      key={item.path}
      item={item}
      collapsed={collapsed}
    />
  )), [collapsed, sidebarItemsList]);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <VStack
        className={cls.items}
        gap="8"
        role="navigation"
      >
        {itemsList}
      </VStack>

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
    </aside>
  );
});
