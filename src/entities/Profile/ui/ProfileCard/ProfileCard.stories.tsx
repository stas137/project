import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { Theme } from '@/shared/const/theme';

import AvatarImg from '@/shared/assets/tests/avatar.jpg';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

const primaryArgs = {
  data: {
    firstname: 'Ivan',
    lastname: 'Ivanov',
    age: 32,
    city: 'Moscow',
    username: 'admin',
    avatar: AvatarImg,
    currency: Currency.EUR,
    country: Country.Russia,
  },
};

export const Primary = Template.bind({});
Primary.args = { ...primaryArgs };

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = { ...primaryArgs };
PrimaryRedesigned.decorators = [NewDesignDecorator];
// PrimaryRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const WithError = Template.bind({});
WithError.args = {
  error: 'Error',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const Dark = Template.bind({});
Dark.args = {
  data: {
    firstname: 'Ivan',
    lastname: 'Ivanov',
    age: 32,
    city: 'Moscow',
    username: 'admin',
    avatar: '',
    currency: Currency.EUR,
    country: Country.Russia,
  },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
