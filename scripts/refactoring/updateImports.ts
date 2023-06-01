import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'widgets', 'pages', 'features'];

  if (layers.some((layer) => value.startsWith(layer))) {
    return true;
  }

  return false;
}

function isAbsoluteSharedUi(value: string) {
  // import { Icon } from '@/shared/ui/Icon';
  const layerSharedUi = '@/shared/ui';

  return value.startsWith(layerSharedUi);
}

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`);
    } else if (isAbsoluteSharedUi(value)) {
      // in: import { Icon } from '@/shared/ui/Icon';
      // out: import { Icon } from '@/shared/ui/deprecated/Icon';
      const newValue = value.split('@/shared/ui/');
      importDeclaration.setModuleSpecifier(
        `@/shared/ui/deprecated/${newValue[1]}`,
      );
    }
  });
});

project.save();
