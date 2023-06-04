import { 
  ILocalStorageRepository, 
  INetworkRepository, 
  IPixelmatchRepository 
} from "../repository";

export class ObservePDFUseCase {
  constructor(
    private readonly localStorageRepository: ILocalStorageRepository,
    private readonly networkRepository: INetworkRepository,
    private readonly pixelmatchRepository: IPixelmatchRepository,
  ) {}

  async execute(): Promise<void> {
    // 運行カレンダーの PDF を PNG に変換.
    const originalPDF = await this.networkRepository.fetchCalendarPDF();
    const originalPNG = await this.networkRepository.convertPDFToPNG(originalPDF);

    const cachedOriginalPNGPath = "./resource/original.png";

    // キャッシュが存在しない場合は、そのままオリジナルの PNG 画像を保存して終了.
    if (!this.localStorageRepository.isExists(cachedOriginalPNGPath)) {
      await this.localStorageRepository.save(cachedOriginalPNGPath, originalPNG)
      return
    }
  }
}