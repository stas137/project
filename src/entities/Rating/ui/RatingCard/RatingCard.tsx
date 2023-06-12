import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import {
  Button as ButtonDeprecated,
  ButtonVariant,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';

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

  const onSelectStars = useCallback(
    (count: number) => {
      setStarsCount(count);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(count);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid="RatingCard.Feedback"
            placeholder="Your feedback"
            value={feedback}
            onChange={setFeedback}
          />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testid="RatingCard.Feedback"
            placeholder="Your feedback"
            value={feedback}
            onChange={setFeedback}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack
        align="center"
        gap="8"
      >
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text title={starsCount ? t('thanks') : title} />}
          off={<TextDeprecated title={starsCount ? t('thanks') : title} />}
        />

        <StarRating
          size={35}
          selectedStars={starsCount}
          onSelect={onSelectStars}
        />
      </VStack>
      {isModalOpen && (
        <>
          <BrowserView>
            <Modal
              isOpen={isModalOpen}
              lazy
              onClose={cancelHandler}
            >
              <VStack gap="16">
                {modalContent}

                <ToggleFeatures
                  feature="isAppRedesigned"
                  on={
                    <HStack justify="end">
                      <Button
                        data-testid="RatingCard.Send"
                        onClick={acceptHandler}
                      >
                        {t('send')}
                      </Button>
                      <Button
                        data-testid="RatingCard.Close"
                        onClick={cancelHandler}
                      >
                        {t('cancel')}
                      </Button>
                    </HStack>
                  }
                  off={
                    <HStack justify="end">
                      <ButtonDeprecated
                        data-testid="RatingCard.Send"
                        onClick={acceptHandler}
                      >
                        {t('send')}
                      </ButtonDeprecated>
                      <ButtonDeprecated
                        data-testid="RatingCard.Close"
                        variant={ButtonVariant.OUTLINE_RED}
                        onClick={cancelHandler}
                      >
                        {t('cancel')}
                      </ButtonDeprecated>
                    </HStack>
                  }
                />
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

                <ToggleFeatures
                  feature="isAppRedesigned"
                  on={
                    <Button
                      onClick={acceptHandler}
                      fullWidth
                      size="l"
                    >
                      {t('send')}
                    </Button>
                  }
                  off={
                    <ButtonDeprecated
                      onClick={acceptHandler}
                      fullWidth
                    >
                      {t('send')}
                    </ButtonDeprecated>
                  }
                />
              </VStack>
            </Drawer>
          </MobileView>
        </>
      )}
    </>
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          className={classNames('', {}, [className])}
          data-testid="RatingCard"
          padding="16"
          fullWidth
        >
          {content}
        </Card>
      }
      off={
        <CardDeprecated
          data-testid="RatingCard"
          className={classNames('', {}, [className])}
          fullWidth
        >
          {content}
        </CardDeprecated>
      }
    />
  );
});
