import {
  formatFiles,
  generateFiles,
  Tree,
  offsetFromRoot,
  getProjects,
} from '@nx/devkit';
import * as path from 'path';
import { LibGeneratorGeneratorSchema } from './schema';
import {
  libraryGenerator as angularLibraryGenerator,
  componentStoryGenerator as angularComponentStoryGenerator,
  UnitTestRunner,
} from '@nx/angular/generators';
import { Linter } from '@nx/eslint';

const deleteFiles = (tree: Tree, projectRoot: string, files: string[]): void => {
  files.forEach(file => {
    const filePath = `${projectRoot}/${file}`
    
    if (tree.exists(filePath)) {
      tree.delete(filePath);
    }
  });
};

const kebabToPascalCase = (kebabString: string): string => {
    return kebabString
      .split('-')
      .map(word => 
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      )
      .join('');
}

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

  options.projectRoot = `libs/client/${options.type}/${options.name}`;
  options.rootOffset = offsetFromRoot(options.projectRoot);
  options.prefix = 'ngn';

  // first run build-in angular library generator
  await angularLibraryGenerator(tree, {
    name: options.name,
    directory: options.projectRoot,
    sourceDir: `${options.projectRoot}/src`,
    unitTestRunner: UnitTestRunner.Vitest, // FIXME: current version of angular and vite are not supporting vitest
    linter: Linter.EsLint,
    style: 'scss',
    prefix: options.prefix,
    buildable: true,
    publishable: true,
    importPath: `@ngeenx/${options.name}`
  });

  // then generate extra custom generqated files
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    options
  );

  // #region Storybook Support

  if (options.storybook === 'true') {
    await angularComponentStoryGenerator(tree, {
      projectPath: options.projectRoot,
      componentName: `${kebabToPascalCase(options.name)}Component`,
      componentPath: `/src/lib/${options.name}`,
      componentFileName: `${options.name}.component`,
      skipFormat: false
    })
  } else if (options.storybook === 'false') {
    deleteFiles(tree, options.projectRoot, ['.storybook']);
  }
  
  // #endregion

  // #region Tailwind Support

  if (options.tailwind === 'false') {
    deleteFiles(tree, options.projectRoot, ['tailwind.config.js', 'postcss.config.js']);
  }
  
  // #endregion

  // finally delete unwanted files with tree.delete
  deleteFiles(tree, options.projectRoot, ['eslint.config.cjs']);

  await formatFiles(tree);
}

export default libGeneratorGenerator;
