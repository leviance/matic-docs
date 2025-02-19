---
id: faq
title: FAQ
sidebar_label: FAQ
description: Polygon Avail에 대해 자주 하는 질문
keywords:
  - docs
  - polygon
  - avail
  - availability
  - client
  - consensus
  - faq
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: faq
---

# 자주 묻는 질문 {#frequently-asked-questions}

:::tip

이 페이지에서 질문을 찾지 못하면 Polygon **[<ins>Availe Discord 서버에</ins>](https://discord.gg/jXbK2DDeNt)** 질문을 제출하십시오.

:::

## 라이트 클라이언트란 무엇입니까? {#what-is-a-light-client}

라이트 클라이언트는 사용자가 분산제와 보안을 유지하면서 전체 블록체인을 동기화하지 않아도 되므로 블록체인 네트워크와 상호 작용할 수 있습니다. 일반적으로 블록체인 헤더를 다운로드하지만 각 블록의 내용이 아닙니다. Avail(DA) 라이트 클라이언트는 블록의 작은 임의의 섹션이 다운로드된 기술인 데이터 가용성 샘플링을 수행하여 블록 콘텐츠를 사용할 수 있음을 추가로 확인합니다.

## 라이트 클라이언트의 대표적인 사용 사례는 무엇입니까? {#what-is-a-popular-use-case-of-a-light-client}

현재 전체 노드를 유지하기 위해 중개 사용자가 블록체인과 직접 통신하지 않고 대신 중개 사용자가 직접 통신할 수 있도록 많은 사용 사례가 있습니다. 라이트 고객은 데이터가 부족하기 때문에 지금까지 이 아키텍처에 적합한 교체가 되지 않았습니다. 못 해 왔습니다. Avail은 이 문제를 해결하여 더 많은 애플리케이션을 중간개인이 없는 블록체인 네트워크에 직접 참여할 수 있습니다. Avail은 전체 노드를 지원하지만, 대부분의 응용 프로그램이 하나를 실행할 필요가 있을 것으로 예상합니다.

## 데이터 가용성 샘플링은 무엇입니까? {#what-is-data-availability-sampling}

다른 라이트 클라이언트와 마찬가지로 Availe 라이트 클라이언트에게 Blockchain의 헤더만 다운로드하십시오. 그러나 블록 데이터의 작은 섹션을 무작위로 샘플링하고 검증하는 기술인 데이터 가용성 샘플링을 추가로 수행합니다. 어유람 코딩 및 케이트 다유닉 약속과 함께 Avail 고객은 사기 증명을 의지하지 않고 강력한 (거의 100%)을 제공할 수 있으며, 소수의 질의에 의존하지 않고 거의 100%의 검색어에 대한 인증을 제공할 수 있습니다.

## 데이터 가용성을 더 잘 보장하는데 삭제 코딩을 어떻게 사용하나요? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

Erasuration 코딩은 여러 개의 "shard"를 통해 정보를 퍼내는 방식으로 데이터를 인코딩하여 여러 개의 샤드의 손실을 용납 할 수 있습니다. 즉, 다른 카드로부터 정보를 재구성 할 수 있습니다. 블록체인에 적용되면 각 블록의 크기를 효과적으로 증가시킨다는 것을 의미합니다. 그러나 악의적인 액터가 블록의 일부를 중복 샤드 크기로 숨길 수 있다는 것을 방지합니다.

단일 거래조차 숨기려고 악의적인 액터가 블록의 상당 부분을 숨길 필요가 있으므로 랜덤 샘플링이 데이터의 큰 격차를 잡을 가능성이 훨씬 큽니다. 효과적으로, 어루밍 코딩은 데이터 유용성 샘플링 기법을 훨씬 더 강력합니다.

## Kate 커밋이란 무엇인가요? {#what-are-kate-commitments}

Kate 커밋은 2010년에 Aniket Kate, Gregory M. Zaverucha, Ian Goldberg 등이 소개한 것으로,
간결한 방식으로 다항식을 커밋하는 방법을 제공합니다. 다항식 커밋은 최근의 선두주자로서,
PLONL 같은 영지식 구조에 대한 커밋으로 주로 사용됩니다.

Polygon 구조는 다음과 같은 이유로 Kate 커밋을 사용합니다.

- 블록 헤더 안에 보관될 수 있도록 간결한 방식으로 값을 커밋할 수 있도록 해줍니다.
- 짧은 개시가 가능하여 라이트 클라이언트가 가용성을 확인하는 데 도움이 됩니다.
- 암호화 바인딩 속성은 사기 증명이 잘못된 커밋을 생성하는 것이 계산상으로 불가능하게 만들어
이를 피할 수 있도록 합니다.

앞으로 더 나은 바인딩이나 보증을 제공한다면 다른 다항식 커밋 구성을 사용할 수도 있습니다.

## Avail이 여러 애플리케이션에서 사용되므로, 체인은 다른 체인으로부터 트랜잭션을 다운로드해야 하나요? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

No. Availe 헤더에는 주어진 애플리케이션이 해당 애플리케이션에 대한 데이터를 가진 블록의 섹션만 결정하고 다운로드할 수 있는 인덱스를 포함합니다. 따라서 Avail을 동시에 또는 블록 크기에 따라 사용하여 다른 체인에 크게 영향을받지 않습니다.

유일한 예외는 데이터 가용성 샘플링입니다. 데이터를 사용할 수 있는지 확인하기 위해 고객은 임의의 부분에서 블록의 작은 부분을 샘플링합니다. 다른 애플리케이션에 대한 데이터를 포함하는 섹션을 포함하여 클라이언트들은 데이터를 포함하는 것일 수 있습니다.
