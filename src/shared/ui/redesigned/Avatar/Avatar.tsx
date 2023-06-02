import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import AvatarIcon from '../../../assets/icons/profile.svg';

import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size = 50 } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  const fallback = (
    <Skeleton
      width={size}
      height={size}
      borderRadius="50%"
    />
  );
  const errorFallback = (
    <Icon
      width={size}
      height={size}
      Svg={AvatarIcon}
    />
  );

  return (
    <AppImage
      className={classNames(cls.Avatar, {}, [className])}
      style={styles}
      src={src}
      alt={alt}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  );
};
