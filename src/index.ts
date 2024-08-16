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

  const observePDFUseCase = new ObservePDFUseCase(
    localStorageRepository,
    networkRepository,
    pixelmatchRepository,
  );

  const observeURLUseCase = new ObserveURLUseCase(
    localStorageRepository,
    networkRepository,
    scrapingRepository,
  );

  await Promise.all([
    observePDFUseCase.execute(),
    observeURLUseCase.execute(),
  ]);
}

main();