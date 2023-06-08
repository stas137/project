import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { isArticlePageWasOpened } = useJsonSettings();

  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
    }
  }, [dispatch, isArticlePageWasOpened]);

  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t('hello')}
      text={t('yo yo')}
    />
  );

  if (isMobile) {
    return (
      <Drawer
        lazy
        isOpen={isOpen}
        onClose={onClose}
      >
        {text}
      </Drawer>
    );
  }

  return (
    <Modal
      lazy
      isOpen={isOpen}
      onClose={onClose}
    >
      {text}
    </Modal>
  );
});
