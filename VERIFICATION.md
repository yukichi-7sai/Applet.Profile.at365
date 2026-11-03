# 検証記録

## 2026-11-03 更新リポジトリの宣言（0.1.2）

- コミット前に配布フォルダーとZIPの全2ファイル、ソースmanifest、feedのサイズ・SHA256を再照合した。実装時の固定EXE・導入済み除外の成功記録と一致した。照合結果は本体 `.artifacts/commit-validation-catalog-cache-01270/applets.json`。

- `extension.json` に `updateRepository: yukichi-7sai/Applet.Profile.at365` を追加した。既存のmanifest項目を使う配布メタデータの変更としてパッチ更新した。
- 通常発行が成功。ソース、発行フォルダー、update.zip内のmanifestのID・版・更新元、feedとZIPのサイズ・SHA256が一致した。AppDock 0.127.0の固定EXEで同じ更新元を宣言した停止中Appletを取得前に除外した。証跡は本体の `.artifacts/catalog-cache-01270/applets-verified.json` と fixed-result.json。GitHub匿名APIは使用していない。

## 2026-11-02 Applet共通実行場所のコミット前照合

- 利用者の受け入れとコミット依頼を受け、今回のテスト基盤/開発文書2ファイルをコミット対象として再確認した。文書だけの変更として、ローカル参照・UTF-8・差分を確認した。製品回帰の追加実行は対象外。
- 実装入力1,249件・配布物706ファイル・成功ログと保存対象6,347ファイルのハッシュが一致し、不要コピー55組の整理結果も維持されている。入力や対象機能の変更がないため成功結果を再利用する。版更新・publish・pushは追加しない。
- 証跡は本repoの`.artifacts/commit-validation-applet-shared-runtime-20261102/` の `validation.json`、`stage.json`、`commit.json`。共同の照合結果はAppDock側の同フォルダーの `reuse.json` を参照する。

## 2026-11-02 テスト実行場所の共通化

- AppDock本体の共通EXEを利用し、既存の`--test-profile`等で本repoの設定・data・必要なextensionsと結果・ログを分離する。共通方式を開発手順へ接続した。
- 発行済みmanifestを無効のまま隔離profileへ読み込み、同じ固定EXEとprofile内のChromium状態を実機確認。独自の毎回の本体コピー処理がないものは固定build出力・既存のfixture方式を維持した。
- 不要と確認した旧成功コピー0組を整理した。ログ・設定・data・manifest・必要なfixtureは保持し、失敗・状態不明・保全用・固定build出力は削除しない。共通ヘルパーの52件、本体MCP7項目、8種類の分離・再起動保持、ランチャー2方式、ネイティブ2種類の検証結果と整理監査はAppDockの`.artifacts/applet-runtime-20261102/`を参照する。
- レビューではprofile境界・排他・配布物全体のSHA256・再起動・fixture保持・削除範囲を確認。テスト基盤と開発文書のみの変更で、製品の版更新・publishは対象外。コミット・pushは今回行わない。

## 2026-10-29: 情報metadataのコミット前照合

- icon/taglineと版の変更、配置manifest/entry、更新ZIP/feedを先行発行時の入力とSHA256へ照合し一致。本体0.101.9の固定EXEでも既存8Appletの情報表示を確認した。実装入力は不変で、先行の発行・表示試験を再利用し、追加の版更新・再発行は行わない。
- 共通レビューと再利用判断は`../AppDock.at365/.artifacts/commit-validation-applet-information-20261029/{review,reuse,validation}.json`、stage/commitとGitHub origin/mainの照合結果は同じ場所の`stage.json`・`commits.json`・`push.json`を参照する。先行の検証資料は保持。実サービス・実利用のApplet起動・GitHub Release・実利用deployは今回の検証対象外。

対象の現行版は`0.1.1`。以下は記録した条件での検証結果であり、外部サービスや実機条件の現在の動作保証とは区別する。

## 2026-10-29: Applet情報のアイコンとキャッチコピー 0.1.1

- main/追跡先とcleanを確認し、通常環境のpull --ff-only後に、manifestの任意表示情報 `icon: user` と `tagline: 名前とアバターで、自分らしく。` を設定。設定・コマンド・保存・権限・最低本体版は変更せず、0.1.0→0.1.1のパッチ更新として関連する版の正本を揃えた。発行前にmetadataと版の差分をレビューし、阻害事項なし。
- 標準publish.batで40.ARTIFACTへ発行。配置manifest/ZIP内manifest/feedのID・版・icon/tagline、ZIPのサイズ/SHA256を照合し成功。native/.NETはProductVersionも一致。本体0.101.6の固定EXEへ発行物をコピーし、停止状態で情報パネルの表示を確認した。通常のApplet起動や外部サービス・実入力は実行していない。
- 共通の入力・完全ログ・配布照合は`../AppDock.at365/.artifacts/applet-branding-20261029/`、本体の`VERIFICATION.md`、本repoの`.artifacts/applet-branding-20261029/validation.json`を参照。機能別の標準全回帰は今回実行せず、表示情報と配布の影響に必要な範囲を検証した。既存の再利用資料を保持し、今回の整理による削除なし。コミット/プッシュ/Release/実利用deployは行っていない。

## 2026-10-20: 初回コミット前確認（0.1.0）

- mainは未コミット・remoteなしの初期化済みrepo。manifest/runtimeと発行2ファイル、ZIP/feed、関連入力と成功ログのSHA256が実装時と一致。宣言の本体単体試験と固定EXE GUI8群での設定/画像/リボン確認、publish結果を再利用した。専用の製品コード追加や独自テスト基盤は不要。
- 本体標準は再利用154件と追加538件の692/692、WebApplet標準2/2、SDK影響先のWatch8/8・WindowsTools40/40・WallpaperSlideshow8群も成功。製品追加修正・再発行なし。[コミット検証](../AppDock.at365/.artifacts/commit-validation-profile-image-library-20261020/validation.json)と同フォルダーのstage/commit照合を参照。remote設定・push・Release・実利用deployは対象外。
