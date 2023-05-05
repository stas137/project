import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ModalWithoutPortal } from './ModalWithoutPortal';
// import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/ModalWithoutPortal',
  component: ModalWithoutPortal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ModalWithoutPortal>;

const Template: ComponentStory<typeof ModalWithoutPortal> = (args) => <ModalWithoutPortal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: false,
  lazy: true,
  children: 'Text',
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];

// export const Dark = Template.bind({});
// Dark.args = {
//   isOpen: false,
//   lazy: true,
//   children: 'Text',
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
