import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import ListIcon from 'shared/assets/icons/list.svg';
import TileIcon from 'shared/assets/icons/tile.svg';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.LIST,
    Icon: ListIcon,
  },
  {
    view: ArticleView.TILE,
    Icon: TileIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const {
    className,
    view,
    onViewClick,
  } = props;

  const { t } = useTranslation();

  const onClick = (newView: ArticleView) => () => {
    onViewClick(newView);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          variant={ButtonVariant.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            className={viewType.view === view ? cls.selected : cls.notSelected}
            Svg={viewType.Icon}
          />
        </Button>
      ))}
    </div>
  );
});
