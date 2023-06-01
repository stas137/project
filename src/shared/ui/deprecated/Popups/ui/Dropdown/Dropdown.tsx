import { ReactNode, Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import { mapDirectonClass } from '../../styles/consts';
import { AppLink } from '../../../AppLink';

import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popup.module.scss';

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

/**
 * @deprecated
 */
export const Dropdown = (props: DropdownProps) => {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectonClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <Menu.Button
        as={Button}
        className={popupCls.trigger}
      >
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <Button
              className={classNames(popupCls.item, {
                [popupCls.active]: active,
              })}
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
                key={`dropdown-key-${index}`}
                className={cls.link}
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
              key={`dropdown-key-${index}`}
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
