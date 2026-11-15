---
title: Tiny Tapeout MAC 유닛
summary: 직접 설계한 MAC PE를 SKY130 공정으로 RTL에서 GDS까지 구현해 Tiny Tapeout 셔틀에 제출
areas: [RTL, EDA/PPA]
status: active
start: "2026-07"
order: 2
---

## 개요

FPGA에서 검증한 설계의 한 조각을 실제 칩으로 만드는 프로젝트입니다. [4×4 Systolic Array](/projects/systolic-4x4/)의 MAC PE를 ASIC용으로 정리해 Tiny Tapeout 셔틀(TTSKY26c)에 제출하는 것이 목표입니다.

FPGA는 틀리면 다시 올리면 되지만 칩은 한번 제출하면 되돌릴 수 없습니다. FPGA에서 먼저 검증하고 ASIC으로 합성하는 순서는 실제 산업에서 쓰는 흐름과 같습니다.

## 흐름

SKY130 PDK와 OpenLane으로 RTL에서 GDS까지 진행합니다.

1. MAC 유닛 RTL을 ASIC용으로 정리
2. 논리 합성
3. 배치와 배선
4. DRC 검증
5. GDS 제출

## 진행 상황

작성 예정입니다.
