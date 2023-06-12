import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import {
  Button as ButtonDeprecated,
  ButtonVariant,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features/components/ToggleFeatures/ToggleFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slices/profileSlice';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = ({
  className,
}: EditableProfileCardHeaderProps) => {
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);

  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEditProfile());
  }, [dispatch]);

  const onSaveEdit = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          padding="16"
          fullWidth
        >
          <HStack
            className={classNames('', {}, [className])}
            justify="between"
          >
            <Text title={t('profile')} />

            {canEdit && (
              <div>
                {readonly ? (
                  <Button
                    variant="outline"
                    onClick={onEdit}
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    {t('edit')}
                  </Button>
                ) : (
                  <HStack gap="8">
                    <Button
                      variant="outline"
                      color="success"
                      onClick={onSaveEdit}
                      data-testid="EditableProfileCardHeader.SaveButton"
                    >
                      {t('save')}
                    </Button>
                    <Button
                      variant="outline"
                      color="error"
                      onClick={onCancelEdit}
                      data-testid="EditableProfileCardHeader.CancelButton"
                    >
                      {t('cancel')}
                    </Button>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        </Card>
      }
      off={
        <HStack
          className={classNames('', {}, [className])}
          justify="between"
          max
        >
          <TextDeprecated title={t('profile')} />

          {canEdit && (
            <div>
              {readonly ? (
                <ButtonDeprecated
                  variant={ButtonVariant.OUTLINE}
                  onClick={onEdit}
                  data-testid="EditableProfileCardHeader.EditButton"
                >
                  {t('edit')}
                </ButtonDeprecated>
              ) : (
                <HStack gap="8">
                  <ButtonDeprecated
                    variant={ButtonVariant.OUTLINE}
                    onClick={onSaveEdit}
                    data-testid="EditableProfileCardHeader.SaveButton"
                  >
                    {t('save')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    variant={ButtonVariant.OUTLINE_RED}
                    onClick={onCancelEdit}
                    data-testid="EditableProfileCardHeader.CancelButton"
                  >
                    {t('cancel')}
                  </ButtonDeprecated>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      }
    />
  );
};
