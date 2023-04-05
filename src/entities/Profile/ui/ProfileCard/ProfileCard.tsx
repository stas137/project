import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextVariant } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Profile } from '../../model/types/ProfileSchema';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency?: Currency) => void;
  onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
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

  if (isLoading) {
    return (
      <HStack
        className={classNames(cls.ProfileCard, {}, [className])}
        justify="center"
        max
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack
        className={classNames(cls.ProfileCard, {}, [className])}
        justify="center"
        max
      >
        <Text
          variant={TextVariant.ERROR}
          title={t('error')}
          text={t('reload-page')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      className={classNames(cls.ProfileCard, mods, [className])}
      gap="16"
    >

      {data?.avatar && (
        <HStack
          justify="center"
        >
          <Avatar
            src={data?.avatar}
            alt="avatar"
          />
        </HStack>
      )}

      <Input
        className={cls.input}
        value={data?.firstname}
        placeholder={t('firstname')}
        readonly={readonly}
        onChange={onChangeFirstname}
      />
      <Input
        className={cls.input}
        value={data?.lastname}
        placeholder={t('lastname')}
        readonly={readonly}
        onChange={onChangeLastname}
      />
      <Input
        className={cls.input}
        value={data?.age}
        placeholder={t('age')}
        readonly={readonly}
        onChange={onChangeAge}
      />
      <Input
        className={cls.input}
        value={data?.city}
        placeholder={t('city')}
        readonly={readonly}
        onChange={onChangeCity}
      />
      <Input
        className={cls.input}
        value={data?.username}
        placeholder={t('username')}
        readonly={readonly}
        onChange={onChangeUsername}
      />
      <Input
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
