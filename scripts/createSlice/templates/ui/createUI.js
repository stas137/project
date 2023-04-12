const fs = require('fs/promises');
const resolveRoot = require('../../resolveRoot');
const firstCharUpperCase = require('../../firstCharUpperCase');
const componentTemplate = require('./componentTemplate');
const storyTemplate = require('./storyTemplate');
const styleTemplate = require('./styleTemplate');

module.exports = async (layer, sliceName) => {
  const resolveUIPath = (...segments) => resolveRoot('src', layer, sliceName, 'ui', ...segments);

  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (e) {
      console.log(`Can not create ui segment for slice ${sliceName}: ${e}`);
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName);

      await fs.mkdir(resolveUIPath(componentName));

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      );

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        storyTemplate(componentName),
      );

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      );
    } catch (e) {
      console.log(`Can not create component for slice ${sliceName}: ${e}`);
    }
  };

  await createUIDir();
  await createComponent();
};
