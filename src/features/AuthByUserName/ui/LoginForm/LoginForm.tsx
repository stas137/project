import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  isOpen?: boolean;
}

export const LoginForm = ({ className, isOpen }: LoginFormProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        placeholder={t('username')}
        type="text"
        className={cls.input}
        autoFocus
        isShow={isOpen}
      />
      <Input
        placeholder={t('password')}
        type="text"
        className={cls.input}
      />
      <Button className={cls.loginBtn}>{t('login')}</Button>
    </div>
  );
};