import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';

import AvatarIcon from '../../assets/icons/avatar-default.svg';

import cls from './Avatar.module.scss';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  inverted?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    alt,
    size = 50,
    inverted = false,
  } = props;

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  const fallback = <Skeleton width={size} height={size} borderRadius="50%" />;
  const errorFallback = <Icon width={size} height={size} Svg={AvatarIcon} inverted={inverted} />;

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
