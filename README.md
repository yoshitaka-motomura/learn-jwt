# JWT 学習用

JWT(json web tokens)に関しての学習用です。概要などの説明となります。  
サンプルに用意しているプログラムに関してセキュリティリスクは考慮しておりません。

実際に JWT を利用する際にはセキュリティ等も考慮してご利用ください。

## セットアップ

```
docker-compose up -d
```

---

## 最初に

こちらの記載している情報は若干意訳も含めてた内容となります。またセキュリティリスクにかんしては、詳しく触れない為必ず下記の記事やサイトもあわせて閲覧してください。

> https://techblog.yahoo.co.jp/advent-calendar-2017/jwt/

## 概要

JWT(`json web tokens`)とは、最近ではデファクトスタンダードなアクセストークンとして利用されています。
クラウド（Google や AWS など）から API を経由してデータを取得する事が多くなりました。

それに伴いアクセストークンとして使われる事となったのは、JWT の特徴である`ステートレス`であることが大きいです。

`ステートレス`とは、文字通りサーバ側で状態は保存していません。

いままでも認証などを使ったシステムもありましたが、`session`や`cookie`などを利用して認証情報を管理していました。

ブラウザを介して接続することが前提な Web アプリケーションでそれで構いませんが、其れ意外の手段の場合では認証（固有情報）の情報を保持することができませんし、色々なシーンで利用する際には利用する手法として JWT が使われるようになっていきました。

さて、セッションなどであれば API 側で固有情報を元にデータを用意する事はできますが JWT ではどのように固有情報を管理しているのでしょうか？

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE1OTkwNjY2MjIsImV4cCI6MTU5OTA2NzUyMiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdC8iLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Iiwic3ViIjoiMSIsImp0aSI6IjZmZDFmYjYyLTQ5MmEtNDE3Ni1iY2E2LWVmOGNlN2Q2Njg3MCJ9.jvWDUIpF-Yg-ixrK5Osy2v8ce111I9DiOkKDAnfmBxQ
```

> https://jwt.io/

https://jwt.io/ で JWT を解析することができますので、実際に前述のトークンを解析してみましょう。

![JWTサンプル](./images/jwt.png)

---

解析すると 3 つのブロックになっていることがわかります。

`[header].[payload].[signature]`

つまり、JWT は Base64 デコードすればブロックごとに情報が取得する事ができることとなります。

もう少し詳しく JWT の説明をしたいとおもいます。

---

### header とは

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

文字通り、`header`はヘッダとなり、`alg`は署名を生成するアルゴリズム  が記載されています。サンプルの場合は`HMAC-SHA256`を使っているという意味になります。

`typ`に関してはトークンの種類を示すフィールドとなりますが、JWT を利用している場合には`JWT`とすることを推奨されています。

### payload とは

```
{
  "email": "test@example.com",
  "iat": 1599066622,
  "exp": 1599067522,
  "aud": "http://localhost/",
  "iss": "http://localhost",
  "sub": "1",
  "jti": "6fd1fb62-492a-4176-bca6-ef8ce7d66870"
}
```

`payload`はまさに認証データなどがあります。これらのフィールドは`claims`と呼ばれています。`claims`には`標準クレーム`と`カスタムクレーム`があります。

サンプルは`email`はカスタムクレームとなり、それ意外は`標準クレーム`となります。  
サンプルではド直球に`email`としていますが本来`payload`にユーザー自体を特定できるような情報は記載することは避けるべきです。
