import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import AvatarImg from '@/shared/assets/tests/avatar.jpg';
import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    profile: {
      form: {
        firstname: 'Ivan',
        lastname: 'Ivanov',
        age: 32,
        city: 'Moscow',
        username: 'admin',
        avatar: AvatarImg,
        currency: Currency.EUR,
        country: Country.Russia,
      },
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        firstname: 'Ivan',
        lastname: 'Ivanov',
        age: 32,
        city: 'Moscow',
        username: 'admin',
        avatar: '',
        currency: Currency.EUR,
        country: Country.Russia,
      },
    },
  }),
];
