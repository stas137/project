import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

import CopyIconDeprecated from '@/shared/assets/icons/copy-20-20.svg';
import CopyIcon from '@/shared/assets/icons/copy.svg';

import { Button } from '../Button/Button';
import { Icon } from '../Icon';

import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const { t } = useTranslation('article');

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
          <Icon
            className={cls.copyBtn}
            Svg={CopyIcon}
            clickable
            onClick={onCopy}
          />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(cls.Code, {}, [className])}>
          <Button
            className={cls.copyBtn}
            variant="clear"
            onClick={onCopy}
          >
            <CopyIconDeprecated className={cls.copyIcon} />
          </Button>
          <code>{text}</code>
        </pre>
      }
    />
  );
});
