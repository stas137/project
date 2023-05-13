import { ButtonHTMLAttributes, forwardRef } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonVariant {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  // children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant = ButtonVariant.OUTLINE,
      square,
      size = ButtonSize.M,
      disabled,
      fullWidth = false,
      type = 'button',
      ...otherProps
    } = props;

    const mods: Mods = {
      [cls.square]: square,
      [cls[size]]: true,
      [cls.disabled]: disabled,
      [cls.fullWidth]: fullWidth,
    };

    return (
      <button
        className={classNames(cls.Button, mods, [className, cls[variant]])}
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={disabled}
        {...otherProps}
      >
        {children}
      </button>
    );
  },
);
