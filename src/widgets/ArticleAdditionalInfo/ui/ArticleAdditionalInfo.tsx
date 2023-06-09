import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleEditButton } from '@/features/ArticleEditButton';

import { User } from '@/entities/User';

import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleAdditionalInfo.module.scss';

interface ArticleAdditionalnfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
}

export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalnfoProps) => {
    const { className, author, createdAt, views } = props;

    const { t } = useTranslation();

    return (
      <VStack
        className={classNames(cls.ArticleAdditionalnfo, {}, [className])}
        gap="24"
      >
        <HStack gap="8">
          <Avatar
            src={author.avatar}
            size={32}
          />
          <Text
            text={author.username}
            bold
          />
          <Text text={createdAt} />
        </HStack>
        <ArticleEditButton />
        <Text text={t('{{count}} views', { count: views })} />
      </VStack>
    );
  },
);
