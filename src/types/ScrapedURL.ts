/**
 * スクレイピングで抜き出した URL の情報.
 */
export interface ScrapedURL {
  /**
   * 運行カレンダー PDF の URL.
   */
  calendar: string;

  /**
   * 時刻表 PDF の URL.
   */
  timetable: string;
}