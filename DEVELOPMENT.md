# 開発ガイド

機能の説明・操作方法・設定・既定値・動作環境は[機能・操作・設定](docs/usage.md)を参照してください。共通の文書構成は[ドキュメント方針](../AppDock.at365/docs/documentation.md)に従います。

[Applet API](../AppDock.at365/docs/extensions.md)、[Applet実装](../AppDock.at365/docs/applet-development.md)、[共通画像・リボン項目](../AppDock.at365/docs/registered-images.md)を正本とする。

Nodeのactivate/deactivateは空でよい。設定値と有効状態からのリボン投影、設定タブへの遷移、画像配信は本体の共通機能に委ねる。

## ビルド・発行

Windowsと.NET 10 SDK、隣のAppDock.at365ソースが必要です。変換工程はなく、repo直下で`publish.bat`を実行してindex.cjs・extension.json・resourcesを梱包します。

`publish.bat`で`A:\40.ARTIFACT\Applet.Profile.at365`へ発行する。共通pack-applet-update.ps1でupdate.zip/update.jsonを作る。実利用先へ配置する場合はAppDockを完全終了し、発行した`extensions/at365.profile`を配置先の同名フォルダーへコピーする。

本体の関連回帰と隔離GUIで設定・リボン・無効化を確認する。[検証記録](VERIFICATION.md)へ実行条件と結果を記録する。

## 翻訳

[Appletの翻訳基盤](../AppDock.at365/docs/applet-localization.md)を使用する。日本語の基本辞書は`resources/translations/applet.json`、英語辞書は`applet_en.json`。manifestの表示文言を翻訳参照にし、言語変更時の更新は本体に委ねる。表示名とリボン名は日英とも`Profile`。保存する名前・画像参照・設定ID・既定の名前は翻訳しない。

本体をビルド済みの状態で、本体の`dev.bat exec node --test ../Applet.Profile.at365/tests/*.test.cjs`を実行する。GUIは`dev.bat exec node ../Applet.Profile.at365/scripts/test-localization-ui.cjs <本体EXE> [Applet配布フォルダー]`で、発行済み本体と指定したAppletを隔離profileへ読み込む。Appletフォルダー省略時はこのrepoを使う。

## 共通の運用

文書構成・生成物・版更新・配布は[共通手順](../AppDock.at365/docs/development-workflow.md)、[文書方針](../AppDock.at365/docs/documentation.md)、[発行と配置](../AppDock.at365/docs/publishing.md)、[更新パッケージ](../AppDock.at365/docs/updates.md)、[生成物の整理](../AppDock.at365/DEVELOPMENT.md#作業完了時のテストフォルダー整理)を参照する。Applet固有の実行条件と結果は[検証記録](VERIFICATION.md)へ記載する。

## テストの共通実行場所

GUI試験のAppDockは[共通実行場所](../AppDock.at365/docs/testing.md#固定配布物の共通実行場所)を使い、本repoの`.artifacts`をprofile保存rootとして明示します。既存の`--test-profile`等で設定・data・必要なextensionsと結果・ログを分離します。固定build出力を使う試験には追加コピーを作りません。
