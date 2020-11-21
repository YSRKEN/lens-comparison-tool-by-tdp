# lens-comparison-tool-by-tdp

レンズデータを気軽に比較するためのツール

## How to use

- 当アプリは、Python サーバー＋ React クライアントから成ります
- Python サーバーは、`requirements.txt`に従い必要なライブラリを入れた後、`python3 main.py`だけで起動します
  - デフォルトでは 5000 番ポートに陣取ります
- React クライアントは、`lens-comparison-tool-by-tdp`ディレクトリ内にソースコードがあります
  - `yarn`でパッケージ管理しているのでそのまま`yarn install --frozen-lockfile`してから`yarn start`で起動します
  - `yarn build`で成果物を作り、任意の Web サーバーで展開し、Python サーバー側を叩いてもいいです
  - 成果物は、そのまま Python サーバー(Flask)側で返すようにも可能。少し Python 側コードの手直しが必要
- Python サーバー側の、`main.py`があるディレクトリに、`database.db`というファイルが作成されます
  - SQLite3 形式。内容としてはデータキャッシュですね。無駄な負荷を元サイトに掛けないように……
