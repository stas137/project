import { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';
import cls from './Tabs.module.scss';

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: TabItem<T>[];
  value: string;
  direction?: FlexDirection;
  onTabClick: (tab: TabItem<T>) => void;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { className, tabs, value, direction = 'row', onTabClick } = props;

  const clickHandle = useCallback(
    (tab: TabItem<T>) => () => onTabClick(tab),
    [onTabClick],
  );

  return (
    <Flex
      className={classNames(cls.Tabs, {}, [className])}
      direction={direction}
      align="start"
      gap="8"
    >
      {tabs.map((tab) => {
        const isSelected = value === tab.value;

        return (
          <Card
            className={classNames(cls.tab, { [cls.selected]: isSelected })}
            key={tab.value}
            variant={isSelected ? 'light' : 'normal'}
            onClick={clickHandle(tab)}
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
};
