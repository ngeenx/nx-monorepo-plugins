export interface CustomGeneratorGeneratorSchema {
  // #region CLI Arguments

  /**
   * Name of the target content.
   */
  name: string;
  
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
