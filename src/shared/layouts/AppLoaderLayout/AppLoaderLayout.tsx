import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { MainLayout } from '../MainLayout';

import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => {
  const { t } = useTranslation();

  return (
    <MainLayout
      header={
        <HStack className={cls.header}>
          <Skeleton
            width="70%"
            height="40px"
            borderRadius="12px"
          />
        </HStack>
      }
      content={
        <VStack
          gap="16"
          style={{ height: '100%' }}
        >
          <Skeleton
            width="70%"
            height={32}
            borderRadius="12px"
          />
          <Skeleton
            width="70%"
            height={20}
            borderRadius="12px"
          />
          <Skeleton
            width="70%"
            height={20}
            borderRadius="12px"
          />
          <Skeleton
            width="70%"
            height={32}
            borderRadius="12px"
          />
          <Skeleton
            width="70%"
            height="40%"
            borderRadius="12px"
          />
          <Skeleton
            width="70%"
            height="40%"
            borderRadius="12px"
          />
        </VStack>
      }
      sidebar={
        <Skeleton
          width={220}
          height="100%"
          borderRadius="16px"
        />
      }
    />
  );
});
