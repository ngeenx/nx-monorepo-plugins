export interface LibGeneratorGeneratorSchema {
  // #region CLI arguments

  /**
   * Type of the library. Also it's used sub path in base `libs/backend/` path.
   */
  type: string;

  /**
   * Package name in ^ngn-[a-z0-9]+$ format.
   */
  name: string;

  /**
   * Initial module name in ^[a-z-]+$ format.
   */
  initialModuleName: string;

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
