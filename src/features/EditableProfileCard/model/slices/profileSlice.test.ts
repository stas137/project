import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Profile } from 'entities/Profile';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/EditableProfileCardSchema';
import { profileReducer, profileActions } from './profileSlice';
import { ValidateProfileError } from '../consts/consts';

const data = {
  firstname: 'Ivan',
  lastname: 'Ivanov',
  age: 32,
  city: 'Moscow',
  username: 'admin',
  avatar: '',
  currency: Currency.EUR,
  country: Country.Russia,
};

const form = { firstname: '123' };

describe('profileSlice.test', () => {
  it('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: true };

    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(false)))
      .toEqual({ readonly: false });
  });

  it('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form };

    expect(profileReducer(state as ProfileSchema, profileActions.cancelEditProfile()))
      .toEqual(
        {
          data,
          readonly: true,
          form: data,
          validateErrors: undefined,
        },
      );
  });

  it('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form };
    const payload = { firstname: '1234' };

    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile(payload)))
      .toEqual(
        {
          form: { ...form, ...payload },
        },
      );
  });

  it('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };

    expect(profileReducer(state as ProfileSchema, updateProfileData.pending))
      .toEqual(
        {
          isLoading: true,
          validateErrors: undefined,
        },
      );
  });

  it('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: data,
      isLoading: true,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };

    const payload: DeepPartial<Profile> = { firstname: '1234' };

    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(payload, '')))
      .toEqual(
        {
          data: { ...payload },
          form: { ...payload },
          isLoading: false,
          readonly: true,
          validateErrors: undefined,
        },
      );
  });
});
