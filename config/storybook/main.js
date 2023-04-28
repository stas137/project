module.exports = {
  stories: [
    '../../src/**/*.stories.mdx',
    '../../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    // '@storybook/addon-essentials',
    {
      name: '@storybook/addon-essentials',
      options: {
        background: false,
      },
    },
    '@storybook/addon-interactions',
    'storybook-addon-themes',
    'storybook-addon-mock',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
