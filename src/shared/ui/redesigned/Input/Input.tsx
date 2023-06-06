import React, {
  InputHTMLAttributes,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
  className?: string;
  label?: string;
  value?: string | number;
  type?: string;
  placeholder?: string;
  autofocus?: boolean;
  readonly?: boolean;
  size?: InputSize;
  width?: string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    label,
    value,
    type = 'text',
    placeholder = '',
    autoFocus = false,
    readonly,
    size = 'm',
    width,
    addonLeft,
    addonRight,
    onChange,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  };

  const input = (
    <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}

      <input
        className={cls.input}
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChangeHandler}
        {...otherProps}
      />

      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </div>
  );

  if (label) {
    return (
      <HStack gap="8">
        <Text
          text={label}
          width={width}
        />
        {input}
      </HStack>
    );
  }

  return input;
});
