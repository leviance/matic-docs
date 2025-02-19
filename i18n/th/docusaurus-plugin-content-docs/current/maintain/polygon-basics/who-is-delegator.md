---
id: who-is-delegator
title: ผู้มอบหมายสิทธิ์คือใคร
description: ผู้ถือโทเคนที่ไม่ทำงานโหนด
keywords:
  - docs
  - matic
  - polygon
  - delegator
  - Who is a Delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

ผู้มอบหมายสิทธิ์เป็นผู้ถือโทเค็นที่ไม่สามารถหรือไม่ต้องการเรียกใช้ [โหนดผู้ตรวจสอบความถูกต้อง](/docs/maintain/glossary.md#validator) เองแต่แท้จริงแล้ว พวกเขารักษาความปลอดภัยเครือข่ายโดยมอบหมายสิทธิ์ Stake ของตนแก่โหนดผู้ตรวจสอบความถูกต้องและมีบทบาทสำคัญที่สุดในระบบ เนื่องจากพวกเขารับมีหน้าที่ผิดชอบในการคัดเลือกผู้ตรวจสอบ พวกเขาเรียกใช้ธุรกรรมการมอบหมายสิทธิ์ในสัญญาการ Stake ใน Ethereum Mainnet

โทเค็น MATIC ถูกผูกมัดกับ [เช็คพอยต์](/docs/maintain/glossary.md#checkpoint-transaction) จุดถัดไป ซึ่งถูกเสนอต่อ Ethereum Mainnet ผู้มอบหมายสิทธิ์สามารถเลือกที่จะออกจากระบบได้ด้วย เมื่อพวกเขาต้องการ คล้ายกับผู้ตรวจสอบ ผู้มอบหมายสิทธิ์ต้องรอช่วงเวลาถอนตัวซึ่งใช้เวลาประมาณ 9 วัน ให้ครบก่อนจึงจะสามารถถอน Stake ของตนได้

## ค่าธรรมเนียมและค่าตอบแทน {#fees-and-rewards}

ผู้มอบหมายสิทธิ์ Stake โทเค็นของตนโดยมอบหมายสิทธิ์แก่ผู้ตรวจสอบและรับเปอร์เซ็นต์ผลตอบแทนของเขาเพื่อเป็นการแลกเปลี่ยน เนื่องจากผู้มอบหมายสิทธิ์แบ่งผลตอบแทนกับผู้ตรวจสอบของตน ผู้มอบหมายสิทธิ์จึงต้องรับความเสี่ยงด้วย หากผู้ตรวจสอบประพฤติมิชอบ ผู้มอบหมายสิทธิ์ของพวกเขาแต่ละรายจะเสี่ยงโดน Slash ตามสัดส่วนของ Stake ของพวกเขาที่ถูกมอบหมาย

ผู้ตรวจสอบกำหนดสัดส่วน[ค่าคอมมิชชั่น](/docs/maintain/glossary.md#commission) เพื่อกำหนดเปอร์เซ็นต์รางวัลที่จะได้รับ ผู้มอบหมายสิทธิ์สามารถดูอัตราค่าคอมมิชชั่นของผู้ตรวจสอบแต่ละคน เพื่อเข้าใจการแจกจ่ายผลตอบแทนโดยผู้ตรวจสอบและ อัตราผลประโยชน์สำหรับ Stake ของพวกเขา

:::caution ผู้ตรวจสอบซึ่งมีอัตราค่าคอมมิชชั่น 100%

เหล่านี้เป็นตัวตรวจสอบความถูกต้องที่ได้รับรางวัลทั้งหมดและไม่ได้มองหาตัวแทน เนื่องจากมีโทเค็นเพียงพอที่จะเดิมพันด้วยตัวเอง

:::

ตัวจัดการมีตัวเลือกเพื่อทำการมอบหมายโทเค็นของเขากับตัวตรวจสอบความถูกต้องอื่นๆผลตอบแทนถูกสะสมในเช็คพอยต์ทุกจุด

:::tip การเป็นผู้มอบหมายสิทธิ์ที่ทำงานอยู่

การมอบหมายสิทธิ์ไม่ถือว่าเป็นกิจกรรมแบบอยู่เฉย ๆ เนื่องจากผู้มอบหมายสิทธิ์เป็นส่วนหนึ่งในการรักษา
เครือข่าย Polygon ผู้มอบหมายสิทธิ์แต่ละคนรับผิดชอบในการจัดการความเสี่ยงของตน แต่ในการกระทำการเช่นนั้น ผู้มอบหมายสิทธิ์
ควรมุ่งเป้าหมายในการคัดเลือกผู้ตรวจสอบที่มีพฤติกรรมที่ดี

:::

## ดูเพิ่มเติมที่ {#see-also}

* [Delegate](/docs/maintain/delegate/delegate)
* [คำถามที่พบบ่อยเกี่ยวกับผู้ตรวจสอบ](/docs/maintain/validate/faq/validator-faq)
