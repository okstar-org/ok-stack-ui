/**
 * 浏览器支持工具类
 */
class Support {
  /**
   * canDownload
   */
  public canDownload(): boolean {
    return typeof Blob !== 'undefined';
  }
}
const supports = new Support();
export { supports };
