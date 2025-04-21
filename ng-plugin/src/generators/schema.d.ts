export interface LibGeneratorGeneratorSchema {
  // #region CLI arguments

  /**
   * Type of the library. Also it's used sub path in base `libs/client/` path.
   */
  type: string;

  /**
   * Package name in ^ngn-[a-z0-9]+$ format.
   */
  name: string;

  /**
   * Stroybook support.
   */
  storybook: 'true' | 'false';

  /**
   * Tailwind support.
   */
  tailwind: 'true' | 'false';

  // #endregion

  // #region Computed properties

  /**
   * The relative path from the root of the monorepo to the project root in `../` format.
   */
  rootOffset: string;

  /**
   * The absolute path to the project root.
   */
  projectRoot: string;

  /**
   * Component selector prefix
   */
  prefix: string;

  // #endregion
}
