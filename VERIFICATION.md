# 検証記録

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
