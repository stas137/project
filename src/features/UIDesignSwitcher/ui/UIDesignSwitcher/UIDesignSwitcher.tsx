import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import { ListBox as ListBoxRedesigned } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { getUserAuthData } from '@/entities/User';
import { getFeatureFlags, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import cls from './UIDesignSwitcher.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UIDesignSwitcherProps {
  className?: string;
}

export const UIDesignSwitcher = memo((props: UIDesignSwitcherProps) => {
  const { className } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const authData = useSelector(getUserAuthData);

  const isAppRedesigned = getFeatureFlags('isAppRedesigned');

  const [isLoading, setIsLoading] = useState(false);

  const items = [
    {
      content: t('new'),
      value: 'new',
    },
    {
      content: t('old'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);

      await dispatch(
        updateFeatureFlags({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
        }),
      ).unwrap();

      setIsLoading(false);
    }
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <HStack>
          <TextRedesigned text={t('interface')} />
          {isLoading ? (
            <Skeleton
              width={100}
              height={40}
              borderRadius="10px"
            />
          ) : (
            <ListBoxRedesigned
              className={classNames(cls.UIDesignSwitcher, {}, [className])}
              value={isAppRedesigned ? 'new' : 'old'}
              items={items}
              onChange={onChange}
            />
          )}
        </HStack>
      }
      off={
        <HStack>
          <TextRedesigned text={t('interface')} />
          {isLoading ? (
            <Skeleton
              width={100}
              height={40}
              borderRadius="10px"
            />
          ) : (
            <ListBoxDeprecated
              className={classNames(cls.UIDesignSwitcher, {}, [className])}
              value={isAppRedesigned ? 'new' : 'old'}
              items={items}
              onChange={onChange}
            />
          )}
        </HStack>
      }
    />
  );
});
