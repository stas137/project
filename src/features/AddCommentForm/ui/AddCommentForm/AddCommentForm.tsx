import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonVariant } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';
import {
  DynamicModuleLoader,
  Reducers,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/deprecated/Stack';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
  getAddCommentFormData,
  getAddCommentFormError,
} from '../../model/selectors/addCommentFormSelectors';

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
      <HStack
        data-testid="AddCommentForm"
        className={classNames(cls.AddCommentForm, {}, [className])}
        justify="between"
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
          variant={ButtonVariant.OUTLINE}
          onClick={onSendCommentHandler}
        >
          {t('send')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
