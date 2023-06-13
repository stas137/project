import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import { useForceUpdate } from '@/shared/render/forceUpdate';

import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox as ListBoxRedesigned } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlags, updateFeatureFlags } from '@/shared/lib/features';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './UIDesignSwitcher.module.scss';

interface UIDesignSwitcherProps {
  className?: string;
}

export const UIDesignSwitcher = memo((props: UIDesignSwitcherProps) => {
  const { className } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const forceUpdate = useForceUpdate();

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

      forceUpdate();
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
