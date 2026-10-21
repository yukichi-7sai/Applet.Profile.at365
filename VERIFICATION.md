# 検証記録

対象の現行版は`0.1.0`。以下は記録した条件での検証結果であり、外部サービスや実機条件の現在の動作保証とは区別する。

## 2026-10-20: 初回コミット前確認（0.1.0）

- mainは未コミット・remoteなしの初期化済みrepo。manifest/runtimeと発行2ファイル、ZIP/feed、関連入力と成功ログのSHA256が実装時と一致。宣言の本体単体試験と固定EXE GUI8群での設定/画像/リボン確認、publish結果を再利用した。専用の製品コード追加や独自テスト基盤は不要。
- 本体標準は再利用154件と追加538件の692/692、WebApplet標準2/2、SDK影響先のWatch8/8・WindowsTools40/40・WallpaperSlideshow8群も成功。製品追加修正・再発行なし。[コミット検証](../AppDock.at365/.artifacts/commit-validation-profile-image-library-20261020/validation.json)と同フォルダーのstage/commit照合を参照。remote設定・push・Release・実利用deployは対象外。
