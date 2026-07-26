import * as dotenv from "dotenv";

import { ObservePDFUseCase, ObserveURLUseCase } from "./usecase";
import { 
  LocalStorageRepository, 
  NetworkRepository, 
  PixelmatchRepository,
  ScrapingRepository,
} from "./repository";

async function main() {
  dotenv.config();

  const localStorageRepository = new LocalStorageRepository();
  const networkRepository = new NetworkRepository();
  const pixelmatchRepository = new PixelmatchRepository();
  const scrapingRepository = new ScrapingRepository();

  const observeURLUseCase = new ObserveURLUseCase(
    localStorageRepository,
    networkRepository,
    scrapingRepository,
  );

  await observeURLUseCase.execute();

  const observePDFUseCase = new ObservePDFUseCase(
    localStorageRepository,
    networkRepository,
    pixelmatchRepository,
  );

  await observePDFUseCase.execute();
}

main();