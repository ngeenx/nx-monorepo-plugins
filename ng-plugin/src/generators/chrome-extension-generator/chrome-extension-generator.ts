import {
  formatFiles,
  generateFiles,
  getProjects,
  offsetFromRoot,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ChromeExtensionGeneratorGeneratorSchema } from './schema';

export async function chromeExtensionGeneratorGenerator(
  tree: Tree,
  options: ChromeExtensionGeneratorGeneratorSchema
) {
  const projects = getProjects(tree);

  if (projects.has(options.name)) {
    throw new Error(
      `Project ${options.name} already exists. Please choose a different name.`
    );
  }

  // #region Extension Apps Generator

  options.projectRoot = `apps/chrome-extensions/${options.name}`;
  options.rootOffset = offsetFromRoot(options.projectRoot) + '..';

  generateFiles(
    tree,
    path.join(__dirname, 'files/apps'),
    options.projectRoot,
    options
  );

  // #endregion

  // #region Extensions Generator

  const chromeExtensionRoot = `chrome-extensions/${options.name}`;

  generateFiles(
    tree,
    path.join(__dirname, 'files/extension'),
    chromeExtensionRoot,
    options
  );

  // #endregion

  await formatFiles(tree);

  console.log('Add this script to your package.json:\n');
  console.log(
    `"${options.name}-ext:dev": "nx run-many --target=build --projects=${options.name}-devtools-panel,${options.name}-options,${options.name}-popup,${options.name}-background-script,${options.name}-content-script --configuration=development --watch --parallel 5"`
  );
}

export default chromeExtensionGeneratorGenerator;
