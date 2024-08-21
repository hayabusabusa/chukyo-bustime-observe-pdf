import {
  MockLocalStorageRepository,
  MockNetworkRepository,
  MockScrapingRepository
} from "../types";
import { ObserveURLUseCase } from "./ObserveURLUseCase";

describe('基本動作の確認', () => {
  const networkRepository = new MockNetworkRepository(
    Buffer.from(''),
    Buffer.from(''),
    '<html lang="ja"><body><a class="pdf" href="https://example.com"></a></body></html>',
  );
  const scrapingRepository = new MockScrapingRepository({
    calendar: 'https://example.com',
    timetable: 'https://example.com'
  });
  const jsonPath = './resource/urls.json';

  test('JSON が存在しない場合は新しく JSON ファイルを保存して終了すること', async () => {
    const localStorageRepository = new MockLocalStorageRepository({});
    const expected = '{"calendar":"https://example.com","timetable":"https://example.com"}';

    const useCase = new ObserveURLUseCase(
      localStorageRepository,
      networkRepository,
      scrapingRepository,
    );

    await useCase.execute();

    const actual = await localStorageRepository.load(jsonPath);
    expect(actual.toString('utf-8')).toBe(expected);
  });

  test('JSON が存在している場合は上書き保存して終了すること', async () => {
    const storedBuffer = Buffer.from('{"calendar":"https://sample.com","timetable":"https://sample.com"}');
    const localStorageRepository = new MockLocalStorageRepository({
      jsonPath: storedBuffer,
    });
    const expected = '{"calendar":"https://example.com","timetable":"https://example.com"}';

    const useCase = new ObserveURLUseCase(
      localStorageRepository,
      networkRepository,
      scrapingRepository,
    );

    await useCase.execute();

    const actual = await localStorageRepository.load(jsonPath);
    expect(actual.toString('utf-8')).toBe(expected);
  });
});