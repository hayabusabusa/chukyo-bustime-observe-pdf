import {
  MockLocalStorageRepository,
  MockNetworkRepository,
  MockPixelmatchRepository
} from "../types";
import { ObservePDFUseCase } from "../usecase";

describe("カレンダーの PDF 取得操作で基本動作の確認", () => {
  const mockOriginalPDF = Buffer.from("originalPDF");
  const mockOriginalPNG = Buffer.from("originalPNG");
  const mockUpdatedPDF = Buffer.from("updatedPDF");
  const mockUpdatedPNG = Buffer.from("updatedPNG");
  const mockDiffPNG = Buffer.from("diffPNG");

  const differencePNGPath = "./resource/calendar_diff.png";
  const cachedOriginalPNGPath = "./resource/calendar_original.png";

  test("キャッシュされたオリジナル画像が存在しない場合はオリジナル画像が追加されて終了すること", async () => {
    const localStorageRepository = new MockLocalStorageRepository({});
    const networkRepository = new MockNetworkRepository(mockOriginalPDF, mockOriginalPNG);
    const pixelmatchRepository = new MockPixelmatchRepository({
      isMatched: true,
      missMatchPixels: 0,
      differencePNG: mockDiffPNG,
    });

    const useCase = new ObservePDFUseCase(
      localStorageRepository,
      networkRepository,
      pixelmatchRepository,
    );

    await useCase.execute();

    expect(localStorageRepository.isExists(cachedOriginalPNGPath)).toBe(true);
    expect(localStorageRepository.isExists(differencePNGPath)).toBe(false);
  });

  test("画像の差分が存在しない場合は差分の画像ファイルが作成されないこと", async () => {
    const localStorageRepository = new MockLocalStorageRepository({
      "./resource/original.png": mockOriginalPNG,
    });
    const networkRepository = new MockNetworkRepository(mockOriginalPDF, mockOriginalPNG);
    const pixelmatchRepository = new MockPixelmatchRepository({
      isMatched: true,
      missMatchPixels: 0,
      differencePNG: mockDiffPNG,
    });

    const useCase = new ObservePDFUseCase(
      localStorageRepository,
      networkRepository,
      pixelmatchRepository,
    );

    await useCase.execute();

    expect(localStorageRepository.isExists(differencePNGPath)).toBe(false);
  });

  test("画像の差分が発生した場合はキャッシュした画像が更新されて差分の画像ファイルが作成されること", async () => {
    const localStorageRepository = new MockLocalStorageRepository({
      "./resource/calendar_original.png": mockOriginalPNG,
    });
    const networkRepository = new MockNetworkRepository(mockUpdatedPDF, mockUpdatedPNG);
    const pixelmatchRepository = new MockPixelmatchRepository({
      isMatched: false,
      missMatchPixels: 1,
      differencePNG: mockDiffPNG,
    });

    const useCase = new ObservePDFUseCase(
      localStorageRepository,
      networkRepository,
      pixelmatchRepository,
    );

    await useCase.execute();

    const updatedPNG = await localStorageRepository.load("./resource/calendar_original.png");
    expect(localStorageRepository.isExists(differencePNGPath)).toBe(true);
    expect(updatedPNG.toString("utf-8")).toBe("updatedPNG");
  });
});
