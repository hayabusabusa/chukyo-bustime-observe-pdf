import { JSDOM } from "jsdom";

import { ScrapedURL } from "../types";

/**
 * スクレイピングして情報を抜き出す Repository.
 */
export interface IScrapingRepository {
  /**
   * 大学のバスの PDF 一覧のページから必要な URL 一覧を抜き出す.
   * @param html HTML を文字列にしたもの.
   * @returns URL の一覧.
   */
  getURLs(html: string): ScrapedURL | undefined;
}

export class ScrapingRepository implements IScrapingRepository {
  getURLs(html: string): ScrapedURL | undefined {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // NOTE: `querySelectorAll` で `ul`　配下の `a class="pdf"` という要素を取得してくる.
    const urls = Array.from(document.querySelectorAll(`a[class="pdf"]`))
      .map(element => element.getAttribute('href'))
      .filter((url): url is string => url != null);
    
    const calendarPath = urls.find(url => url.includes('buscallender'));
    // URL の配列から `bustime20240523` のような `bustime` で始まり、後ろに数値が続くものを取得する.
    const timetablePath = urls.find(url => url.includes('bustime') && url.match(/bustime\d+/));

    if (calendarPath == null || timetablePath == null) {
      return undefined;
    }

    // `href` からだとパスしか取れないので `https://www.chukyo-u.ac.jp` をつけて URL にする.
    return {
      calendar: `https://www.chukyo-u.ac.jp${calendarPath}`,
      timetable: `https://www.chukyo-u.ac.jp${timetablePath}`
    };
  }
}