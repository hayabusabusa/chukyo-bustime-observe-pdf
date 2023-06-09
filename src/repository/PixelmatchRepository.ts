import { PNG } from "pngjs";
import Pixelmatch from 'pixelmatch';

import { PixelmatchResponse } from "../types";

/**
 * PNG 画像の比較処理を行う Repository.
 */
export interface IPixelmatchRepository {
  /**
  * 同じサイズの PNG 画像を比較して結果を返す
   * @param lhsBuffer 画像1のバイナリデータ
   * @param rhsBuffer 画像2のバイナリデータ
   * @param size 2 つの画像のサイズ
   */
  match(lhsBuffer: Buffer, rhsBuffer: Buffer, size: { width: number, height: number }): PixelmatchResponse
}

/**
 * PNG 画像の比較処理を行う Repository の実装.
 */
export class PixelmatchRepository implements IPixelmatchRepository {
  match(lhsBuffer: Buffer, rhsBuffer: Buffer, size: { width: number, height: number }): PixelmatchResponse {
    const lhs = PNG.sync.read(lhsBuffer);
    const rhs = PNG.sync.read(rhsBuffer);

    const diff = new PNG({ width: size.width, height: size.height });
    const missMatchPixels = Pixelmatch(lhs.data, rhs.data, diff.data, size.width, size.height);

    return {
        isMatched: missMatchPixels <= 0,
        missMatchPixels: missMatchPixels,
        differencePNG: PNG.sync.write(diff),
    }
  }
}