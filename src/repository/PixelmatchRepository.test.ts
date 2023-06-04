import * as fs from "fs";

import { PixelmatchRepository } from "./PixelmatchRepository";

describe("画像比較の処理を確認", () => {
  test("異なる画像を比較した場合差分が検出されること", () => {
    const image1 = fs.readFileSync("./resource/image1.png");
    const image2 = fs.readFileSync("./resource/image2.png");

    const repository = new PixelmatchRepository();
    const response = repository.match(image1, image2, { width: 100, height: 100 })

    expect(response.isMatched).toBe(false);
  });

  test("同じ画像同士を比較した場合差分は検出されないこと", () => {
    const image1 = fs.readFileSync("./resource/image1.png");
    const image2 = fs.readFileSync("./resource/image1.png");

    const repository = new PixelmatchRepository();
    const response = repository.match(image1, image2, { width: 100, height: 100 })

    expect(response.isMatched).toBe(true);
  });
});