# nx-monorepo-plugins

This repository contains a collection of plugins for the Nx monorepo tool. The plugins are designed to enhance the functionality of Nx and provide additional capabilities for managing and building monorepos by [NGEENX](https://github.com/ngeenx).

## Available Plugins

- [nx-plugin](./nx-plugin/)
  - Generators
    - [custom-generator](./nx-plugin/src/generators/custom-generator)
- [ng-plugin](./ng-plugin/)
  - Generators
    - [lib-generator](./ng-plugin/src/generators/lib-generator)
    - [chrome-extension-generator](./ng-plugin/src/generators/chrome-extension-generator)
- [nest-plugin](./nest-plugin/)
  - Generators
    - [lib-generator](./nest-plugin/src/generators/lib-generator)
    - [mod-generator](./nest-plugin/src/generators/mod-generator)
    - [res-generator](./nest-plugin/src/generators/res-generator)

## Usage

Create `tools/external-plugins` directory in the root of your Nx workspace and copy this repository into it with [git submodule](https://git-scm.com/docs/git-submodule) or [git subtree](https://www.atlassian.com/git/tutorials/git-subtree) commands.

```bash
git submodule add https://github.com/ngeenx/nx-monorepo-plugins.git tools/external-plugins
```

Define the plugins packages in your `tsconfig.base.json` file:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "paths": {
      "@ngeen-platform/nest-plugin": [
        "tools/external-plugins/nest-plugin/src/index.ts"
      ],
      "@ngeen-platform/ng-plugin": [
        "tools/external-plugins/ng-plugin/src/index.ts"
      ],
      "@ngeen-platform/nx-plugin": [
        "tools/external-plugins/nx-plugin/src/index.ts"
      ],
      ...
    }
  }
}
```

Call the generator with the `nx` command:

```bash
nx generate @ngeen-platform/ng-plugin:chrome-extension-generator
```
