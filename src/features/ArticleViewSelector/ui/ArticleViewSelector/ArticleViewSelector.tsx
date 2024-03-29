import { memo } from 'react';

import { ArticleView } from '@/entities/Article';

import {
  Button as ButtonDeprecated,
  ButtonVariant,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import ListIcon from '@/shared/assets/icons/burger.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TileIcon from '@/shared/assets/icons/tile.svg';
import TileIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onChangeView: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.TILE,
    Icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TileIcon,
      off: () => TileIconDeprecated,
    }),
  },
  {
    view: ArticleView.LIST,
    Icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onChangeView } = props;

  const onClick = (newView: ArticleView) => () => {
    onChangeView(newView);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
            className,
          ])}
        >
          <HStack>
            {viewTypes.map((viewType) => (
              <Icon
                className={
                  viewType.view === view ? cls.selected : cls.notSelected
                }
                Svg={viewType.Icon}
                clickable
                onClick={onClick(viewType.view)}
                key={viewType.view}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              variant={ButtonVariant.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <IconDeprecated
                className={
                  viewType.view === view ? cls.selected : cls.notSelected
                }
                Svg={viewType.Icon}
                width={24}
                height={24}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
});
