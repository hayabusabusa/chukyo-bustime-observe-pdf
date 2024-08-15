import axios from "axios";

/**
 * API などに通信を行う処理をまとめた Repository のインタフェース.
 */
export interface INetworkRepository {
  /**
   * URL に GET リクエストを行なって PDF のバイナリを取得する.
   */
  fetchPDF(url: string): Promise<Buffer>

  /**
   * API を利用して PDF を PNG に変換する.
   * @param rawPDFData PDF のバイナリ. 
   */
  convertPDFToPNG(rawPDFData: Buffer): Promise<Buffer>
}

/**
 * API などに通信を行う処理をまとめた Repository.
 */
export class NetworkRepository implements INetworkRepository {
  async fetchPDF(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' })

    if (response.status !== 200) throw Error(`Axios GET request was failed to [${url}] status = ${response.status}`);

    return Buffer.from(response.data, 'binary');
  }

  async convertPDFToPNG(rawPDFData: Buffer): Promise<Buffer> {
    const url = process.env.CLOUD_RUN_API_URL;

    if (url == null) throw Error(`URL [${url}] is invalid`);

    const data = {
      encoded: rawPDFData.toString("base64")
    };
    const headers = { 
      "Content-Type": "application/json" 
    };
    const response = await axios.post(url, data, { headers: headers });

    if (response.status !== 200) throw Error(`Axios POST request was failed to [${url}] status = ${response.status}`);

    return Buffer.from(response.data, 'base64');
  }
}