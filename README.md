# lens-comparison-tool-by-tdp

レンズデータを気軽に比較するためのツール

## How to use

- 当アプリは、Python サーバー＋ React クライアントから成ります
- Python サーバーは、`requirements.txt`に従い必要なライブラリを入れた後、`python3 main.py`だけで起動します
  - デフォルトでは 5000 番ポートに陣取ります
- レンズ名を選択 → カメラ名を選択 → 焦点距離を選択 →F 値を選択、で、画面右にその状態におけるチャートの撮影結果が出ます
  - 撮影結果は上から順に、画面中央・中心と角との間の中間地点・角のものです
- React クライアントは、`lens-comparison-tool-by-tdp`ディレクトリ内にソースコードがあります
  - `yarn`でパッケージ管理しているのでそのまま`yarn install --frozen-lockfile`してから`yarn start`で起動します
  - `yarn build`で成果物を作り、任意の Web サーバーで展開し、Python サーバー側を叩いてもいいです
  - 成果物は、そのまま Python サーバー(Flask)側で返すようにも可能。その場合、次の手順を行ってください
    - `yarn build`で作った成果物のうち、
      - `lens-comparison-tool-by-tdp/build/index.html`については、`templates`ディレクトリに設置
      - `lens-comparison-tool-by-tdp/build/static/css`については、`static`ディレクトリに設置
      - `lens-comparison-tool-by-tdp/build/static/js`については、`static`ディレクトリに設置
      - `lens-comparison-tool-by-tdp/build/static/<その他ファイル>`については、`static`ディレクトリに設置
- Python サーバー側の、`main.py`があるディレクトリに、`database.db`というファイルが作成されます
  - SQLite3 形式。内容としてはデータキャッシュですね。無駄な負荷を元サイトに掛けないように……
- Web ブラウザのローカルストレージ上にもキャッシュを作成しますので、使っていくうちに高速化されます
  - 妙に読み込みが多い、もしくは読み込みが止まった場合は、ページをリロードして最初からやり直して下さい
