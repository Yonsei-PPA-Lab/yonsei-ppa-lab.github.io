# PPA Lab website

연세대학교 전기전자공학부 학부생 하드웨어 스터디·프로젝트 팀 PPA Lab의 웹사이트입니다.
<https://yonsei-ppa-lab.github.io>

[Astro](https://astro.build)로 만든 정적 사이트이고, `main` 브랜치에 push하면 GitHub Actions가 GitHub Pages로 배포합니다.

## 글 올리기

내용은 전부 Markdown/YAML 파일입니다. 파일을 추가하거나 고친 뒤 `main`에 반영하면 사이트에 나타납니다.

| 무엇을 | 어디에 |
|---|---|
| 노트 | `src/content/notes/글-주소.md` |
| 프로젝트 | `src/content/projects/프로젝트-id.md` |
| 멤버 | `src/data/members.yaml` |
| About 본문 | `src/content/pages/about.md` |

파일 이름이 그대로 주소가 됩니다. 예: `src/content/notes/uvm-scoreboard.md` → `/notes/uvm-scoreboard/`

### 노트

```markdown
---
title: 글 제목
date: 2026-11-15
tags: [RTL, Verification]
author: 이름          # 선택
summary: 한 줄 요약   # 선택
order: 1              # 선택, 날짜가 같은 글끼리는 작은 숫자가 위에 표시
---

본문은 Markdown으로 씁니다.
```

코드 블록 언어는 `systemverilog`, `verilog`, `tcl`, `python` 등을 쓸 수 있습니다.

### 프로젝트

```markdown
---
title: 프로젝트 이름
summary: 한 줄 설명
areas: [RTL, Verification]     # RTL, Verification, FPGA, Arch, EDA/PPA 중에서
status: active                 # active, done, paused
start: "2026-09"               # 선택
end: "2026-12"                 # 선택
repo: https://github.com/Yonsei-PPA-Lab/저장소   # 선택
contributors:                  # 선택
  - { name: 이름, role: RTL 설계 }
order: 1                       # 선택, 작을수록 위에 표시
---

개요, 블록 다이어그램, 결과(PPA 수치 표) 등을 Markdown으로 씁니다.
```

## 로컬에서 보기

Node.js 22 이상이 필요합니다.

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 파일 생성
```

## 디자인

디자인 규칙은 [DESIGN.md](DESIGN.md)에 있습니다. 색과 글꼴 값은 `src/styles/tokens.css`의 토큰만 사용합니다.
