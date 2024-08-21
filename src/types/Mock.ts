import { 
  ILocalStorageRepository, 
  INetworkRepository, 
  IPixelmatchRepository,
  IScrapingRepository
} from "../repository";
import { PixelmatchResponse, ScrapedURL } from "../types";

export class MockLocalStorageRepository implements ILocalStorageRepository {
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

export class MockNetworkRepository implements INetworkRepository {
  constructor(
    readonly pdf: Buffer = Buffer.from(''),
    readonly png: Buffer = Buffer.from(''),
    readonly html: string = '',
  ) {}

  fetchPDF(url: string): Promise<Buffer> {
    return new Promise((resolved) => {
      resolved(this.pdf);
    });
  }

  fetchHTML(url: string): Promise<string> {
    return new Promise((resolved) => {
      resolved(this.html);
    });
  }

  convertPDFToPNG(rawPDFData: Buffer): Promise<Buffer> {
    return new Promise((resolved) => {
      resolved(this.png);
    });
  }
}

export class MockPixelmatchRepository implements IPixelmatchRepository {
  constructor(readonly response: PixelmatchResponse) {}

  match(lhsBuffer: Buffer, rhsBuffer: Buffer, size: { width: number; height: number; }): PixelmatchResponse {
    return this.response;
  }
}

export class MockScrapingRepository implements IScrapingRepository {
  constructor(private readonly urls: ScrapedURL | undefined) {}

  getURLs(html: string): ScrapedURL | undefined {
    return this.urls;
  }
}