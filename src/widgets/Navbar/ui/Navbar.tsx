import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        variant={ButtonVariant.CLEAR_INVERTED}
        onClick={onToggleModal}
      >
        {t('Login')}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem sdfjhsd;fjsdflgjdfljgdfjgdfgb dfgh ghfgjhhg ghj ghj ghj  ddddd dfddfgfdfghfghfghfg ddddddddd dfgjfd
      </Modal>
    </div>
  );
};
