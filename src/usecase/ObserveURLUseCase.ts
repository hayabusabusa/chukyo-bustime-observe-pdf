import { 
  ILocalStorageRepository, 
  INetworkRepository, 
  IScrapingRepository,
} from "../repository";
import { URLs } from "../types";

export class ObserveURLUseCase {
  constructor(
    private readonly localStorageRepository: ILocalStorageRepository,
    private readonly networkRepository: INetworkRepository,
    private readonly scrapingRepository: IScrapingRepository,
  ) {}

  async execute(): Promise<void> {
    // html の内容を取得してスクレイピングして URL を抜き出す.
    const html = await this.networkRepository.fetchHTML(URLs.html);
    const urls = this.scrapingRepository.getURLs(html);
    
    // 取得した URL を JSON として保存する.
    const jsonPath = './resource/urls.json';
    const json = JSON.stringify(urls);
    const jsonBuffer = Buffer.from(json);
    await this.localStorageRepository.save(jsonPath, jsonBuffer);
  }
}