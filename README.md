# JWT 学習用

JWT(json web tokens)に関しての学習用です。概要などの説明となります。  
サンプルに用意しているプログラムに関してセキュリティリスクは考慮しておりません。

実際に JWT を利用する際にはセキュリティ等も考慮してご利用ください。

## セットアップ

```
docker-compose up -d
```

## 概要

JWT は下記のような文字列同士の構造体でできています。

`[header].[payload].[signature]`、実際のトークンを見ると下記のような文字列になります。

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE1OTkwNjY2MjIsImV4cCI6MTU5OTA2NzUyMiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdC8iLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Iiwic3ViIjoiMSIsImp0aSI6IjZmZDFmYjYyLTQ5MmEtNDE3Ni1iY2E2LWVmOGNlN2Q2Njg3MCJ9.jvWDUIpF-Yg-ixrK5Osy2v8ce111I9DiOkKDAnfmBxQ
```
