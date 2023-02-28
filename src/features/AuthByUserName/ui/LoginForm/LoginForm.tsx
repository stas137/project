import { getLoginState } from 'features/AuthByUserName/model/selectors/getLoginState/getLoginState';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUserName/loginByUserName';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  isOpen?: boolean;
}

export const LoginForm = memo(({ className, isOpen }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState);

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
  );
});
