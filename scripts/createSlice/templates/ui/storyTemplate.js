module.exports = (layer, componentName) => {
  return `import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import { ${componentName} } from './${componentName}';

export default {
  title: '${layer}/${componentName}',
  component: ${componentName},
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];
`;
};
