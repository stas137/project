import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  Button as ButtonDeprecated,
  ButtonVariant,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  Reducers,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAddCommentFormData,
  getAddCommentFormError,
} from '../../model/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (value: string) => void;
}

const initialReducer: Reducers = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;

  const { t } = useTranslation();

  const text = useSelector(getAddCommentFormData);
  const error = useSelector(getAddCommentFormError);

  const dispatch = useAppDispatch();

  const onCommentChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.updateAddCommentForm(value));
    },
    [dispatch],
  );

  const onSendCommentHandler = useCallback(() => {
    onSendComment(text);
    onCommentChange('');
  }, [onCommentChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={initialReducer}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card fullWidth>
            <HStack
              data-testid="AddCommentForm"
              className={classNames(cls.AddCommentFormRedesigned, {}, [
                className,
              ])}
              justify="between"
              gap="8"
            >
              <Input
                data-testid="AddCommentForm.Input"
                className={cls.input}
                placeholder={t('input-comment')}
                value={text}
                onChange={onCommentChange}
              />
              <Button
                data-testid="AddCommentForm.Button"
                variant="outline"
                onClick={onSendCommentHandler}
              >
                {t('send')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            data-testid="AddCommentForm"
            className={classNames(cls.AddCommentForm, {}, [className])}
            justify="between"
          >
            <InputDeprecated
              data-testid="AddCommentForm.Input"
              className={cls.input}
              placeholder={t('input-comment')}
              value={text}
              onChange={onCommentChange}
            />
            <ButtonDeprecated
              data-testid="AddCommentForm.Button"
              variant={ButtonVariant.OUTLINE}
              onClick={onSendCommentHandler}
            >
              {t('send')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
