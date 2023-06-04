import * as fs from 'fs';

/**
 * ローカルにデータを保存する処理をまとめた Repository のインターフェース.
 */
export interface ILocalStorageRepository {
    /**
     * 指定されたローカルパスが存在するかどうかを確認する.
     * @param path ローカルファイル、フォルダのパス.
     */
    isExists(path: string): boolean

    /**
     * 指定されたローカルパスにバイナリデータを保存する.
     * @param path ファイル名込みのパス.
     * @param data バイナリデータ.
     */
    save(path: string, data: Buffer): Promise<void>

    /**
     * 指定されたローカルパスにバイナリデータを読み込みに行く.
     * @param path ファイル名込みのパス.
     * @returns バイナリデータ.
     */
    load(path: string): Promise<Buffer>

    /**
     * 指定されたローカルのパスに保存されているファイルを削除する.
     * @param paths ローカルのパス.
     */
    unlinkAll(paths: string[]): Promise<void>
}

/**
 * ローカルにデータを保存する処理をまとめた Repository.
 */
export class LocalStorageRepository implements ILocalStorageRepository {
    isExists(path: string): boolean {
        return fs.existsSync(path);
    }

    async save(path: string, data: Buffer): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(path, data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async load(path: string): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(path, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async unlinkAll(paths: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            paths.forEach((it) => {
                fs.unlink(it, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        });
    }
}