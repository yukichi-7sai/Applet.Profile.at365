# 開発ガイド

[Applet API](../AppDock.at365/docs/extensions.md)、[Applet実装](../AppDock.at365/docs/applet-development.md)、[共通画像・リボン項目](../AppDock.at365/docs/registered-images.md)を正本とする。

Nodeのactivate/deactivateは空でよい。設定値と有効状態からのリボン投影、設定タブへの遷移、画像配信は本体の共通機能に委ねる。

`publish.bat`で`A:\40.ARTIFACT\Applet.Profile.at365`へ発行する。共通pack-applet-update.ps1でupdate.zip/update.jsonを作り、既存の配置スクリプトは上書きしない。deploy.batは発行物を使い、ソースから再ビルドしない。

本体の関連回帰と隔離GUIで設定・リボン・無効化を確認する。[検証記録](VERIFICATION.md)へ実行条件と結果を記録する。
