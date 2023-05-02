const fs = require('fs/promises');
const firstCharUpperCase = require('../../firstCharUpperCase');
const resolveRoot = require('../../resolveRoot');

module.exports = async (layer, sliceName) => {
  const name = firstCharUpperCase(sliceName);

  try {
    await fs.writeFile(resolveRoot('src', layer, sliceName, 'index.ts'), `export type {
  ${name}Schema,
} from './model/types/${name}Schema';

export {
  ${name},
} from './ui/${name}/${name}';
`);
  } catch (e) {
    console.log(`Can not create index.ts for slice ${sliceName}: ${e}`);
  }
};
