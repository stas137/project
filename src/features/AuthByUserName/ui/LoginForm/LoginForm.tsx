import { getLoginError } from 'features/AuthByUserName/model/selectors/getLoginError/getLoginError';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import {
  DynamicModuleLoader,
  Reducers,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../model/services/loginByUserName/loginByUserName';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  isOpen?: boolean;
}

const initialReducers: Reducers = {
  login: loginReducer,
};

const LoginForm = memo(({ className, isOpen }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(
    () => {
      // @ts-ignore
      dispatch(loginByUsername({ username, password }));
    },
    [dispatch, username, password],
  );

  return (
    <DynamicModuleLoader
      reducers={initialReducers}
      removeAfterUnmount
    >
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('form-auth')} />

        {
          error
          && (<Text text={`${error}: ${t('incorrect-credentials')}`} variant={TextVariant.ERROR} />)
        }

        <Input
          placeholder={t('username')}
          type="text"
          className={cls.input}
          autoFocus
          value={username}
          isShow={isOpen}
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
          variant={ButtonVariant.OUTLINE}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t('login')}
        </Button>
      </div>
    </DynamicModuleLoader>

  );
});

export default LoginForm;
