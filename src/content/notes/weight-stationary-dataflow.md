---
title: Weight-stationary systolic array에서 데이터는 어떻게 흐를까
date: 2026-11-15
tags: [Arch, RTL]
author: PPA Lab
summary: 4×4 weight-stationary systolic array에서 활성값과 부분합이 움직이는 순서를 사이클 단위로 따라가 봅니다.
---

홈 화면에 있는 4×4 어레이 그림에서 노란 칸이 대각선으로 지나가는 이유를 정리한 글입니다.

## 계산하려는 것

길이 4인 입력 벡터 `a`와 4×4 가중치 행렬 `W`가 있을 때, 출력 `y`의 각 원소는 다음과 같습니다.

```text
y[c] = a[0]*W[0][c] + a[1]*W[1][c] + a[2]*W[2][c] + a[3]*W[3][c]
```

곱셈 16번과 덧셈으로 이루어진 계산입니다. Systolic array는 이 곱셈 하나하나를 PE 하나에 맡깁니다.

## PE 하나가 하는 일

r행 c열의 PE는 가중치 `W[r][c]`를 레지스터에 가지고 있습니다. 매 사이클 왼쪽에서 활성값을, 위에서 부분합을 받아 두 가지 일을 합니다.

- 활성값은 그대로 오른쪽 PE로 넘깁니다.
- 활성값과 가중치를 곱해 부분합에 더하고, 아래쪽 PE로 넘깁니다.

```systemverilog
module pe #(
  parameter int DW = 8,           // 활성값, 가중치 비트 폭
  parameter int AW = 2*DW + 2     // 곱 4개를 더해도 넘치지 않는 폭
) (
  input  logic                 clk,
  input  logic                 rst_n,
  input  logic                 w_load,
  input  logic signed [DW-1:0] w_in,
  input  logic signed [DW-1:0] a_in,
  input  logic signed [AW-1:0] psum_in,
  output logic signed [DW-1:0] a_out,
  output logic signed [AW-1:0] psum_out
);
  logic signed [DW-1:0] w_reg;

  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      w_reg    <= '0;
      a_out    <= '0;
      psum_out <= '0;
    end else begin
      if (w_load) w_reg <= w_in;        // 가중치는 한 번 넣고 그대로 둔다
      a_out    <= a_in;                 // 활성값은 오른쪽으로
      psum_out <= psum_in + a_in * w_reg; // 부분합은 아래로
    end
  end
endmodule
```

가중치가 PE 안에 머물러 있고 나머지 데이터만 움직이기 때문에 weight-stationary라고 부릅니다.

## 입력을 한 사이클씩 늦춰 넣는 이유

c열의 부분합은 0행에서 출발해 한 사이클에 한 행씩 내려갑니다. r행 PE에 도착하려면 r 사이클이 걸립니다. 그 순간에 `a[r]`도 같은 PE에 도착해 있어야 올바른 값끼리 곱해집니다.

그래서 `a[r]`은 r 사이클 늦춰서 넣습니다. `a[0]`은 사이클 0에, `a[1]`은 사이클 1에 넣는 식입니다. 이렇게 하면 r행 c열 PE는 **사이클 r + c**에 자기 차례의 곱셈을 합니다.

| Cycle | 계산 중인 PE |
|---|---|
| 0 | W00 |
| 1 | W01, W10 |
| 2 | W02, W11, W20 |
| 3 | W03, W12, W21, W30 |
| 4 | W13, W22, W31 |
| 5 | W23, W32 |
| 6 | W33 |

같은 사이클에 계산하는 PE들은 r + c가 같으므로 대각선 위에 놓입니다. 그림에서 노란 칸이 대각선으로 움직이는 것이 이 표입니다.

## 출력이 나오는 시점

c열의 마지막 PE(3행)는 사이클 3 + c에 계산하고, 그 결과는 다음 사이클에 출력 레지스터에서 읽을 수 있습니다. 따라서 `y[c]`는 사이클 4 + c에 나옵니다. `y[0]`은 사이클 4, `y[3]`은 사이클 7입니다.

출력도 열마다 한 사이클씩 어긋나 있으므로, 네 값을 한꺼번에 쓰려면 앞쪽 열 출력에 지연 레지스터를 달아 시점을 맞춰야 합니다.

## 정리

- 가중치는 PE에 고정하고 활성값은 오른쪽으로, 부분합은 아래로 흘립니다.
- r행 입력을 r 사이클 늦추면 r행 c열 PE가 사이클 r + c에 계산합니다.
- 4×4 어레이에서 마지막 출력은 입력을 넣기 시작한 뒤 7 사이클째에 나옵니다.
- 모든 연결이 이웃 PE 사이에만 있어서 어레이가 커져도 가장 긴 조합 경로는 PE 하나의 곱셈과 덧셈으로 유지됩니다.
