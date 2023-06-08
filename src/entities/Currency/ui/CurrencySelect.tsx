import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../model/types/currency';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  readonly?: boolean;
  onChange?: (value: Currency) => void;
}

const options = [
  { value: Currency.USD, content: Currency.USD, disabled: true },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.RUB, content: Currency.RUB },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, readonly, onChange } = props;

  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  const listProps = {
    className: classNames('', {}, [className]),
    value,
    defaultValue: t('Choose currency'),
    label: t('currency'),
    items: options,
    readonly,
    direction: 'top right' as const,
    onChange: onChangeHandler,
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ListBox<Currency> {...listProps} />}
      off={<ListBoxDeprecated {...listProps} />}
    />
  );
});
