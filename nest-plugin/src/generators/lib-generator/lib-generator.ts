import {
  formatFiles,
  generateFiles,
  getProjects,
  offsetFromRoot,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { LibGeneratorGeneratorSchema } from './schema';
import {
  libraryGenerator as nestLibraryGenerator,
  moduleGenerator
} from '@nx/nest';
import { Linter } from '@nx/eslint';

const deleteFiles = (tree: Tree, projectRoot: string, files: string[]): void => {
  files.forEach(file => {
    const filePath = `${projectRoot}/${file}`
    
    if (tree.exists(filePath)) {
      tree.delete(filePath);
    }
  });
};

export async function libGeneratorGenerator(
  tree: Tree,
  options: LibGeneratorGeneratorSchema
) {
  const projects = getProjects(tree);

  if (projects.has(options.name)) {
    throw new Error(
      `Project ${options.name} already exists. Please choose a different name.`
    );
  }

  options.projectRoot = `libs/backend/${options.type}/${options.name}`;
  options.rootOffset = offsetFromRoot(options.projectRoot);

  // first run build-in nest library generator
  await nestLibraryGenerator(tree, {
    name: options.name,
    directory: options.projectRoot,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    buildable: true,
    publishable: true,
    importPath: `@ngeenx/${options.name}`
  });
  
  // finally delete unwanted files with tree.delete
  deleteFiles(tree, options.projectRoot, ['ngn-testa.module.ts']);
  
  // then generate extra custom generqated files
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    options
  );

  // #region Module Generation
  
  if (options.initialModuleName) {
    await moduleGenerator(tree, {
      path: `${options.projectRoot}/src/lib/modules/${options.initialModuleName}/${options.initialModuleName}`,
      language: 'ts',
    })
  }
  
  // #endregion

  // finally delete unwanted files with tree.delete
  deleteFiles(tree, options.projectRoot, ['eslint.config.cjs']);

  await formatFiles(tree);
}

export default libGeneratorGenerator;
