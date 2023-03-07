import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Profile.module.scss';

interface ProfileProps {
  className?: string;
}

export const Profile = ({ className }: ProfileProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Profile, {}, [className])} />
  );
};
