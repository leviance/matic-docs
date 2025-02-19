---
id: avail-system-overview
title: システム概要
sidebar_label: System Overview
description: Availチェーンのアーキテクチャについて学ぶ
keywords:
  - docs
  - polygon
  - avail
  - data
  - availability
  - architecture
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-system-overview
---

# システム概要 {#system-overview}

## モジュール性 {#modularity}

現在、Ethereumのようなモノリシックブロックチェーンアーキテクチャは、実行、決済、データ可用性を効率的に処理することはできません。

ブロックチェーンをスケールするための実行をモジュール化するのは、ロールアップ中心のチェーンモデルが試みていることです。決済とデータ可用性のレイヤーが同じレイヤーにある場合、Ethereumロールアップが取れるアプローチであるとうまく機能することができます。それでも、データ可用性レイヤーのセキュリティに応じてロールアップ構築をより安全にすることができるため、ロールアップを操作する際に必要なトレードオフが可能ですが、スケールに困難になるためです。

しかし、細かなデザインによって、マイクロサービスのような軽量なプロトコルとなるように、異なるレイヤーを作成します。次に、ネットワーク全体が緩い結合の軽量プロトコルのコレクションになります。例としては、データ可用性に特化したデータ可用性レイヤーです。Polygon Availは、データ可用性のために基板ベースのレイヤー2ブロックチェーンです。

:::info Substrateランタイム

Availは基板コードベースに基づいているが、他の基板ネットワークとの相互作用を防ぐブロック構造を変更することも含まれています。Availは、PolkadotまたはKusamaとは無関係な独立したネットワークを実装しています。

:::

Availはあらゆるライトクライアントにデータ可用性を高める保証を提供していますが、他のどのネットワークよりもDAに関するライトクライアントに対しても高い保証をするものではありません。Availは、Kateの多項式のコミットメント、消去コーディング、その他の技術を活用して、ブロックデータがブロック全体をダウンロードすることなく利用できることを証明できるようにすることに焦点を当てています。これにより、少量のブロックデータ_を_効率的かつランダムにサンプルして完全な可用性を確認できるようになります。しかし、不正証拠ベースのDAシステムとは根本的に異なるプリミティブがあります。[ここ](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)に説明します。

### データの可用性の提供 {#providing-data-availability}

DA保証はクライアントが自分自身で決定するものであり、ノードを信頼する必要はありません。ライトクライアントの数が増えるにつれて、ブロック全体をまとめてサンプルします（各クライアントはわずかなパーセントしかサンプルしか実質的に見積もりません）。ライトクライアントは最終的に自分自身でP2Pネットワークを形成するため、ブロックをサンプルした後、アクセス可能になるつまり、ノードがダウン（またはブロックを検閲しようと）とても、ライトクライアントは自分自身でブロックを共有することによってブロックを再構築することができます。

### 次のソリューションセットの有効化 {#enabling-the-next-set-of-solutions}

チェーンがデータ可用性コンポーネントをAvailに割り当てることができるため、Availは次のレベルにロールアップします。Availは、スタンドアロンチェーンをブートストラップする方法を提供しています。チェーンがデータ可用性をオフロードできるため、スタンドアロンチェーンをブートストラップする方法を提供しています。もちろん、異なるモジュール性アプローチで作られたトレードオフがありますが、全体的な目標は、スケールできるとともに高いセキュリティを維持することです。

トランザクションコストも削減されます。Availは、モノリシックチェーンよりもバリデータワークロードに影響を与えることが少なく、ブロックサイズを増やすことができます。モノリシックチェーンがブロックサイズを増やす場合、ブロックを実行し、ステートを計算する必要があるため、バリデータはより多くの作業をする必要があります。Availには実行環境がないため、ブロックサイズを増やす方がはるかに安いです。KZGのコミットメントを計算して証明を生成する必要があるため、コストはゼロではありませんが、安価です。

Availはまた、ソブリンロールアップを可能にします。ユーザーは、トランザクションデータと秩序に合意するように、Availのバリデータに依存するソブリンチェーンを作成することができます。Availでのソブリンロールアップは、ユーザーはアプリケーション固有のノードにアップデートしてチェーンをアップグレードすることができ、新しい決済ロジックにアップグレードできるため、シームレスなアップグレードが可能です。一方、従来の環境では、ネットワークにはフォークが必要です。

:::info Availに実行環境がありません

Availはスマートコントラクトを実行していませんが、他のチェーンでは、Availを通じてトランザクションデータを利用できるようにすることができます。これらのチェーンは、EVM、Wasm、または他のどのような種類の実行環境を実装することができます。

:::

Availでのデータ利用は、必要とされる時間のウィンドウで利用できます。たとえば、データや再構築を必要としないだけで、セキュリティを侵害することはありません。

:::info Availは、データの用途に関係ありません

Availはブロックデータが利用可能なことを保証しますが、そのデータが何であるかについては気にしません。データはトランザクションであることがありますが、他のフォームも受け取ることができます。

:::

一方、ストレージシステムは、データを長期間保存するように設計されており、ユーザーにデータを保存することを奨励するためのインセンティブメカニズムが含まれています。

## 検証 {#validation}

### ピアの検証 {#peer-validation}

通常、次の三種類のピアがエコシステムを構成します：

* **バリデータノード：**バリデータは、メールプールからトランザクションを収集し、実行し、ネットワークに追加される候補ブロックを生成します。ブロックには、ブロック内のトランザクションのダイジェストとメタデータが付いている小さなブロックヘッダーが含まれています。
* **フルノード：**候補ブロックは、検証のためにネットワーク全体でフルノードに伝播します。ノードは、候補ブロックに含まれるトランザクションを再実行します。
* **ライトクライアント：**ライトクライアントは、検証のために使用するブロックヘッダーを取得するだけであり、必要に応じて隣接するフルノードからトランザクションの詳細を取得します。

安全なアプローチが可能である一方、Availは堅牢性と保証の強化を図るため、このアーキテクチャの制限を取り組んでいます。ライトクライアントは、基礎となるデータが利用できないブロックを受け入れるようにすることができます。ブロックプロデューサーは、悪意のあるトランザクションをブロックに含めることができ、そのコンテンツをネットワークに公開することはできません。Availドキュメントで説明したように、データ利用の問題として知られている。

Availのネットワークピアには次のものがあります：

* **バリデータノード：**プロトコルがコンセンサスに参加するフルノードにインセンティブを与えます。Availのバリデータノードはトランザクションを実行しません。任意のトランザクションをパッケージ化し、候補ブロックを構築し、データに対するKZGコミットメントを生成します。**他のバリデータでは、生成されたブロックが正しいか確認**します。

* **Avail（DA）フルノード：**Availを使用してすべてのアプリケーションですべてのブロックデータをダウンロードして利用可能にするノード。同様に、Availフルノードはトランザクションを実行しません。

* **Avail（da）ライトクライアント：**ブロックヘッダーをダウンロードするだけのクライアントは、ブロックの小さな部分をランダムにサンプルして、可用性を確認します。Availネットワークとやり取りするためのローカルAPIを公開します。

:::info Availの目標は、フルノードに依存せずに、データを使用可能な状態に保つことです

目的は、フルノードとしてライトクライアントに同様のDA保証を与えることです。ユーザーには、Availライトクライアントを使用することを推奨します。しかし、Availフルノードを実行できます。これは十分にサポートされています。

:::

:::caution ローカルAPIは作業中であり、まだ安定していません


:::

これにより、Availを使用したいアプリケーションは、DAライトクライアントを埋め込むことができます。次のように構築できます：

* **アプリフルノード**
  - Avail（DA）ライトクライアントの埋め込み
  - 特定のアプリIDのすべてのデータのダウンロード
  - トランザクションを実行するための実行環境の実装
  - アプリケーションの状態の維持

* **アプリライトクライアント**
  - Avail（DA）ライトクライアントの埋め込み
  - エンドユーザー向け機能の実装

Availエコシステムには、特定のユースケースを可能にするブリッジも備えています。この時点で設計されているブリッジの1つは、Availで入手可能なデータをEthereumに投稿する_証拠ブリッジ_です。

## 状態の検証 {#state-verification}

### ブロック検証→DA検証 {#da-verification}

#### バリデータ {#validators}

アプリケーションステートを検証する代わりに、投稿されたトランザクションデータの可用性を確保し、トランザクション注文の提供に集中しています。ブロックは、そのブロックの背後にあるデータが使用可能な場合にだけ有効と見なされます。

Availバリデータは、受信トランザクションを受信し、それらを注文し、候補ブロックを構築し、ネットワークに提案します。ブロックには、特にDA（消去コードとKZGのコミットメント）のための特別な機能が含まれています。これは特定のフォーマットであるため、クライアントはランダムなサンプリングを実行し、1つのアプリケーションのトランザクションのみをダウンロードすることができます。

他のバリデータは、ブロックが適切に形成されていること、KZGコミットメントがチェックアウトされていること、データがそこにあることなどを確認することによって、ブロックを検証します。

#### クライアント {#clients}

データが利用できるようにする必要があるため、ブロックプロデューサーがブロックヘッダーを公開することなく公開することを防ぐため、アプリケーションの状態を計算するために必要なトランザクションを読み取ることができないためです。他のチェーンと同様に、Availはデータ可用性検証を使用して消去コードを使用するDAチェックを介してこれに対処します。これらのチェックはデータ冗長設計に大きく使用されます。

消去コードは、ブロックの一部を抑制した場合、ブロックの一部を使用してその部分を再構築することができます。つまり、その部分を非表示にしようとするノードは、さらに多くの部分を非表示にする必要があるということです。

> この手法は、CD-ROMやマルチディスク(RAID)アレイなどのデバイスで使用されています（例えば、ハードドライブが故障した場合は他のディスク上のデータを基に置き換えて再構築することができます）。

Availについてユニークな点は、チェーンデザインによりデータをダウンロードすることなく**、誰で**もDAをチェックできるということです。DAチェックでは、各ライトクライアントにチェーン内の各ブロックからランダムなチャンクをサンプルする必要があります。一連のライトクライアントは、この方法でブロックチェーン全体をまとめてサンプルすることができます。その結果、コンセンサスされていないノードが多いほど、ブロックサイズ（およびスループット）が安全に存在する可能性があります。つまり、コンセンサスされていないノードは、ネットワークのスループットとセキュリティに貢献することができます。

### トランザクション決済 {#transaction-settlement}

Availは、Polygonエッジで構築された決済レイヤーを使用します。決済レイヤーは、データを保存し、紛争解決を実行するためのロールアップのためのEVM互換ブロックチェーンを提供します。決済レイヤーは、DAのためにPolygon Availを使用しています。ロールアップが決済レイヤーを使用している場合、AvailのすべてのDAプロパティを継承します。

:::note さまざまな決済方法

Availを使用する方法は異なりますが、バリディウムでは決済レイヤーを使用するのではなく、Ethereumで決済することができます。

:::

Availは、データのホスティングとオーダーを提供します。実行レイヤーは、複数のオフチェーンスケーリングソリューションまたはレガシーの実行レイヤーから来る可能性があります。決済レイヤーは、検証および紛争解決のコンポーネントを取ります。

## リソース {#resources}

- [PolygonによるAvailの入門。](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
- [Polygonトーク：Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
