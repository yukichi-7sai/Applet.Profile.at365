# 検証記録

## 2026-11-06 翻訳対応（0.2.0）

- manifestの表示文言9項目を本体の翻訳参照へ移し、resources/translations/applet.json（日本語）とapplet_en.json（英語）を同梱した。表示名・リボン名は従来のProfileを維持する。保存する名前、既定値の「ユーザー」、画像参照、設定ID・リボンIDと動作、空のactivate/deactivateは変更していない。言語変更と外部辞書の優先は本体の共通基盤へ委ねる。
- 発行前に表示文言の対象漏れ、保存値との境界、辞書のキー一致、配布・最低ホスト版・文書をレビューし、阻害指摘なし。最低ホスト版を0.69.0→0.159.0へ引き上げるため、Appletは0.1.3→0.2.0のマイナー更新。本体と他Appletのソース・版は変更していない。
- 本体の固定Node 26.13.0/pnpm 12.15.0をdev.bat経由で使用し、Profile標準試験3/3件、書式・PS1構文/UTF-8 BOM/CRLF・差分・文書リンク検査が成功。試験は日英の全宣言、未対応言語時の本体基本言語、データとリボン契約、実Updaterによる自身の辞書だけの展開計画を確認する。初回の展開計画fixtureは配布元内に配置先を作って正しく拒否されたため、実導入と同じ独立したstage/hostへ修正した。最終unit-published.logは終了0、失敗・取消・skip各0。
- AppDock 0.159.0の固定EXEと共用ランタイムを使い、ソースAppletと発行済みAppletでGUI各3群が成功。手動配置で辞書をコピーせず日英を表示し、言語変更中の同じ入力要素と未確定の文字列、Enter保存、SVG画像の選択・保管参照・原画像、画像だけのリボン、停止中の翻訳、再有効化と再起動後の値、部分的な外部辞書から同梱辞書への補完を確認した。初回はSVGをimg要素とする試験の誤りで失敗し、本体の正規のmask描画も認める検査へ修正した。製品変更は不要。明暗・通常幅/900px指定で実画面を目視し、狭幅でも入力欄へ到達できることを確認した。
- 英語切替のGUIは隔離profileに部分的なhost_en.jsonを置いた。Appletが言語一覧を増やす仕様にはしていない。本体の辞書が日本語だけの場合のフォールバックは標準試験で確認済み。利用者による手動確認、実ネットワークの更新配信、他Appletと本体の全回帰は未実施。更新・復旧エンジン自体は今回変更していない。
- publish.bat終了0、A:\40.ARTIFACT\Applet.Profile.at365へ0.2.0をローカル発行。ソース・配布フォルダー・ZIP内の4ファイルがSHA256一致し、manifest/feedのID・版・minimumHostVersionが一致。ZIPは1,652 bytes、SHA256=e25f4945472803f02cebeebe72dcb05a7e1962532b2e65331a2705dc2682e7a5。本体EXE SHA256=4e7d75ff4a16e03b09e754e7ba50cfd40c36e145175273afb96e220878187181。発行後の変更は試験と本記録のみで、製品4ファイルは不変。
- 証跡は.artifacts/localization-020/（入力・環境・レビュー・全ログ・配布物hash）。成功GUIはlocalization-ui-hRmfYY（ソース）とlocalization-ui-Jy5nog（配布物）、初回失敗はlocalization-ui-4AxEAB。専用本体EXEのコピーはなく、成功分は方式別3件以内のため削除なし。共用runtime、画像・設定・結果と失敗証跡を保持し、試験プロセスの終了を確認した。今回の翻訳移行を独立したローカルコミットにまとめ、stage treeとcommit treeを照合する。push・Release・実利用先配置は行わない。

## 2026-11-03 配置ツール整理のコミット前照合

- 実装時の最終差分と削除状態、試験入力・成功ログ・発行先185ファイルのSHA256を照合した。関連試験6件と構文・参照検査の成功を再利用し、追加の製品回帰・再発行は行っていない。
- 共通指示と本体・8Appletの今回差分だけをコミット対象とした。再利用判定、stage treeとcommit treeの照合結果は`../AppDock.at365/.artifacts/commit-validation-deploy-removal-20261103/`に保存する。push・Release・実利用先配置は行わない。

## 2026-11-03 開発用配置スクリプトの除去

- deployment一式と40.ARTIFACT内の配置用スクリプト・記入例・配置先設定を、存在する範囲で削除した。publishから専用コピー処理を外し、開発文書と不要なGit除外規則を整理した。
- 差分レビューで既存のビルドと更新ZIP/JSON生成を保持していることを確認した。変更スクリプトの構文・現行の廃止ファイル参照・git diff --checkと、本体を含む全9repoの発行先計算を確認した。発行先の配置ツール以外のファイルは削除前後のSHA256が一致した。
- 製品コード・manifest・依存・設定/保存仕様と配布payloadは変更していない。開発用配置ツールの整理として製品版更新・再ビルド・再発行なし。製品回帰・GUI・実利用先配置・commit・push・Releaseは実施していない。共通の削除一覧・ハッシュ・検証結果は../AppDock.at365/.artifacts/deploy-removal-20261103/を参照する。過去の検証記録は履歴として保持する。

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
