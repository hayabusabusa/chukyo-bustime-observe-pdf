# Repository Guidelines

## プロジェクト構成とモジュール

このリポジトリは、中京大学スクールバスの時刻表 PDF と URL の変更を監視する TypeScript 製 Node.js ユーティリティです。ソースコードは `src/` にあり、エントリーポイントは `src/index.ts` です。処理の流れは `src/usecase/`、外部 I/O や永続化は `src/repository/`、共有型と定数は `src/types/` に配置します。テストは対象コードの近くに `*.test.ts` として置きます。実行時入力と生成される比較画像は `resource/` にあり、`urls.json`、キャッシュ PNG、差分 PNG を含みます。ビルド成果物は `lib/` に出力されます。

`src/` 配下の主な構成は次の通りです。

```text
src/
  index.ts              # アプリケーションの起動処理
  repository/           # Network、LocalStorage、Pixelmatch、Scraping の実装とテスト
  types/                # URL、PNG サイズ、モック、レスポンス型などの共有定義
  usecase/              # PDF 監視と URL 監視のユースケース実装とテスト
```

## ビルド・テスト・開発コマンド

- `npm install`: `package-lock.json` に基づいて依存関係をインストールします。
- `npm run build`: `tsc -p .` を実行し、コンパイル結果を `lib/` に出力します。
- `npm test`: `src/` 配下の Jest テストを実行し、カバレッジを表示します。
- `npm start`: `ts-node` で `src/index.ts` を実行します。

GitHub Actions のテストワークフローは Node.js 18 を使い、`main` への push と pull request で `npm run test` を実行します。

## コーディングスタイルと命名規則

TypeScript の strict mode を前提に実装します。モジュールは小さく保ち、既存の責務分離に合わせてください。処理の組み立ては `src/usecase`、外部 API・ファイル操作などの I/O は `src/repository`、共有データ構造は `src/types` に置きます。クラスと exported type は PascalCase、変数とメソッドは camelCase、repository interface は `I...Repository` 形式にします。インデントは既存コードに合わせて 2 スペースです。新しいモジュールを追加する場合は、必要に応じて各ディレクトリの `index.ts` から named export してください。

## テスト方針

テストランナーは Jest と `@swc/jest` です。`ObservePDFUseCase.test.ts` や `PixelmatchRepository.test.ts` のように、対象ファイルの近くへ `Name.test.ts` 形式で追加します。repository のテストでは adapter の振る舞い、usecase のテストでは処理の組み立てを中心に確認します。変更前後で `npm test` を実行してください。カバレッジは自動収集されますが、明示的なしきい値は設定されていません。

## コミットと Pull Request

最近の履歴では `fix:` や `chore:` など、Conventional Commit 風の短い prefix が使われています。例: `fix: PDF の URL をスクレイピングする処理を修正`。Pull Request には変更内容、`resource/` 配下の更新有無、`npm test` の実行結果を記載してください。PNG の比較結果が変わる場合は、差分画像やスクリーンショットも添付すると確認しやすくなります。
