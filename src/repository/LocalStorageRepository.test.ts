import * as fs from "fs";

import { LocalStorageRepository } from "./index";

describe("基本的なファイル操作の確認", () => {
  const path = "test.txt"
  const repository = new LocalStorageRepository();

  afterEach(async () => {
    if (repository.isExists(path)) {
      await repository.unlinkAll([path])
    }
  });

  test("ファイルの保存ができること", async () => {
    const buffer = Buffer.from("test");
    await repository.save(path, buffer);
  
    expect(repository.isExists(path)).toBe(true);
  });

  test("ファイルの読み込みができること", async () => {
    const text = "test"
    const buffer = Buffer.from(text);
    await repository.save(path, buffer);

    const file = await repository.load(path);
    expect(file.toString("utf-8")).toBe(text);
  });

  test("すでに存在するファイルに上書き保存ができること", async () => {
    const buffer = Buffer.from("test");
    await repository.save(path, buffer);

    const buffer2 = Buffer.from("test2");
    await repository.save(path, buffer2)
  
    const stored = await repository.load(path);
    expect(stored.toString("utf-8")).toBe("test2");
  });

  test("ファイルの削除ができること", async () => {
    const buffer = Buffer.from("test");
    await repository.save(path, buffer);
    await repository.unlinkAll([path]);

    expect(repository.isExists(path)).toBe(false);
  });
});
