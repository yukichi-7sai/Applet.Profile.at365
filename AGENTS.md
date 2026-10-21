# Profile Appletの作業ルール

[共通作業ルール](../AGENTS.md)、[AppDockの技術情報](../AppDock.at365/AGENTS.md)、[Applet実装ガイド](../AppDock.at365/docs/applet-development.md)を確認する。

設定・画像・リボンはmanifestで宣言し、本体内部やElectronを参照しない。プロフィール専用の保存、画像コピー、定期監視、設定画面を追加しない。原画像とグループはホストの共通画像ライブラリーを使う。

本体の[共通画像とリボンの契約](../AppDock.at365/docs/registered-images.md)を参照する。READMEはインストール方法とビルド方法だけとし、機能・操作・設定・既定値はdocs/usage.md、開発文書の入口と発行手順はDEVELOPMENT、実測はVERIFICATIONへ記録する。変更時の版更新・publishは[共通手順](../AppDock.at365/docs/development-workflow.md)に従う。
