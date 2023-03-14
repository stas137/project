import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

// import AvatarImg from 'shared/assets/tests/avatar.jpg';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
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
