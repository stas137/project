import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { profileActions } from '../../model/slices/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
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
    <HStack
      className={classNames('', {}, [className])}
      justify="between"
      max
    >
      <Text title={t('profile')} />

      {canEdit && (
        <div>
          {
            readonly ? (
              <Button
                variant={ButtonVariant.OUTLINE}
                onClick={onEdit}
              >
                {t('edit')}
              </Button>
            ) : (
              <HStack gap="8">
                <Button
                  variant={ButtonVariant.OUTLINE}
                  onClick={onSaveEdit}
                >
                  {t('save')}
                </Button>
                <Button
                  variant={ButtonVariant.OUTLINE_RED}
                  onClick={onCancelEdit}
                >
                  {t('cancel')}
                </Button>
              </HStack>
            )
          }
        </div>
      )}
    </HStack>
  );
};
