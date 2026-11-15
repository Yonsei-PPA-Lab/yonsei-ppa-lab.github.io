---
title: 4×4 Systolic Array
summary: Weight-stationary 구조의 4×4 systolic array 설계와 검증
areas: [RTL, Verification, EDA/PPA]
status: active
order: 1
# start: "2026-09"        # 시작한 연-월
# repo: https://github.com/Yonsei-PPA-Lab/저장소-이름
# contributors:
#   - { name: 이름, role: RTL 설계 }
---

## 개요

Systolic array는 같은 연산 셀(PE, Processing Element)을 격자로 배치하고, 이웃한 셀끼리만 데이터를 주고받게 만든 구조입니다. 배선이 짧고 규칙적이어서 행렬 곱셈 같은 연산을 하드웨어로 구현할 때 자주 쓰입니다.

이 프로젝트에서는 **weight-stationary** 방식의 4×4 어레이를 다룹니다. 가중치는 각 PE 안의 레지스터에 고정해 두고, 활성값(activation)은 왼쪽에서 오른쪽으로, 부분합(partial sum)은 위에서 아래로 흘려보냅니다.

데이터가 흐르는 방식은 노트 [Weight-stationary systolic array에서 데이터는 어떻게 흐를까](/notes/weight-stationary-dataflow/)에 정리했습니다.

## 진행 상황

작성 예정입니다.

## 결과

합성 후 PPA 수치를 정리해 올릴 예정입니다.
