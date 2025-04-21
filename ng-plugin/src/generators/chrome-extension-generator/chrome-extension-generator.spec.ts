import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { chromeExtensionGeneratorGenerator } from './chrome-extension-generator';
import { ChromeExtensionGeneratorGeneratorSchema } from './schema';

describe('chrome-extension-generator generator', () => {
  let tree: Tree;
  const options: ChromeExtensionGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await chromeExtensionGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
