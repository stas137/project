## Project Launch

```
npm install - Install dependencies
npm run start:dev - Start server (json-server) and frontend project in dev mode (webpack)
npm run start:vite:dev - Start server (json-server) and frontend project in dev mode (vite)
```

---

## Scripts

- `npm run start` - Launching a frontend project on webpack
- `npm run start:vite` - Launching a frontend project on vite
- `npm run start:dev` - Launching a frontend project on a webpack dev server + backend
- `npm run start:dev:vite` - Launching a frontend project on vite + backend
- `npm run start:dev:server` - Starting the backend server (json-server)
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode (not minimized)
- `npm run lint:ts` - Checking ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Checking css files with style linter
- `npm run lint:scss:fix` - Fix scss files with style linter
- `npm run test:unit` - Running unit tests with jest
- `npm run test:ui` - Running screenshots of tests with loki
- `npm run test:ui:ok` - Confirmation of new screenshots
- `npm run test:ui:ci` - Running screenshots of tests in CI
- `npm run test:ui:report` - Generating a full report for screenshots of tests
- `npm run test:ui:json` - Generating a json report for screenshots of tests
- `npm run test:ui:html` - Generating HTML report for screenshots of tests
- `npm run storybook` - Launching Storybook
- `npm run storybook:build` - Building a storybook build
- `npm run prepare` - Precommit hooks
- `npm run generate:slice` - Script for generating FSD slices

---

## Project architecture

The project is written in accordance with the Feature sliced design methodology

Link to documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Working with translations

The project uses the i18next library to work with translations.
Files with translations are stored in public/locales.

For comfortable work, it is recommended to install the plugin for webstorm/vscode

Documentation i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Tests

The project uses 4 types of tests:

- `npm run test:unit` - Regular unit tests on jest
- `npm run test:unit` - Component tests with React testing library
- `npm run test:ui`- Screenshot testing with loki
- `npm run test:e2e` - e2e testing with Cypress

---

## Linting

The project uses eslint to check typescript code and stylelint to check files with styles.

Also, for strict control of the main architectural principles, our own eslint plugin _eslint-plugin-project-path-checker-plugin_ is used,
which contains 3 rules:

1. path-checker - Prohibits the use of absolute imports within the same module
2. layer-imports - Checks the correctness of the use of layers from the point of view of FSD
   (for example, widgets cannot be used in features or entitites)
3. public-api-imports - Allows importing from other modules only from the public api. Has auto fix

##### Launching linters

- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Checking scss files with style linter
- `npm run lint:scss:fix` - Fix scss files with style linter

---

## Storybook

The project describes story cases for each component.
Server requests are mocked using storybook-addon-mock.

Storycase file is created next to the component with the .stories.tsx extension.

You can run storybook with the command:

- `npm run storybook`

Example:

```typescript jsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button, ButtonSize, ButtonVariant } from './Button';

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
  variant: ButtonVariant.CLEAR,
  name: 'button',
};
```

---

## Project Configuration

For development, the project contains 2 configs:

1. Webpack - ./config/build
2. Vite - vite.config.ts

Both collectors are adapted to the main features of the application.

The entire configuration is stored in /config

- /config/babel - babel
- /config/build - webpack configuration
- /config/jest - test environment configuration
- /config/storybook - storybook configuration

The `scripts` folder contains various scripts for refactoring\simplifying code writing\generating reports, etc.

---

## CI pipeline and pre commit hooks

The GitHub actions configuration is located in /.github/workflows.
In ci, all kinds of tests are run, project and storybook assembly, linting.

---

### Working with data

Interaction with the data is carried out using the redux toolkit.
If possible, reused entities should be normalized using EntityAdapter.

Server request are sent using [RTK query](/src/shared/api/rtkApi.ts)

To asynchronously connect of reducers (so as not to pull them into a common bundle), use
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)
