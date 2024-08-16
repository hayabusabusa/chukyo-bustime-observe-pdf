import { 
  ILocalStorageRepository, 
  INetworkRepository, 
  IPixelmatchRepository 
} from "../repository";
import { ObservePDFUseCase } from "../usecase";
import { PixelmatchResponse } from "../types";

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

class MockLocalStorageRepository implements ILocalStorageRepository {
  constructor(readonly stored: Record<string, Buffer>) {}

  isExists(path: string): boolean {
    return this.stored[path] != null;
  }

  save(path: string, data: Buffer): Promise<void> {
    return new Promise((resolved) => { 
      this.stored[path] = data;
      resolved();
    });
  }

  load(path: string): Promise<Buffer> {
    return new Promise((resolved) => {
      resolved(this.stored[path]);
    });
  }

  unlinkAll(paths: string[]): Promise<void> {
    return new Promise((resolved) => {
      paths.forEach((path) => {
        delete this.stored[path];
      });
      resolved();
    });
  }
}

class MockNetworkRepository implements INetworkRepository {
  constructor(readonly pdf: Buffer, readonly png: Buffer) {}

  fetchPDF(url: string): Promise<Buffer> {
    return new Promise((resolved) => {
      resolved(this.pdf);
    });
  }

  fetchHTML(url: string): Promise<string> {
    return new Promise((resolved) => {
      // 今回はテスト対象外なので空文字を返す.
      resolved("");
    });
  }

  convertPDFToPNG(rawPDFData: Buffer): Promise<Buffer> {
    return new Promise((resolved) => {
      resolved(this.png);
    });
  }
}

class MockPixelmatchRepository implements IPixelmatchRepository {
  constructor(readonly response: PixelmatchResponse) {}

  match(lhsBuffer: Buffer, rhsBuffer: Buffer, size: { width: number; height: number; }): PixelmatchResponse {
    return this.response;
  }
}