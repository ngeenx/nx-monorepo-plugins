export interface LibGeneratorGeneratorSchema {
  // #region CLI Arguments

  /**
   * Type of the library. Also it's used sub path in base `libs/client/` path.
   */
  type: string;

  /**
   * Package name in ^[a-z0-9]+$ format.
   */
  name: string;

  /**
   * Component selector prefix
   */
  prefix: string;

  /**
   * Stroybook support.
   */
  storybook: 'true' | 'false';

  /**
   * Tailwind support.
   */
  tailwind: 'true' | 'false';

  // #endregion

  // #region Computed Properties

  /**
   * The relative path from the root of the monorepo to the project root in `../` format.
   */
  rootOffset: string;

  /**
   * The absolute path to the project root.
   */
  projectRoot: string;

  // #endregion
}
