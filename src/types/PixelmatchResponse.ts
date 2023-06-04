/**
 * PNG 画像の比較の結果.
 */
export interface PixelmatchResponse {
  /**
   * 比較した PNG 画像が一致していたかどうか.
   */
  isMatched: boolean

  /**
   * 一致しなかったピクセル数.
   */
  missMatchPixels: number

  /**
   * 比較結果を可視化した PNG 画像.
   */
  differencePNG: Buffer
}