import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
  it('should return profile data', () => {
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

    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };

    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
