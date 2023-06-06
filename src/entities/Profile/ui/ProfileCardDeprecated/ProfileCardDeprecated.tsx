import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
  Text as TextDeprecated,
  TextAlign,
  TextVariant,
} from '@/shared/ui/deprecated/Text';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import cls from './ProfileCardDeprecated.module.scss';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      className={classNames('', {})}
      justify="center"
    >
      <TextDeprecated
        variant={TextVariant.ERROR}
        title={t('error')}
        text={t('reload-page')}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack
      className={classNames('', {})}
      justify="center"
    >
      <Loader />
    </HStack>
  );
};

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
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

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      className={classNames(cls.ProfileCard, mods, [className])}
      gap="16"
    >
      {data?.avatar && (
        <HStack justify="center">
          <AvatarDeprecated
            src={data?.avatar}
            alt="avatar"
          />
        </HStack>
      )}

      <InputDeprecated
        className={cls.input}
        value={data?.firstname}
        placeholder={t('firstname')}
        readonly={readonly}
        onChange={onChangeFirstname}
        data-testid="ProfileCard.Firstname"
      />
      <InputDeprecated
        className={cls.input}
        value={data?.lastname}
        placeholder={t('lastname')}
        readonly={readonly}
        onChange={onChangeLastname}
        data-testid="ProfileCard.Lastname"
      />
      <InputDeprecated
        className={cls.input}
        value={data?.age}
        placeholder={t('age')}
        readonly={readonly}
        onChange={onChangeAge}
        data-testid="ProfileCard.Age"
      />
      <InputDeprecated
        className={cls.input}
        value={data?.city}
        placeholder={t('city')}
        readonly={readonly}
        onChange={onChangeCity}
      />
      <InputDeprecated
        className={cls.input}
        value={data?.username}
        placeholder={t('username')}
        readonly={readonly}
        onChange={onChangeUsername}
      />
      <InputDeprecated
        className={cls.input}
        value={data?.avatar}
        placeholder={t('avatar')}
        readonly={readonly}
        onChange={onChangeAvatar}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        readonly={readonly}
        onChange={onChangeCurrency}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        readonly={readonly}
        onChange={onChangeCountry}
      />
    </VStack>
  );
};
