import {
  memo, ReactNode, Fragment,
} from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../Stack';
import { mapDirectonClass } from '../../styles/consts';

import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  className?: string;
  items?: ListBoxItem[];
  value?: string;
  defaultValue?: string;
  label?: string;
  readonly?: boolean;
  direction?: DropdownDirection;
  onChange: (value: string) => void;
}

export const ListBox = memo((props: ListBoxProps) => {
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

  return (
    <HStack>
      {
        label
        && (
          <span className={classNames('', { [cls.readonly]: readonly })}>
            {`${label}>`}
          </span>
        )
      }

      <HListBox
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        as="div"
        value={value}
        disabled={readonly}
        onChange={onChange}
      >

        <HListBox.Button
          className={cls.trigger}
        >
          {value || defaultValue}
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
              {({ active, selected, disabled }) => (
                <li
                  className={
                    classNames(popupCls.item, {
                      [popupCls.active]: active,
                      [popupCls.disabled]: disabled,
                    })
                  }
                >
                  {selected && '!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
});
