# 検証記録

## 2026-10-20: 初回コミット前確認（0.1.0）

- mainは未コミット・remoteなしの初期化済みrepo。manifest/runtimeと発行2ファイル、ZIP/feed、関連入力と成功ログのSHA256が実装時と一致。宣言の本体単体試験と固定EXE GUI8群での設定/画像/リボン確認、publish結果を再利用した。専用の製品コード追加や独自テスト基盤は不要。
- 本体標準は再利用154件と追加538件の692/692、WebApplet標準2/2、SDK影響先のWatch8/8・WindowsTools40/40・WallpaperSlideshow8群も成功。製品追加修正・再発行なし。[コミット検証](../AppDock.at365/.artifacts/commit-validation-profile-image-library-20261020/validation.json)と同フォルダーのstage/commit照合を参照。remote設定・push・Release・実利用deployは対象外。

## 2026-10-20: 初版0.1.0

- 独立repoのmainで実装。名前/アバターの共通設定と自己設定を開く宣言型リボンをmanifestへ定義し、runtimeは空のactivate/deactivateのみ。最低ホスト0.69.0。専用保存、画像コピー、UIや監視を持たない。旧値の自動移行なし。
- 本体の[レビュー](../AppDock.at365/.artifacts/profile-image-library-20261020/review.md)と[固定EXE GUI8群](../AppDock.at365/.artifacts/image-library-ui-1792449984611/result.json)で、独立設定の編集、画像選択、円形・画像のみのリボン、固定のアクセシブル名、ユーザー名の非表示と再起動保持を確認。元ソース2ファイルと発行2ファイルのhash一致を確認。
- publish.bat成功。update.zipは903 bytes / SHA256 ef6dabf61af3a4f923082b2ad7b4a7752b0b040550b8bfeda0fe58620cf4277e。ZIP/発行物/manifest/feedのID・版・最低ホスト・size・hash一致。PS1のUTF-8 BOM/CRLF、BATのCRLFを確認。commit/remote設定/push/Release/実利用deployなし。
- 証跡: [共通検証](../AppDock.at365/.artifacts/profile-image-library-20261020/validation.json)。原画像の登録応答は隔離dialog fixtureであり、物理ファイル選択・NASの実確認とは区別する。
