import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Country } from '../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  readonly?: boolean;
  onChange?: (value: Country) => void;
}

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, readonly, onChange } = props;

  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  const listProps = {
    className: classNames('', {}, [className]),
    value,
    defaultValue: t('Choose country'),
    label: t('country'),
    items: options,
    readonly,
    direction: 'top right' as const,
    onChange: onChangeHandler,
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ListBox<Country> {...listProps} />}
      off={<ListBoxDeprecated {...listProps} />}
    />
  );
});
