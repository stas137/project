import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');

const sharedUiDirectory = project.getDirectory(uiPath);
const componentsDirectories = sharedUiDirectory?.getDirectories();

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'widgets', 'pages', 'features'];
  return layers.some((layer) => value.startsWith(layer));
}

componentsDirectories?.forEach((dir) => {
  const indexFilePath = `${dir.getPath()}/index.ts`;

  const indexFile = dir.getSourceFile(indexFilePath);

  if (!indexFile) {
    const sourceCode = `export * from './${dir.getBaseName()}';
`;

    const file = dir.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true,
    });
    file.save();
  }
});

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');

    if (isAbsolute(valueWithoutAlias)) {
      const segments = valueWithoutAlias.split('/');

      const isSharedLayer = segments?.[0] === 'shared';
      const isUiSlice = segments?.[1] === 'ui';

      if (isSharedLayer && isUiSlice) {
        const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
        importDeclaration.setModuleSpecifier(`@/${result}`);
      }
    }
  });
});

project.save();
