import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
  it('should return username', () => {
    const state: DeepPartial<StateSchema> = {
      login: {
        username: 'Ivan',
      },
    };

    expect(getLoginUsername(state as StateSchema)).toEqual('Ivan');
  });

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});
