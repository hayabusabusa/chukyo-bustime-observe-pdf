import { 
  ILocalStorageRepository, 
  INetworkRepository, 
  IPixelmatchRepository 
} from "../repository";
import { PDFSize } from "../types";

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

    const cachedOriginalPNG = await this.localStorageRepository.load(cachedOriginalPNGPath);
    const pixelmatchResponse = this.pixelmatchRepository.match(cachedOriginalPNG, originalPNG, { width: PDFSize.pdf.width, height: PDFSize.pdf.height });

    // 画像が一致していて差分がない場合はそのまま終了.
    if (pixelmatchResponse.isMatched) {
      return
    }

    // 新しい画像で上書きして、差分の画像を追加して終了.
    const differencePNGPath = "./resource/diff.png";
    await this.localStorageRepository.save(cachedOriginalPNGPath, originalPNG);
    await this.localStorageRepository.save(differencePNGPath, pixelmatchResponse.differencePNG);
  }
}