import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import StarIcon from '@/shared/assets/icons/star.svg';

import { Icon as IconDeprecated } from '../../deprecated/Icon/Icon';
import { Icon } from '../Icon';
import { HStack } from '../Stack';

import cls from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  size?: number;
  selectedStars?: number;
  onSelect?: (starsCount: number) => void;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const { className, size = 30, selectedStars = 0, onSelect } = props;

  const { t } = useTranslation();

  const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <HStack
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls.StarRatingRedesigned,
          off: () => cls.StarRating,
        }),
        {},
        [className],
      )}
      justify="center"
    >
      {stars.map((starNumber) => {
        const commonProps = {
          key: starNumber,
          'data-testid': `StarRating.${starNumber}`,
          'data-selected': currentStarCount >= starNumber,
          className: classNames(
            cls.starIcon,
            {
              [cls.selected]: isSelected,
              [cls.hovered]: currentStarCount >= starNumber,
              [cls.normal]: currentStarCount < starNumber,
            },
            [],
          ),

          Svg: StarIcon,
          width: size,
          height: size,
          onMouseEnter: onHover(starNumber),
          onMouseLeave: onLeave,
          onClick: onClick(starNumber),
        };

        return (
          <ToggleFeatures
            key={`ToggleFeatureStarNumber-${starNumber}`}
            feature="isAppRedesigned"
            on={
              <Icon
                clickable={!isSelected}
                {...commonProps}
              />
            }
            off={<IconDeprecated {...commonProps} />}
          />
        );
      })}
    </HStack>
  );
});
