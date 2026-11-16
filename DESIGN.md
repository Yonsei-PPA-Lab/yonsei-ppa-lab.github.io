# PPA Lab — DESIGN.md

> 대상: yonsei-ppa-lab.github.io (Astro, Markdown 위주, GitHub Pages)
> 메뉴: Home · About(Members 포함) · Projects · Notes
> 상태: 2026-11-15 확정, 사이트에 적용됨. 토큰 값은 `src/styles/tokens.css`.

## 0. 컨셉: "Floorplan"

칩 레이아웃 툴에서 보는 플로어플랜처럼, 페이지를 **이름이 붙은 직사각형 블록**으로 나눈다.
회색빛 실리콘 다이 위에 얇은 테두리 블록, 블록 모서리에 붙는 모노스페이스 라벨(`u_projects`, `u_notes` 같은 인스턴스 이름),
그리고 딱 한 가지 강조색인 **신호 노랑**. 노랑은 "지금 활성화된 것"에만 쓴다.

- 대담한 요소는 홈 히어로의 **4×4 weight-stationary systolic array 시뮬레이션** 하나뿐. 나머지는 조용하게.
- 연구소처럼 보이게 하는 장치(로고 엠블럼, 학교 상징색, "Laboratory" 톤의 문구)는 쓰지 않는다.
- "공식 연구실 아님" 같은 안내 문구는 넣지 않는다 (2026-11-15 결정: 프로젝트 내용만 봐도 학생 팀인 게 드러남). 대신 소개 문구에 "학부생 팀"이라는 사실은 자연스럽게 담는다.

### 레퍼런스에서 가져온 것 / 피한 것

- **poolc.org에서 가져온 것**: 동아리 사이트가 잡다한 장식 없이 "우리가 누구고, 뭘 하는지"만 보여주는 절제된 태도. 흑백 위주의 차분한 톤.
  (주의: poolc.org는 JS로만 렌더링되는 사이트라 이 세션에서는 화면을 직접 렌더해 보지 못했다. 특히 좋았던 부분의 스크린샷을 주면 반영한다.)
- **y-yai.com에서 피한 것**: 한 페이지에 섹션 10개(하이라이트, 배너, 프로그램, 아카이브, 연구분야, 논문, 수상, 모집, 파트너…)를 몰아넣은 구조,
  같은 크기 카드의 반복, 마퀴(흐르는 로고/키워드 띠), 터미널/해커풍 로딩 화면, 장식용 배너 이미지. → 홈은 섹션 3개 이하, 마퀴·로딩 연출 없음, 터미널 흉내 없음.
- **AI 사이트 티 나는 것 금지**: 보라→파랑 그라디언트, 가운데 정렬 히어로 + 똑같은 카드 3개, 이모지 아이콘, 그라디언트 텍스트, 모든 것에 둥근 모서리+그림자, 크림색 배경+세리프+테라코타.

## 1. Color

중립색은 약간 푸른 기가 도는 실리콘 그레이. 강조색은 신호 노랑 하나. 링크도 별도 색 없이 잉크색 + 밑줄.

| 토큰 | Light | Dark | 역할 |
|---|---|---|---|
| `--die` | `#E9ECEF` | `#14181D` | 페이지 배경 (실리콘 다이) |
| `--block` | `#F7F8F9` | `#1C2127` | 블록/표/코드 배경 |
| `--ink` | `#111418` | `#E6E9EC` | 본문·제목 (대비 15.6 / 14.6) |
| `--ink-2` | `#4A525C` | `#B4BCC5` | 보조 본문 |
| `--muted` | `#5E6670` | `#98A1AB` | 라벨·날짜·캡션 (대비 4.9 / 6.8) |
| `--line` | `#B9C0C8` | `#343B44` | 블록 테두리, 표 구분선 |
| `--line-strong` | `#111418` | `#E6E9EC` | 강조 테두리, 링크 밑줄 |
| `--signal` | `#F2C230` | `#F2C230` | 유일한 강조. 활성 메뉴, 버튼 배경, 하이라이트, 다이어그램의 활성 PE. **라이트에서 노랑 위 텍스트는 항상 `--ink`** (대비 11.0) |
| `--on-signal` | `#111418` | `#14181D` | 노랑 위 텍스트 |
| `--ok` | `#1F6B3A` | `#6CC08A` | 상태: 진행 중 (Active) |
| `--warn` | `#8A5600` | `#E3A94A` | 상태: 보류 (Paused) |

- 노랑을 라이트 배경 위 **글자색으로 쓰지 않는다** (대비 부족). 면(fill)이나 굵은 밑줄로만.
- 학교 상징색(연세 블루)은 공식 기관처럼 보일 수 있어 쓰지 않는다.
- 그라디언트 없음.

## 2. Typography

| 역할 | 폰트 | 용도 |
|---|---|---|
| Display | **Archivo** (확장 폭 wdth 115~125, 700~800) | 워드마크 `PPA Lab`, 영문 섹션 제목만. 한글 섞지 않음 |
| Body | **IBM Plex Sans KR** (400, 500, 600) | 한글/영문 본문, 한글 제목 |
| Mono | **IBM Plex Mono** (400, 500) | 블록 라벨, 날짜, 태그, 표 숫자, 코드 |

글꼴은 Fontsource(`@fontsource/...`)로 self-host. 폴백: `system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif` / `ui-monospace, Menlo, monospace`.

| 토큰 | 크기 / 행간 | 쓰임 |
|---|---|---|
| `--fs-display` | clamp(44px, 7vw, 88px) / 0.95 | 홈 워드마크 |
| `--fs-h1` | 36px / 1.2 | 페이지 제목 |
| `--fs-h2` | 26px / 1.3 | 섹션 제목 |
| `--fs-h3` | 20px / 1.4 | 소제목, 프로젝트명 |
| `--fs-body` | 17px / 1.7 | 본문 (한글 가독성 위해 17px) |
| `--fs-small` | 15px / 1.6 | 표, 보조 텍스트 |
| `--fs-label` | 12px / 1.4, mono, uppercase, letter-spacing 0.06em | 블록 라벨, 태그 |

본문 최대 폭 68ch. 제목은 `text-wrap: balance`. 숫자 열은 `tabular-nums`.

## 3. Spacing & layout

- 4px 기반: `4 8 12 16 24 32 48 64 96`.
- 컨텐츠 최대 폭 1120px, 본문 단 680px. 좌우 거터 최소 16px (모바일), 32px (데스크톱).
- 섹션 간격 96px (모바일 64px).
- 정렬은 **왼쪽 정렬**이 기본. 가운데 정렬 히어로 금지.
- 12컬럼 그리드. 홈 히어로는 7:5 (워드마크 : 소개 문구), 그 아래에 어레이 블록이 전체 폭으로 온다. 모바일에선 1단.

## 4. Shape & depth

- radius: `0` 기본, 칩/태그만 `2px`. 둥근 카드 없음.
- 그림자 없음. 깊이는 1px `--line` 테두리와 `--block` 배경으로만 표현.
- 블록 라벨: 블록 왼쪽 위 테두리에 걸쳐 있는 mono 라벨 (`u_projects`). 레이아웃 툴의 셀 이름처럼.

## 5. Components

- **Nav**: 상단 고정 아님(짧은 사이트라 불필요). 왼쪽 `PPA Lab` 워드마크, 오른쪽 메뉴 4개(mono, 15px). 현재 페이지는 노랑 면 배경. 하단 1px `--line`.
- **Button**: 쓸 일이 적음 (GitHub, 연락).
  - Primary: `--signal` 배경 + `--on-signal` 글자, 1px `--line-strong` 테두리, radius 0. hover 시 배경을 `--ink`, 글자를 `--signal`로 반전.
  - Secondary: 투명 배경 + 1px `--line-strong`. hover 시 `--block`.
  - Focus: 2px `--ink` outline + 2px offset (다크는 `--signal`).
  - Disabled: 불투명도 0.45, 커서 not-allowed.
- **Link**: `--ink` 글자 + 1px `--line-strong` 밑줄(offset 3px). hover 시 밑줄 3px `--signal`.
- **Block**: `--block` 배경, 1px `--line` 테두리, padding 24px, 왼쪽 위 mono 라벨. 같은 종류가 나열될 때만 사용(남발 금지).
- **Project list (Projects)**: 카드 그리드 대신 **레지스터 맵 표**. 열: `ID`(slug, mono) · 프로젝트 · 분야 태그 · 상태 · 기간. 행 hover 시 `--block`. 모바일에선 행이 2줄 스택.
- **Status chip**: mono 12px, 1px 테두리, 앞에 6px 사각 점. Active(`--ok`) / Done(`--muted`) / Paused(`--warn`).
- **Tag**: mono 12px, `--line` 테두리, radius 2px. 분야: RTL, Verification, FPGA, Arch, EDA/PPA.
- **Notes list**: `YYYY-MM-DD`(mono, tabular) · 제목 · 태그. 날짜 내림차순. 카드 아님.
- **Members (About 안)**: 표. 이름 · 역할 · 관심 분야 · 합류 학기. 사진 선택 사항(없어도 성립하도록).
- **Code block**: Notes에 Verilog/SystemVerilog가 많을 것. `--block` 배경, 1px `--line`, mono 14.5px/1.6, 상단에 언어 라벨(`systemverilog`). 구문 강조는 Shiki의 단색에 가까운 테마(`github-light` / `github-dark-dimmed`), 무지개색 지양.
- **Footer**: 1px `--line` 위 구분. 왼쪽 "PPA Lab · 연세대학교 전기전자공학부 학부생 스터디·프로젝트 팀". 오른쪽 GitHub 링크, 마지막 업데이트 날짜(mono).

## 6. Imagery & icons

- 시그니처: 홈의 **4×4 systolic array SVG** (`src/components/SystolicArray.astro`). 스터디에서 BRAM에 넣어 돌린 실제 행렬 A, W로 C = A×W를 클럭 단위로 계산해 보여준다. 입력 값은 왼쪽에서 한 칸씩 들어오고, PE에는 부분합이 뜨고, 맨 아래 행에서 나온 값이 옆의 C 행렬에 채워진다. 노랑은 지금 연산 중인 PE와 방금 저장된 칸에만. Pause/Step 버튼이 있고, `prefers-reduced-motion`이면 자동 재생 없이 Step으로만 움직인다. 화면 밖이면 멈춘다.
- 홈 Projects 위에는 배치·배선을 마친 **실제 레이아웃 그림 2장**(대회 2차 설계)을 핵심 수치 3개와 함께 둔다. 수치는 각 프로젝트 페이지의 표와 같아야 한다.
- 프로젝트 썸네일이 필요하면 블록 다이어그램/파형/플로어플랜 스크린샷 등 **실제 작업물**을 쓴다. 스톡 사진, AI 일러스트, 장식 배너 금지.
- 아이콘: 거의 쓰지 않음. 필요하면 Lucide 1.5px 선 아이콘만 (GitHub, 외부 링크 정도). 이모지 금지.

## 7. Dark mode

- `prefers-color-scheme` 따르고, 헤더의 토글로 수동 전환 (`data-theme`), 선택은 localStorage에 저장.
- 다크는 순검정이 아닌 슬레이트 `#14181D`. 노랑은 그대로, 다크에선 노랑 글자도 허용(대비 10.6).
- 코드 블록, 다이어그램도 토큰만 사용해 두 테마에서 자동 전환.

## 8. 페이지 구성 (요약)

- **Home**: 워드마크 + 한 줄 소개 + systolic array 시뮬레이션 → Projects (레이아웃 그림 2장 + 표 4행) → 최근 Notes (3개). 끝.
- **About**: 팀 소개(무엇을, 어떻게 공부하는지), 활동 방식, Members 표.
- **Projects**: 레지스터 맵 표 → 각 프로젝트 상세(Markdown): 개요, 블록 다이어그램, 역할별 기여자, 결과(PPA 수치 표), 저장소 링크.
- **Notes**: 날짜순 목록 → 글 상세(Markdown, 코드 블록).
