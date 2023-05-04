import {
  ImgHTMLAttributes, ReactElement, memo, useLayoutEffect, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

// import cls from './AppImage.module.scss';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src?: string;
  alt?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    fallback,
    errorFallback,
    src,
    alt = 'image-alt',
    ...otherProps
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? '';

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return (
    <img className={classNames('', {}, [className])} src={src} alt={alt} {...otherProps} />
  );
});
