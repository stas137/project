import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useForceUpdate } from '@/shared/render/forceUpdate';

import {
  Button as ButtonDeprecated,
  ButtonVariant,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
  Text as TextDeprecated,
  TextVariant,
} from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  Reducers,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUserName/loginByUserName';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: Reducers = {
  login: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const forceUpdate = useForceUpdate();

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <VStack
            className={classNames(cls.LoginForm, {}, [className])}
            gap="8"
          >
            <Text title={t('form-auth')} />

            {error && (
              <Text
                text={`${error}: ${t('incorrect-credentials')}`}
                variant="error"
              />
            )}

            <Input
              placeholder={t('username')}
              type="text"
              className={cls.input}
              autoFocus
              value={username}
              onChange={onChangeUsername}
            />
            <Input
              placeholder={t('password')}
              type="text"
              className={cls.input}
              value={password}
              onChange={onChangePassword}
            />
            <Button
              className={cls.loginBtn}
              variant="outline"
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('login')}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t('form-auth')} />

            {error && (
              <TextDeprecated
                text={`${error}: ${t('incorrect-credentials')}`}
                variant={TextVariant.ERROR}
              />
            )}

            <InputDeprecated
              placeholder={t('username')}
              type="text"
              className={cls.input}
              autoFocus
              value={username}
              onChange={onChangeUsername}
            />
            <InputDeprecated
              placeholder={t('password')}
              type="text"
              className={cls.input}
              value={password}
              onChange={onChangePassword}
            />
            <ButtonDeprecated
              className={cls.loginBtn}
              variant={ButtonVariant.OUTLINE}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('login')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
