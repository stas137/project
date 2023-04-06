import { ReactNode, Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import cls from './Dropdown.module.scss';
import { Button } from '../Button/Button';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  href?: string;
  onClick?: () => void;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

const mapDirectonClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight,
};

export const Dropdown = (props: DropdownProps) => {
  const {
    className,
    items,
    trigger,
    direction = 'bottom right',
  } = props;

  const menuClasses = [mapDirectonClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className])}
    >
      <Menu.Button
        className={cls.btn}
      >
        {trigger}
      </Menu.Button>
      <Menu.Items
        className={classNames(cls.menu, {}, menuClasses)}
      >
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <Button
              className={classNames(cls.item, { [cls.active]: active })}
              disabled={item.disabled}
              onClick={item.onClick}
              // href="/account-settings"
            >
              {item.content}
            </Button>
          );

          if (item.href) {
            return (
              <Menu.Item
              // key={item.content}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item
            // key={item.content}
              as={Fragment}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
