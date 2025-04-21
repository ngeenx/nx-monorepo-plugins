export interface ChromeExtensionGeneratorGeneratorSchema {
  // #region CLI Arguments

  /**
   * Name of the generator in ^[a-z-]$ format.
   */
  name: string;

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

  // #endregion
}
