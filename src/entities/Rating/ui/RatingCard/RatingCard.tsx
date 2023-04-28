import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { StarRating } from '@/shared/ui/StarRating';

import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

// import cls from './RatingCard.module.scss';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  rate?: number;
  onAccept?: (starsCount: number, feedback?: string) => void;
  onCancel?: (starsCount: number) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    rate = 0,
    onAccept,
    onCancel,
  } = props;

  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback((count: number) => {
    setStarsCount(count);

    if (hasFeedback) {
      setIsModalOpen(true);
    } else {
      onAccept?.(count);
    }
  }, [hasFeedback, onAccept]);

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        placeholder="Your feedback"
        value={feedback}
        onChange={setFeedback}
      />
    </>
  );

  return (
    <Card
      className={classNames('', {}, [className])}
      fullWidth
    >
      <VStack align="center" gap="8">
        <Text title={starsCount ? t('thanks') : title} />
        <StarRating
          size={35}
          selectedStars={starsCount}
          onSelect={onSelectStars}
        />
      </VStack>
      {
        isModalOpen && (
          <>
            <BrowserView>
              <Modal
                isOpen={isModalOpen}
                lazy
                onClose={cancelHandler}
              >
                <VStack gap="16">
                  {modalContent}
                  <HStack justify="end">
                    <Button
                      onClick={acceptHandler}
                    >
                      {t('send')}
                    </Button>
                    <Button
                      variant={ButtonVariant.OUTLINE_RED}
                      onClick={cancelHandler}
                    >
                      {t('cancel')}
                    </Button>
                  </HStack>
                </VStack>
              </Modal>
            </BrowserView>
            <MobileView>
              <Drawer
                isOpen={isModalOpen}
                onClose={cancelHandler}
                lazy
              >
                <VStack gap="16">
                  {modalContent}
                  <Button
                    onClick={acceptHandler}
                    fullWidth
                  >
                    {t('send')}
                  </Button>
                </VStack>
              </Drawer>
            </MobileView>
          </>
        )
      }
    </Card>
  );
});
