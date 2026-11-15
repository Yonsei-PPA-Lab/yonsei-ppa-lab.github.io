---
title: 4×4 Systolic Array NPU
summary: Weight-stationary 4×4 systolic array를 Verilog로 설계하고 PYNQ-Z2 FPGA에서 검증
areas: [RTL, Verification, FPGA, Arch]
status: done
start: "2026-04"
end: "2026-07"
order: 2
---

## 개요

PPA Lab의 첫 프로젝트입니다. 2026년 봄학기 스터디에서 2×2 행렬 곱셈기부터 시작해 주마다 한 단계씩 키워, Google TPU와 같은 weight-stationary 방식의 4×4 systolic array로 완성했습니다. 멤버 각자가 같은 과제를 직접 구현하고 매주 서로의 설계를 비교했습니다.

Systolic array는 같은 연산 셀(PE, Processing Element)을 격자로 배치하고 이웃한 셀끼리만 데이터를 주고받는 구조입니다. Weight-stationary 방식에서는 가중치를 각 PE의 레지스터에 미리 넣어 두고, 입력은 왼쪽에서 오른쪽으로, 부분합은 위에서 아래로 흘려보냅니다.

## 구조

- **MAC PE 16개**: 8비트 입력과 가중치, 16비트 이상의 부분합. `generate` 문으로 격자를 만들고 배열 크기와 비트 폭은 파라미터로 바꿀 수 있습니다.
- **FSM 제어기**: IDLE, LOAD, CALC, DONE 네 상태. LOAD에서 가중치를 넣고 CALC에서 연산합니다.
- **결과 수확 로직**: 맨 아래 행에 도착한 결과가 뒤따라오는 값에 덮이기 전에 별도 레지스터 배열에 저장합니다.
- **BRAM 인터페이스**: 가중치와 입력을 FPGA의 BRAM에 두고, 제어기가 스스로 주소를 만들어 읽어옵니다.

```verilog
module mac_pe_ws #(
  parameter DATA_WIDTH = 8,
  parameter PSUM_WIDTH = 16
)(
  input  wire                  clk, rst_n, load_en, calc_en,
  input  wire [DATA_WIDTH-1:0] w_in, a_in,     // 위에서 오는 가중치, 왼쪽에서 오는 입력
  input  wire [PSUM_WIDTH-1:0] psum_in,        // 위에서 내려온 부분합
  output reg  [DATA_WIDTH-1:0] w_out, a_out,   // 아래로, 오른쪽으로 넘기는 값
  output reg  [PSUM_WIDTH-1:0] psum_out        // 아래로 넘기는 부분합
);
```

## 지연 시간

배열 크기가 N일 때 결과 C[r][c]는 `2N + r + c` 클럭에 나옵니다. 가중치를 넣는 데 N, 부분합이 바닥까지 내려오는 데 N, 열 위치만큼 c, 입력이 엇갈려 들어오는 만큼 r이 더해집니다. 4×4에서는 첫 결과 C[0][0]이 8클럭, 마지막 결과 C[3][3]이 14클럭에 나옵니다.

## FPGA 검증

| 항목 | 값 |
|---|---|
| 보드 | PYNQ-Z2 (Zynq-7020) |
| 동작 주파수 | 100 MHz |
| LUT | 약 592개 (1.1%) |
| FF | 약 786개 (0.7%) |
| 검증 | 결과 벡터 32개가 골든 모델과 모두 일치 |

## 이어지는 작업

여기서 만든 MAC 유닛은 [RV32I 코어의 커스텀 명령어](/projects/rv32i-mac/)와 [Tiny Tapeout 제출](/projects/tiny-tapeout-mac/)에 다시 쓰입니다. 스터디 진행 과정은 노트 [2026 봄 스터디: 2×2 곱셈기에서 4×4 어레이까지](/notes/spring-2026-curriculum/)에 정리했습니다.
