import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { resourceGeneratorGenerator } from './resource-generator';
import { ResourceGeneratorGeneratorSchema } from './schema';

describe('resource-generator generator', () => {
  let tree: Tree;
  const options: ResourceGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await resourceGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
