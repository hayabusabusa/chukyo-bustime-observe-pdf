import * as dotenv from "dotenv";

import { ObservePDFUseCase } from "./usecase";
import { 
  LocalStorageRepository, 
  NetworkRepository, 
  PixelmatchRepository 
} from "./repository";

async function main() {
  dotenv.config();

  const useCase = new ObservePDFUseCase(
    new LocalStorageRepository(),
    new NetworkRepository(),
    new PixelmatchRepository(),
  );

  await useCase.execute();
}

main();