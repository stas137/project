import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  variant: 'clear',
  name: 'button',
};
// Clear.decorators = [ThemeDecorator(Theme.LIGHT)];

// export const ClearInverted = Template.bind({});
// ClearInverted.args = {
//   children: 'Text',
//   variant: ButtonVariant.CLEAR_INVERTED,
//   name: 'button',
// };

// export const Outline = Template.bind({});
// Outline.args = {
//   children: 'Text',
//   variant: ButtonVariant.OUTLINE,
// };

// export const OutlineSizeL = Template.bind({});
// OutlineSizeL.args = {
//   children: 'Text',
//   variant: ButtonVariant.OUTLINE,
//   size: ButtonSize.L,
// };

// export const OutlineSizeXL = Template.bind({});
// OutlineSizeXL.args = {
//   children: 'Text',
//   variant: ButtonVariant.OUTLINE,
//   size: ButtonSize.XL,
// };
// // Outline.decorators = [ThemeDecorator(Theme.LIGHT)];

// export const BackgroundTheme = Template.bind({});
// BackgroundTheme.args = {
//   children: 'Text',
//   variant: ButtonVariant.BACKGROUND,
// };

// export const BackgroundThemeInverted = Template.bind({});
// BackgroundThemeInverted.args = {
//   children: 'Text',
//   variant: ButtonVariant.BACKGROUND_INVERTED,
// };

// export const Square = Template.bind({});
// Square.args = {
//   children: '>',
//   variant: ButtonVariant.BACKGROUND_INVERTED,
//   square: true,
// };

// export const SquareSizeL = Template.bind({});
// SquareSizeL.args = {
//   children: '>',
//   variant: ButtonVariant.BACKGROUND_INVERTED,
//   square: true,
//   size: ButtonSize.L,
// };

// export const SquareSizeXL = Template.bind({});
// SquareSizeXL.args = {
//   children: '>',
//   variant: ButtonVariant.BACKGROUND_INVERTED,
//   square: true,
//   size: ButtonSize.XL,
// };
// // OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

// export const Disabled = Template.bind({});
// Disabled.args = {
//   children: '>',
//   variant: ButtonVariant.OUTLINE,
//   disabled: true,
// };
