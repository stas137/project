const firstCharUpperCase = require('../../firstCharUpperCase');

module.exports = (sliceName) => {
  const interfaceName = firstCharUpperCase(sliceName);

  return `export interface ${interfaceName}Schema {

}
`;
};
