import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify="center">
      <Text
        variant="error"
        title={t('error')}
        text={t('reload-page')}
        align="center"
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card
      padding="16"
      fullWidth
    >
      <VStack gap="32">
        <HStack justify="center">
          <Skeleton
            width={120}
            height={120}
            borderRadius="50%"
          />
        </HStack>
        <HStack gap="24">
          <VStack gap="16">
            <Skeleton
              width="100%"
              height={39}
              borderRadius="10px"
            />
            <Skeleton
              width="100%"
              height={39}
              borderRadius="10px"
            />
            <Skeleton
              width="100%"
              height={39}
              borderRadius="10px"
            />
            <Skeleton
              width="100%"
              height={39}
              borderRadius="10px"
            />
          </VStack>
          <VStack gap="16">
            <Skeleton
              width="100%"
              height={39}
              borderRadius="10px"
            />
            <Skeleton
              width="100%"
              height={39}
              borderRadius="10px"
            />
            <Skeleton
              width="100%"
              height={39}
              borderRadius="10px"
            />
            <Skeleton
              width="100%"
              height={39}
              borderRadius="10px"
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props;

  const { t } = useTranslation('profile');

  return (
    <Card
      className={classNames('', {}, [className])}
      padding="16"
      fullWidth
    >
      <VStack gap="32">
        {data?.avatar && (
          <HStack justify="center">
            <Avatar
              src={data?.avatar}
              alt="avatar"
              size={120}
            />
          </HStack>
        )}
        <HStack gap="24">
          <VStack gap="16">
            <Input
              value={data?.firstname}
              label={t('firstname')}
              placeholder={t('firstname')}
              readonly={readonly}
              width="80px"
              data-testid="ProfileCard.Firstname"
              onChange={onChangeFirstname}
            />
            <Input
              value={data?.lastname}
              label={t('lastname')}
              placeholder={t('lastname')}
              readonly={readonly}
              width="80px"
              data-testid="ProfileCard.Lastname"
              onChange={onChangeLastname}
            />
            <Input
              value={data?.age}
              label={t('age')}
              placeholder={t('age')}
              readonly={readonly}
              width="80px"
              data-testid="ProfileCard.Age"
              onChange={onChangeAge}
            />
            <Input
              value={data?.city}
              label={t('city')}
              placeholder={t('city')}
              readonly={readonly}
              width="80px"
              onChange={onChangeCity}
            />
          </VStack>
          <VStack gap="16">
            <Input
              value={data?.username}
              label={t('username')}
              placeholder={t('username')}
              readonly={readonly}
              width="80px"
              onChange={onChangeUsername}
            />
            <Input
              value={data?.avatar}
              label={t('avatar')}
              placeholder={t('avatar')}
              readonly={readonly}
              width="80px"
              onChange={onChangeAvatar}
            />
            <CurrencySelect
              value={data?.currency}
              readonly={readonly}
              onChange={onChangeCurrency}
            />
            <CountrySelect
              value={data?.country}
              readonly={readonly}
              onChange={onChangeCountry}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
