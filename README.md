# Next.jsのテンプレート

## コンセプト

### Storybookを軸にコンポーネントを開発する

コンポーネントをcontainerとpresenterに分離することで、副作用を局所化する。

### 型安全にコンポーネントを開発する

外部APIとの通信時は、必ず型ガードを利用する。

### コンポーネントの分類を簡潔にする

コンポーネントを新規に作成する時や、既存のコンポーネントから目的のコンポーネントを探す時に、開発者が迷わないような構成にする。

### ライブラリ・フレームワークのリプレースをできるだけ容易にする

ライブラリ・フレームワークの機能による実装は特定のディレクトリに分離して、別で定義したインターフェイスをもとに実装する。

### 上記のコンセプトを実現するために必要な退屈な作業は、scaffoldを利用して極力自動化する

コンポーネントの雛形、storybookの雛形、型ガード生成の自動化など。

## ディレクトリ構成

```plain text
src
├── api
│   └── [api name]
│       ├── request.ts
│       ├── response.ts
│       └── index.interface.ts
├── component
│   ├── hooks
│   ├── container
│   │   └── [container component name]
│   │       ├── hooks
│   │       └── index.tsx
│   ├── function
│   │   └── [function component name]
│   │       ├── hooks
│   │       └── index.tsx
│   └── presenter
│       ├── data-display
│       │   └── [presentational component name]
│       │       ├── hooks
│       │       ├── index.module.css
│       │       ├── index.stories.tsx
│       │       └── index.tsx
│       ├── data-entry
│       │   └── [presentational component name]
│       ├── feedback
│       │   └── [presentational component name]
│       ├── general
│       │   └── [presentational component name]
│       ├── navigation
│       │   └── [presentational component name]
│       ├── other
│       │   └── [presentational component name]
│       └── template
│           └── [presentational component name] or more nest
└── lib
    └── [library name]
```

### `api`

外部APIなどのインターフェイスを置く。

たとえば外部APIとの通信の処理は、以下のような構成になる。

- `api`でインターフェイスを書く
- `lib`でインターフェイスを実装する
- `component`配下のカスタムフック等で実装を利用する

`yarn scaffold:api`で雛形を自動生成する。

### `component`

JSX（+cssなどによるスタイリング）とカスタムフックを置く。

`hooks`ディレクトリ内のカスタムフックは、そのディレクトリかそれより下のディレクトリのコンポーネントから利用される。

#### `presenter`

副作用（外部との通信、Contextとの接続など）がないコンポーネントを置く。

（外部から取得した）値を表示するためのコンポーネントは`data-display`、値を入力するためのコンポーネントは`data-entry`など、利用目的に応じてコンポーネントを配置するディレクトリを選ぶ（[Ant DesignのComponents Overview](https://ant.design/components/overview/)を参照）。`template`には、複数の`presenter`コンポーネントを組み合わせたコンポーネントを置く。`template`内のディレクトリ構成についてはプロジェクトによって要検討。

`yarn scaffold:presenter`で雛形を自動生成する。

#### `container`

副作用（外部との通信、Contextとの接続など）がある処理を行い、処理の結果もしくは処理のトリガーを`presenter`のコンポーネントに渡す。

`yarn scaffold:container`で雛形を自動生成する。

#### `function`

`Context.Provider`など、見た目を持たないコンポーネントを置く。

### `lib`

axiosやfirebaseなどのライブラリを使用する処理はここで書く。
