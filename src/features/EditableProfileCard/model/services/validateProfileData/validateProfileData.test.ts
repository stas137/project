import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../consts/consts';

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

describe('validateProfileData.test', () => {
  it('success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  it('no data', async () => {
    const result = validateProfileData();

    expect(result).toEqual([ValidateProfileError.NO_DATA]);
  });

  it('without firstname and lastname', async () => {
    const result = validateProfileData({ ...data, firstname: '', lastname: '' });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  it('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  it('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  it('incorrect all', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
