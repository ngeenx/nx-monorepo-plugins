export interface CustomGeneratorGeneratorSchema {
  // #region CLI Arguments

  /**
   * Parent folder name required for prevent possible conflicts while creating multiple generators.
   */
  parentFolderName: string;

  /**
   * Name of the generator in ^[a-z-]$ format.
   */
  name: string;
  
  // #endregion
}
