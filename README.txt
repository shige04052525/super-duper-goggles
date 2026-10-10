GRANT HOME 共有版 v4.2（接続設定が必要）
1. https://console.firebase.google.com/ でプロジェクトを作成。
2. Firestore Database を作成（本番モード）。Firestore ルールに firestore.rules の内容を貼り付けて公開。
3. Firebase プロジェクト設定 → ウェブアプリを追加 → Firebase config の apiKey/authDomain/projectId/appId を firebase-config.js に記入。
4. このフォルダ内のファイルを静的ホスティング（Firebase Hosting 等）へアップロードし、HTTPS の URL を取得。
5. 公開した URL で開き、初回は設定画面から既存の JSON バックアップを読み込む（最初は空）。
6. 別端末で同じ URL を開き、同期を確認する。
重要：この設定では URL を知らない第三者も技術的にはデータにアクセス・編集・削除できます。顧客氏名・電話番号・売上等の機密データを入力しないでください。公開運用には認証とアクセス制御が必要です。
注意：全体を1文書として保存する簡易共有方式のため、同時編集時の競合や上書きがあり得ます。バックアップを頻繁に取得してください。実運用にはレコード単位の同期が必要です。
