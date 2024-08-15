import { 
  ILocalStorageRepository, 
  INetworkRepository, 
  IPixelmatchRepository 
} from "../repository";

import { PNGSize, URLs } from "../types";

export class ObservePDFUseCase {
  constructor(
    private readonly localStorageRepository: ILocalStorageRepository,
    private readonly networkRepository: INetworkRepository,
    private readonly pixelmatchRepository: IPixelmatchRepository,
  ) {}

  async execute(): Promise<void> {
    // 運行カレンダーの PDF の差分を確認.
    const compareCalendarPDFPromise = this.comparePDF(
      URLs.pdf,
      "calendar",
      {
        width: PNGSize.calendar.width,
        height: PNGSize.calendar.height
      }
    );
    // 時刻表の PDF の差分を確認.
    const compareTimetablePDFPromise = this.comparePDF(
      URLs.timeTable, 
      "timetable",
      {
        width: PNGSize.timeTable.width,
        height: PNGSize.timeTable.height
      }
    );

    await Promise.all([
      compareCalendarPDFPromise, 
      compareTimetablePDFPromise
    ]);
  }

  /**
   * 指定された URL の PDF とキャッシュされた PNG を比較して差分を確認する.
   * @param url PDF の URL.
   * @param fileName PNG として保存する際のファイル名.
   * @returns 非同期処理の完了.
   */
  private async comparePDF(
    url: string, 
    fileName: string, 
    size: {
      width: number,
      height: number
    }
  ): Promise<void> {
    // 比較するため PDF を PNG に変換.
    const originalPDF = await this.networkRepository.fetchPDF(url);
    const originalPNG = await this.networkRepository.convertPDFToPNG(originalPDF);

    const cachedOriginalPNGPath = `./resource/${fileName}_original.png`;

    // キャッシュが存在しない場合は、そのままオリジナルの PNG 画像を保存して終了.
    if (!this.localStorageRepository.isExists(cachedOriginalPNGPath)) {
      await this.localStorageRepository.save(cachedOriginalPNGPath, originalPNG);
      return;
    }

    const cachedOriginalPNG = await this.localStorageRepository.load(cachedOriginalPNGPath);
    const pixelmatchResponse = this.pixelmatchRepository.match(
      cachedOriginalPNG,
      originalPNG,
      { 
        width: size.width, 
        height: size.height
      }
    );

    // 画像が一致していて差分がない場合はそのまま終了.
    if (pixelmatchResponse.isMatched) {
      return;
    }

    // 新しい画像で上書きして、差分の画像を追加して終了.
    const differencePNGPath = `./resource/${fileName}_diff.png`;
    await this.localStorageRepository.save(cachedOriginalPNGPath, originalPNG);
    await this.localStorageRepository.save(differencePNGPath, pixelmatchResponse.differencePNG);
  }
}