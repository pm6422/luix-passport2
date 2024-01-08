/**
 * @description Utilities for string
 */
export class StringUtils {
  /**
   * @description property to share vue instance
   */
  // public static i18n: Object;

  constructor() {
  }

  public static toNumber(str, defaultVal: number): number  {
    let result = defaultVal;
    if (str === undefined || str === '') return result;
    str = str.trim();
    if (str.match(/^-?[0-9]+$/)) {
      result = Number(str);
    } 
    return result;
  }
  
}
