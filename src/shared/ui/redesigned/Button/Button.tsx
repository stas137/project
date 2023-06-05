import { ButtonHTMLAttributes, forwardRef } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant = 'filled',
      square,
      size = 'm',
      disabled,
      fullWidth = false,
      type = 'button',
      ...otherProps
    } = props;

    const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled,
      [cls.fullWidth]: fullWidth,
    };

    return (
      <button
        className={classNames(cls.Button, mods, [
          className,
          cls[variant],
          cls[size],
        ])}
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
