const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');
const createModel = require('./model/createModel');
const createUI = require('./ui/createUI');
const createPublicApi = require('./publicApi/createPublicApi');

module.exports = async (layer, sliceName) => {
  try {
    await fs.mkdir(resolveRoot('src', layer, firstCharUpperCase(sliceName)));
  } catch (e) {
    console.log(`Can not create directory for slice ${sliceName}: ${e}`);
  }

  await createModel(layer, sliceName);
  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};
