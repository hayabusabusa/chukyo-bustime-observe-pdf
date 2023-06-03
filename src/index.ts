import * as dotenv from "dotenv";

import { LocalStorageRepository } from "./repository";

async function main() {
  dotenv.config();

  const repository = new LocalStorageRepository();
  const buffer = Buffer.from("sample");
  await repository.save("sample.txt", buffer);
}

main();