import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
  it('should return profile form', () => {
    const form = {
      firstname: 'Ivan',
      lastname: 'Ivanov',
      age: 32,
      city: 'Moscow',
      username: 'admin',
      avatar: '',
      currency: Currency.EUR,
      country: Country.Russia,
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        form,
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
