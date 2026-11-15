---
title: RV32I 코어 + 커스텀 MAC 명령어
summary: 직접 설계한 RISC-V 코어에 MAC 명령어를 추가하고 FPGA에서 Pong 게임을 구동
areas: [Arch, RTL, FPGA]
status: active
start: "2026-07"
order: 1
---

## 개요

2026년 여름에 시작한 프로젝트입니다. 한 문장으로 줄이면, 직접 설계한 RISC-V CPU 위에서 직접 만든 게임을 돌리고, MAC 명령어로 행렬 연산을 가속하는 것입니다.

[4×4 Systolic Array](/projects/systolic-4x4/)에서는 데이터를 흘려보냈고, CPU에서는 명령어를 흘려보냅니다. HDL 작성, FSM, 데이터패스 설계, 작게 만들어 검증하며 키우는 방식까지 이미 익힌 것을 다른 대상에 다시 조합하는 프로젝트입니다.

## 단계

1. **명령어 집합 확정**: RV32I 명령어 26개를 공통 규격으로 정합니다.
2. **코어 설계**: 멤버 각자가 single-cycle RV32I 코어를 구현한 뒤 5-stage pipeline으로 확장합니다.
3. **MAC 명령어 통합**: Systolic array에서 가져온 MAC 연산을 커스텀 명령어로 추가합니다. 가속 효과는 소프트웨어 행렬곱과 사이클 수를 비교해 확인합니다.
4. **화면에 게임 띄우기**: 코어에 프레임버퍼와 VGA 출력을 연결하고, C로 작성한 Pong을 컴파일해 PYNQ-Z2에서 실행합니다.

화면에 게임이 돌아가면 성공으로 봅니다. 실리콘 제작은 그 다음 목표이고 [Tiny Tapeout MAC 유닛](/projects/tiny-tapeout-mac/)에서 진행합니다.

## Pipeline에서 다루는 것

- Data forwarding
- Load-use hazard에 대한 stall
- Branch, JAL, JALR의 control hazard에 대한 flush
- 레지스터와 메모리를 자동으로 검사하는 통합 테스트

## 진행 상황

작성 예정입니다.
