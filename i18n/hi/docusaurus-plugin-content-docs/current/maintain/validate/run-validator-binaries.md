---
id: run-validator-binaries
title: Binaries से वैलिडेटर नोड रन करें
sidebar_label: Using Binaries
description: अपने वैलिडेटर नोड को सेट करने के लिए बाइनरी का इस्तेमाल करें
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
इस गाइड में स्टेप्स में पूरी तरह से सिंक करने के लिए H**eimdall **और **बोर** सेवाओं का इंतजार शामिल है. वैकल्पिक रूप से, आप एक अनुरक्षित स्नैपशॉट का इस्तेमाल कर सकते हैं, जो सिंक करने के समय को कम करके कुछ घंटों तक ले आएगा. विस्तृत निर्देश के लिए, [<ins>हेम्डल और बोर के लिए स्नैपशॉट निर्देश</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233) देखें.

स्नैपशॉट डाउनलोड लिंक के लिए, [<ins>पॉलीगॉन चेन स्नैपशॉट</ins>](https://snapshot.polygon.technology/) देखें.

:::

यह गाइड बायनरी से पॉलीगॉन वैलिडेटर नोड चलाने की प्रक्रिया बताएगी.

सिस्टम की आवश्यकताओं के लिए, [वैलिडेटर नोड सिस्टम की](validator-node-system-requirements.md) आवश्यकताओं का गाइड, का पालन करें.

अगर आप अननोन के माध्यम से वैलिडेटर नोड को शुरू करना चाहते हैं, तो देखिए [कि अननोन के साथ एक वैलिडेटर नोड रन देखें](run-validator-ansible.md).

:::caution

नए वैलिडेटरों को स्वीकार करने के लिए जगह सीमित है. नए वैलिडेटर पहले से ही सक्रिय वैलिडेटर unbonds. में शामिल हो सकते हैं.

:::

## आवश्यक शर्तें {#prerequisites}

* दो मशीनें — एक [सेंट्री](/docs/maintain/glossary.md#sentry) और एक [वैलिडेटर](/docs/maintain/glossary.md#validator).
* `build-essential`सेंट्री और वैलिडेटर दोनों मशीनों पर इंस्टॉल हो.

 इंस्टाल करने के लिये:

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18 सेंट्री और वैलिडेटर दोनों मशीनों पर इंस्टॉल हो.

 इंस्टाल करने के लिये:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ सेंट्री और वैलिडेटर दोनों नोड पर स्थापित हो.

 RabbitMQ को स्थापित करने के कमांड इस प्रकार हैं:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

 RabbitMQ को डाउनलोड और स्थापित करने से जुड़ी अधिक जानकारी के लिए [<ins>यहाँ</ins>](https://www.rabbitmq.com/download.html)क्लिक करें.

:::


:::info
कृपया अपने नोड्स को bloXroute के गेटवे से जोड़ने के लिए bloXroute के [<ins>निर्देश</ins>](/maintain/validate/bloxroute.md) पर क्लिक करें
:::

## ओवरव्यू {#overview}

एक रनिंग वैलिडेटर नोड के लिए, निम्नलिखित को **स्टेप के इसी क्रम** में करें:

:::caution

इन स्टेप का क्रम बदलने पर आपके सामने कॉन्फ़िगरेशन से जुड़ी समस्याएँ आ सकती हैं. यह ध्यान रखना जरूरी है कि सेंट्री नोड, वैलिडेटर नोड के पहले सेट अप किया जाना चाहिये.

:::

1. दो मशीनें तैयार करें, एक सेंट्री नोड के लिए और एक वैलिडेटर नोड के लिए.
2. सेंट्री और वैलिडेटर मशीनों पर हेम्डल और बोर बायनरी इंस्टॉल करें.
3. सेंट्री और वैलिडेटर मशीनों पर हेम्डल और बोर सेवा फाइलों का सेट अप करें.
4. सेंट्री और वैलिडेटर मशीनों पर हेम्डल और बोर सेवा फाइलों का सेट अप करें.
5. सेंट्री नोड कॉन्फ़िगर करें.
6. सेंट्री नोड शुरू करें.
7. वैलिडेटर नोड कॉन्फ़िगर करें.
8. ओनर और साइनर की सेट करें.
9. वैलिडेटर नोड शुरू करें.
10. समुदाय के साथ नोड स्वास्थ्य जाँचें.

## बायनरी इंस्टॉल करना {#installing-the-binaries}

सेंट्री और वैलिडेटर दोनों मशीनों के लिए बायनरी इंस्टॉल करें.

### हेम्डल इंस्टॉल करना {#installing-heimdall}

[हेम्डल](/docs/pos/heimdall/overview) प्रूफ-ऑफ़-स्टेक का सत्यापन करने वाली लेयर है,
यह एथेरेयम मेंनेट में प्लाज़्मा ब्लॉक को दिखाने के लिए चेकपॉइंटिंग के लिए ज़िम्मेदार है.

नवीनतम संस्करण, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) में कुछ enhancements The शामिल हैं जैसे :
1. स्टेट सिंक txs में डेटा के आकार को इतने तक प्रतिबंधित करना:
    * **30 Kb** जब **बाइट** में प्रस्तुत किया जाता है
    * **60 Kb** जब **स्ट्रिंग** के रूप में प्रस्तुत किया जाता है.
2. यह सुनिश्चित करने के लिए विभिन्न वैलिडेटरों की अनुबंध घटनाओं के बीच **देरी का समय** बढ़ाने की घटनाओं के एकाएक प्रकट होने की स्थिति में मेमपूल बहुत जल्दी नहीं भरता जो चेन की प्रगति को बाधित कर सकता है.

निम्न उदाहरण से पता चलता है कि डेटा आकार कैसे प्रतिबंधित किया जाता है:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

[हेम्डल रिपोजिटरी](https://github.com/maticnetwork/heimdall/) को क्लोन करें:

```sh
git clone https://github.com/maticnetwork/heimdall
```

सही [रिलीज़ वर्जन](https://github.com/maticnetwork/heimdall/releases) की ओर जाएँ:

```sh
git checkout RELEASE_TAG
```

जहां आपके द्वारा इंस्टॉल करने के लिए,`RELEASE_TAG` रिलीज़ वर्जन का टैग है.

उदाहरण के लिए:

```sh
git checkout v0.3.0
```

जब आप सही रिलीज़ पर हों, तब हेम्डल इंस्टॉल करें:

```sh
make install
source ~/.profile
```

हेम्डल इंस्टालेशन की जाँच करें:

```sh
heimdalld version --long
```

:::note

आगे बढ़ने से पहले, सेंट्री और वैलिडेटर दोनों मशीनों पर हेम्डल इंस्टॉल हो जाना चाहिये.

:::

### बोर इंस्टॉल करना {#installing-bor}

[बोर](/docs/pos/bor) sidechain ऑपरेटर है जो ब्लॉक उत्पादन लेयर के रूप में काम करता है, जो हर [span](/docs/maintain/glossary.md#span) और [स्प्रिट](/docs/maintain/glossary.md#sprint) के लिए ब्लॉक निर्माताओं और verifiers को चुनने के लिए Heimdall के साथ सिंक करता है.

[बोर रिपोजिटरी](https://github.com/maticnetwork/bor) को क्लोन करें:

```sh
git clone https://github.com/maticnetwork/bor
```

सही [रिलीज़ वर्जन](https://github.com/maticnetwork/bor/releases) की ओर जाएँ:

```sh
git checkout RELEASE_TAG
```

जहां आपके द्वारा इंस्टॉल करने के लिए,`RELEASE_TAG` रिलीज़ वर्जन का टैग है.

उदाहरण के लिए:

```sh
git checkout v0.3.3
```

बोर इंस्टॉल करें:

```sh
make bor-all
```

सिमलिंक बनाएँ:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

बोर इंस्टॉलेशन की जाँचें करें:

```sh
bor version
```

:::note

आगे बढ़ने से पहले, सेंट्री और वैलिडेटर दोनों मशीनों पर हेम्डल इंस्टॉल हो जाना चाहिए.

:::

## नोड फाइलों का सेट अप करना {#setting-up-node-files}

:::note

नोड फाइलों को सेंट्री और वैलिडेटर दोनों मशीनों पर सेट अप कर दिया जाना चाहिए.

:::

### लॉंच रिपोजिटरी लाना {#fetching-the-launch-repository}

[लॉन्च रिपोजिटरी](https://github.com/maticnetwork/launch) को क्लोन करें:

```sh
git clone https://github.com/maticnetwork/launch
```

### लॉन्च डायरेक्टरी सेट अप करना {#setting-up-the-launch-directory}

#### सेंट्री मशीन पर {#on-the-sentry-machine}

एक `node`डायरेक्टरी बनाएँ:

```sh
mkdir -p node
```

`launch`डायरेक्टरी से फ़ाइलों और स्क्रिप्ट को `node`डायरेक्ट्री में कॉपी करें:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### वैलिडेटर मशीन पर {#on-the-validator-machine}

एक `node`डायरेक्टरी बनाएँ:

```sh
mkdir -p node
```

`launch`डायरेक्टरी से फ़ाइलों और स्क्रिप्ट को `node`डायरेक्ट्री में कॉपी करें:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### नेटवर्क डायरेक्टरी सेट अप करना {#setting-up-the-network-directories}

:::note

इस सेक्शन को सेंट्री और वैलिडेटर दोनों मशीनों पर रन करें.

:::

#### हेम्डल सेट अप करना {#setting-up-heimdall}

`node` डायरेक्ट्री में बदलें:

```sh
cd ~/node/heimdall
```

सेट अप स्क्रिप्ट रन करें:

```sh
bash setup.sh
```

#### बोर सेट अप करना {#setting-up-bor}

`node` डायरेक्ट्री में बदलें:

```sh
cd ~/node/bor
```

सेट अप स्क्रिप्ट रन करें:

```sh
bash setup.sh
```

## सेवाओं का सेट अप करना {#setting-up-the-services}

:::note

इस सेक्शन को सेंट्री और वैलिडेटर दोनों मशीनों पर रन करें.

:::

`node` डायरेक्ट्री की ओर जाएँ:

```sh
cd ~/node
```

सेट अप स्क्रिप्ट रन करें:

```sh
bash service.sh
```

सेवा फाइल को सिस्टम डायरेक्ट्री में कॉपी करें:

```sh
sudo cp *.service /etc/systemd/system/
```

## सेंट्री नोड को कॉन्फ़िगर करना {#configuring-the-sentry-node}

दूरस्थ सेंट्री मशीन में लॉगिंग करके शुरू करें.

### हेम्डल सेवाओं को कॉन्फ़िगर करना {#configuring-the-heimdall-services}

संपादन के लिए हेम्डल कॉन्फ़िगरेशन फ़ाइल खोलें:

```sh
vi ~/.heimdalld/config/config.toml
```

`config.toml`, में निम्नलिखित पैरामीटरों को बदलें:

* `moniker` — कोई भी नाम. उदाहरण:.`moniker = "my-sentry-node"`
* `seeds` — सीड नोड पतों में एक नोड आईदी, एक IP पता और एक पोर्ट शामिल होता है.

निम्नलिखित वैल्यू इस्तेमाल करें:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — पीर एक्सचेंज चालू करने के लिए वैल्यू को`true` पर सेट करें. उदाहरण:.`pex = true`
* `private_peer_ids` — हेम्डल की नोड आईडी वैलिडेटर मशीन पर स्थापित है.

 वैलिडेटर मशीन पर हेम्डल की नोड आईडी प्राप्त करने के लिए:

  1. वैलिडेटर मशीन पर लॉग इन करें.
  2. रन करें:
     ```sh
     heimdalld tendermint show-node-id
     ```

 उदाहरण:`private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`

* `prometheus` — प्रोमेथियस मेट्रिक्स चालू करने के लिए वैल्यू को `true`पर सेट करें. उदाहरण:.`prometheus = true`
* `max_open_connections` — वैल्यू को `100`पर सेट करें. उदाहरण:.`max_open_connections = 100`

`config.toml` में परिवर्तन सहेजें.

### बोर सेवा को कॉन्फ़िगर करना {#configuring-the-bor-service}

संपादन के लिए बोर कॉन्फ़िगरेशन फ़ाइल खोलें:

```sh
`vi ~/node/bor/start.sh`
```

`start.sh`में, बूट नोड पते को add  नोड आईडी से जोड़ दें जिसमें नोड आईडी शामिल हो, एक IP पता और एक पोर्ट शामिल हो फ़ाइल के अंत में निम्न लाइन को जोड़ करके:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

`start.sh` में परिवर्तन सहेजें.

### फायरवॉल को कॉन्फ़िगर करना {#configuring-a-firewall}

सेंट्री मशीन में निम्नलिखित पोर्ट सभी के लिए खुले होने चाहिए `0.0.0.0/0`:

* `26656`आपकी हेम्डल सेवा आपके नोड को हेम्डल सेवा के अन्य नोडों से जोड़ेगी.

* `30303`आपकी बोर सेवा आपके नोड को बोर सेवा के अन्य नोड से जोड़ेगी.

* `22`- ताकि वैलिडेटर कहीं से भी ssh करने में सक्षम हों.

## सेंट्री नोड शुरू करना {#starting-the-sentry-node}

आप पहले हेम्डल सेवा शुरू करेंगे. हेम्डल सेवा सिंक करने के बाद, आप बोर सेवा शुरू करेंगे.

:::note

जैसा कि पहले बताया गया है कि हेम्डल सेवा को एकदम शुरू से सिंक करने में कई दिन लग जाते हैं.

वैकल्पिक रूप से, आप एक अनुरक्षित स्नैपशॉट का इस्तेमाल कर सकते हैं, जो सिंक करने के समय को कम करके कुछ घंटों तक ले आएगा. विस्तृत निर्देश के लिए, [<ins>हेम्डल और बोर के लिए स्नैपशॉट निर्देश</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233) देखें.

स्नैपशॉट डाउनलोड लिंक के लिए, [पॉलीगॉन चेन स्नैपशॉट](https://snapshot.polygon.technology/) देखें.

:::

### हेम्डल सेवा शुरू करना {#starting-the-heimdall-service}

हेम्डल सेवा शुरू करें:

```sh
sudo service heimdalld start
```

हेम्डल रेस्ट-सर्वर शुरू करें:

```sh
sudo service heimdalld-rest-server start
```

हेम्डल सेवा लॉग जाँचें:

```sh
journalctl -u heimdalld.service -f
```

:::note

लॉग में, आप निम्न गड़बड़ियाँ देख सकते हैं:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

इन लॉग का यह मतलब है कि नेटवर्क के किसी नोड ने आपके नोड से जुड़ने होने से इनकार कर दिया है.
नेटवर्क पर अधिक नोड्स को क्रॉल करने के लिए अपने नोड का इंतजार करें; आपको कुछ करने की जरूरत नहीं इन त्रुटियों को संबोधित करने के लिए.

:::

हेम्डल रेस्ट-सर्वर लॉग जाँचें:

```sh
journalctl -u heimdalld-rest-server.service -f
```

हेम्डल की सिंक स्थिति जाँचें:

```sh
curl localhost:26657/status
```

आउटपुट में, `catching_up`वैल्यू यह है:

* `true` — हेम्डल सेवा सिंक कर रही है.
* `false` — हेम्डल सेवा पूरी तरह से सिंक हो गई है.

हेम्डल सेवा द्वारा पूरी तरह से सिंक करने का इंतज़ार करें.

### बोर सेवा शुरू करना {#starting-the-bor-service}

हेम्डल सेवा के सिंक करने पर, बोर सेवा शुरू करें.

बोर सेवा शुरू करें:

```sh
sudo service bor start
```

बोर सेवा लॉग जाँचें:

```sh
journalctl -u bor.service -f
```

## वैलिडेटर नोड कॉन्फ़िगर करना {#configuring-the-validator-node}

:::note

इस सेक्शन को पूरा करने के लिए, आपके पास अपने पूरी तरह से सिंक Ethereum मेननेट का RPC का एंडपॉइंट होना चाहिए. नोड तैयार है.

:::

### हेम्डल सेवा कॉन्फ़िगर करना {#configuring-the-heimdall-service}

दूरस्थ वैलिडेटर मशीन पर लॉग इन करें.

`vi ~/.heimdalld/config/config.toml` को एडिट करने के लिए खोलें.

`config.toml` में, निम्नलिखित बदलें:

* `moniker` — कोई भी नाम. उदाहरण:.`moniker = "my-validator-node"`
* `pex` — पीयर एक्सचेंज अक्षम करने के लिए वैल्यू को `false`पर सेट करें. उदाहरण:.`pex = false`
* `private_peer_ids` — इसे अक्षम करने के लिए वैल्यू को कमेंट आउट करें. उदाहरण: `# private_peer_ids = ""`

सेंट्री मशीन पर हेम्डल नोड आईडी प्राप्त करने के लिए:

  1. सेंट्री मशीन पर लॉग इन करें.
  1. `heimdalld tendermint show-node-id` रन करें.

उदाहरण: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — प्रोमेथियस मेट्रिक्स चालू करने के लिए वैल्यू को `true`पर सेट करें. उदाहरण:.`prometheus = true`

`config.toml` में परिवर्तन सहेजें.

`vi ~/.heimdalld/config/heimdall-config.toml` को एडिट करने के लिए खोलें.

`heimdall-config.toml` में, निम्नलिखित बदलें:

* `eth_rpc_url`- एक RPC endpoint जो पूरी तरह से सिंक करने वाले Ethereum मेंनेट नोड के लिए यानी Infura.`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

उदाहरण: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

`heimdall-config.toml` में परिवर्तन सहेजें.

### बोर सेवा को कॉन्फ़िगर करना {#configuring-the-bor-service-1}

`vi ~/.bor/data/bor/static-nodes.json` को एडिट करने के लिए खोलें.

`static-nodes.json` में, निम्नलिखित बदलें:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"`- नोड आईडी और बर का आईपी पता संतरी मशीन पर सेट हो जाता है.

 सेंट्री मशीन पर बोर की नोड आईडी प्राप्त करने के लिए:

  1. सेंट्री मशीन पर लॉग इन करें.
  2. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` रन करें.

 उदाहरण:`"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`

`static-nodes.json` में परिवर्तन सहेजें.

## ओनर और साइनर की सेट करना {#setting-the-owner-and-signer-key}

यह सिफारिश की जाती है कि, आप पॉलीगॉन पर, ओनर और साइनर की को अलग रखें.

* Signer - जो पता उस पर संकेत करता है [चेकपॉइंट transactions](/docs/maintain/glossary.md#checkpoint-transaction). सिफारिश है signer पते पर कम से कम 1 ET रखने के लिए.
* ओनर — वह पता जो स्टेकिंग ट्रांजैक्शंस करता है. सिफारिश MATIC को रखने के लिए है मालिक के पते पर टोकन्स

### हेम्डल निजी की जनरेट करना {#generating-a-heimdall-private-key}

आपको केवल वैलिडेटर मशीन पर हेम्डल निजी की जनरेट करनी चाहिए. एक Heimdall उत्पन्न नहीं करें संतरी मशीन पर निजी की.

निजी की जनरेट करने के लिए, रन करें:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

कहाँ

* एथेरेयम निजी की —आपके एथेरेयम वॉलेट की निजी की.

यह `priv_validator_key.json`जनरेट करेगी. उत्पन्न JSON फ़ाइल को Heimdall कॉन्फ़िगरेशन में ले जाएँ डायरेक्टरी

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### बोर कीस्टोर फ़ाइल जनरेट करना {#generating-a-bor-keystore-file}

आपको केवल वैलिडेटर मशीन पर बोर कीस्टोर फ़ाइल जनरेट करनी चाहिए. एक बोर कीस्टोर की फ़ाइल उत्पन्न नहीं करें संतरी मशीन पर.

निजी की जनरेट करने के लिए, रन करें:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

कहाँ

* एथेरेयम निजी की —आपके एथेरेयम वॉलेट की निजी की.

जब प्रांप्ट किए जाने पर कीस्टोर फ़ाइल के लिए पासवर्ड सेट करें.

यह `UTC-<time>-<address>`कीस्टोर फ़ाइल जनरेट करेगा.

जनरेट की गई कीस्टोर फ़ाइल को बोर कॉन्फ़िगरेशन डायरेक्टरी में ले जाएं:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### password.txt जोड़ें {#add-password-txt}

एक `password.txt`फ़ाइल बनाना सुनिश्चित करें तो उस समय की बोर कीस्टोर फ़ाइल का पासवर्ड ठीक में जोड़ दें`~/.bor/password.txt` फ़ाइल

### अपना एथेरेयम पता जोड़ें {#add-your-ethereum-address}

`vi /etc/matic/metadata` को एडिट करने के लिए खोलें.

`metadata` में, एथेरेयम पता जोड़ें. उदाहरण:.`VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`

`metadata` में परिवर्तन सहेजें.

## वैलिडेटर नोड शुरू करना {#starting-the-validator-node}

इस समय, आपके पास:

* सेंट्री मशीन सिंक पर हेम्डल सेवा है और चल रही है.
* सेंट्री मशीन पर बोर सेवा रन करनी चाहिए.
* वैलिडेटर मशीन पर हेम्डल सेवा और बोर सेवा कॉन्फ़िगर होनी चाहिए.
* आपकी ओनर और साइनर की कॉन्फ़िगर होनी चाहिए.

### हेम्डल सेवा शुरू करना {#starting-the-heimdall-service-1}

अब आप वैलिडेटर मशीन पर हेम्डल सेवा शुरू करेंगे. एक बार Heimdall सर्विस सिंक के बाद, आप वैलिडेटर मशीन पर बोर सर्विस शुरू करेगा.

हेम्डल सेवा शुरू करें:

```sh
sudo service heimdalld start
```

हेम्डल रेस्ट-सर्वर शुरू करें:

```sh
sudo service heimdalld-rest-server start
```

हेम्डल ब्रिज शुरू करें:

```sh
sudo service heimdalld-bridge start
```

हेम्डल सेवा लॉग जाँचें:

```sh
journalctl -u heimdalld.service -f
```

हेम्डल रेस्ट-सर्वर लॉग जाँचें:

```sh
journalctl -u heimdalld-rest-server.service -f
```

हेम्डल ब्रिज लॉग जाँचें:

```sh
journalctl -u heimdalld-bridge.service -f
```

हेम्डल की सिंक स्थिति जाँचें:

```sh
curl localhost:26657/status
```

आउटपुट में, `catching_up`वैल्यू यह है:

* `true` — हेम्डल सेवा सिंक कर रही है.
* `false`— हेम्डल सेवा को सिंक कर दिया गया है.

हेम्डल सेवा के पूरी तरह से सिंक करने का इंतज़ार करें.

### बोर सेवा से शुरू करना {#starting-the-bor-service-1}

एक बार वैलिडेटर मशीन सिंक पर Heimdall सर्विस शुरू करें वैलिडेटर मशीन

बोर सेवा शुरू करें:

```sh
sudo service bor start
```

बोर सेवा लॉग जाँचें:

```sh
journalctl -u bor.service -f
```

## कम्युनिटी के साथ स्वास्थ्य जाँच {#health-checks-with-the-community}

अब कि आपके संतरी और वैलिडेटर नोड्स सिंक और रन करने में हैं, तो करने के लिए हेड ओवर [कलह](https://discord.com/invite/0xPolygon) और समुदाय से अपने नोड्स की जांच करने के लिए पूछें.

:::note

वैलिडेटर्स के रूप में, हमेशा signer पते की जांच करना अनिवार्य होता है. अगर ET का संतुलन 0.5 ET से नीचे पहुंच जाता है, तो उसे रिफिल किया जाना चाहिए. इससे बचने से नोड्स को चेकपॉइंट Avoiding जमा करने से बाहर निकाल दिया जाएगा.

:::

## अगले स्टेप: स्टेकिंग {#next-steps-staking}

अब कि आपके संतरी और वैलिडेटर नोड्स स्वास्थ्य जांच कर रहे हैं, नेटवर्क का समर्थन शुरू करने के लिए [स्टेकिंग](/docs/maintain/validator/core-components/staking.md) गाइड
