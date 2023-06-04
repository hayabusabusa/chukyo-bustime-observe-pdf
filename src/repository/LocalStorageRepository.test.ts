import * as fs from "fs";

import { LocalStorageRepository } from "./index";

describe("基本的なファイル操作の確認", () => {
  test("ファイルの保存ができること", async () => {
    const path = "test.txt"
    const repository = new LocalStorageRepository();
  
    const buffer = Buffer.from("test");
    await repository.save(path, buffer);
  
    expect(repository.isExists(path)).toBe(true);
  });

  test("ファイルの読み込みができること", async () => {
    const path = "test.txt"
    const text = "test"
    const repository = new LocalStorageRepository();

    const buffer = Buffer.from(text);
    await repository.save(path, buffer);

    const file = await repository.load(path);
    expect(file.toString("utf-8")).toBe(text);
  });

  test("ファイルの削除ができること", async () => {
    const path = "test.txt"
    const repository = new LocalStorageRepository();

    const buffer = Buffer.from("test");
    await repository.save(path, buffer);
    await repository.unlinkAll([path]);

    expect(repository.isExists(path)).toBe(false);
  });
});
