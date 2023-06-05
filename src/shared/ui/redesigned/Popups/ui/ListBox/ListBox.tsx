import { ReactNode, Fragment, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../redesigned/Stack';
import { mapDirectonClass } from '../../styles/consts';

import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { Button } from '../../../Button';

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  items?: ListBoxItem<T>[];
  value?: T;
  defaultValue?: string;
  label?: string;
  readonly?: boolean;
  direction?: DropdownDirection;
  onChange: (value: T) => void;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
  const {
    className,
    items,
    value,
    defaultValue,
    label,
    readonly,
    direction = 'bottom right',
    onChange,
  } = props;

  const optionsClasses = [mapDirectonClass[direction]];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

  return (
    <HStack>
      {label && (
        <span
          className={classNames('', { [cls.readonly]: readonly })}
        >{`${label}>`}</span>
      )}

      <HListBox
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        as="div"
        value={value}
        disabled={readonly}
        onChange={onChange}
      >
        <HListBox.Button
          className={cls.trigger}
          as={Button}
        >
          {selectedItem?.content || defaultValue}
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(popupCls.item, {
                    [popupCls.active]: active,
                    [popupCls.selected]: selected,
                    [popupCls.disabled]: item.disabled,
                  })}
                >
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
