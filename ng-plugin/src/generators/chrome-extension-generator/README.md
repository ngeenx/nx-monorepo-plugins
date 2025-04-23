# Angular Chrome Extension Generator

This is a generator for creating an Angular based Chrome extension. It provides a basic structure and configuration to get started with building a Chrome extension using Angular.

## Installation

Start by generating a new Chrome extension project using the following command:

```bash
nx g @ngeen-platform/ng-plugin:chrome-extension-generator
```

Let's assume you have a project named `myext`. The generator will create the following structure:

- Apps: `apps/chrome-extensions/myext/`
- Build: `chrome-extensions/myext/`

Finally, add the following script to your `package.json` file:

```json
"scripts": {
  "myext:dev": "nx run-many --target=build --projects=myext-devtools-panel,myext-options,myext-popup,myext-background-script,myext-content-script --configuration=development --watch --parallel 5"
}
```

Start dev server:

```bash
pnpm run myext:dev
```

## Loading the Extension

1. Open your Chromium based browser and navigate to `chrome://extensions/`.
2. Enable "Developer mode" by toggling the switch in the page.
3. Click on "Load unpacked" and select the `chrome-extensions/myext` directory.
4. Your extension should now be loaded and visible in the extensions list.
