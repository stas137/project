import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import { UIDesignSwitcher } from './UIDesignSwitcher';

export default {
  title: 'features/UIDesignSwitcher',
  component: UIDesignSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UIDesignSwitcher>;

const Template: ComponentStory<typeof UIDesignSwitcher> = (args) => (
  <UIDesignSwitcher {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];
