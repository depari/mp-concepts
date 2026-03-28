# 프로파일 선택 화면 POC 개발 계획서

> **문서 정보**
> - 작성일: 2026-03-28
> - 버전: v1.2
> - 참고: [Gemini Canvas - Samsung TV Style Profile Screen](https://gemini.google.com/share/41fe538b2364)
> - 변경 이력:
>   - v1.0 → v1.1 기술 스택 Svelte 전환 + 디자인 컨셉 세로 패널 아코디언으로 업데이트
>   - v1.1 → v1.2 화면 내 POC 컨트롤 패널 추가 (프로필 수 변경 + 그래픽 스타일 변경)

---

## 1. 프로젝트 개요

### 1.1 목적

**세로 패널 아코디언** 방식의 프로파일 선택 화면 UX/UI 컨셉을 Svelte 기반 웹 POC로 구현하여,
다중 사용자 프로파일 선택 경험을 검증하고 팀 내 공유 가능한 인터랙티브 데모를 제작한다.

### 1.2 배경 및 요구사항

- TV 환경에서 여러 사용자가 하나의 디바이스를 공유할 때, 각 사용자 경험을 개인화하기 위한 프로파일 선택 화면 필요
- 넷플릭스 스타일에서 영감을 받은 **세로 패널 아코디언 레이아웃** 적용
- 포커스 패널과 비포커스 패널의 **흑백 ↔ 컬러 강렬한 시각적 대비** 구현
- **3D 픽사/메모지 스타일** 캐릭터 아바타 (상반신 이미지)
- 리모컨(키보드) 입력에 최적화된 포커스 네비게이션 경험
- 각 프로파일 패널마다 고유한 **그래디언트 컬러 아이덴티티** 부여

### 1.3 목표

| 구분 | 내용 |
|------|------|
| 1차 목표 | 세로 패널 아코디언 기본 레이아웃 및 포커스 전환 구현 |
| 2차 목표 | 흑백/컬러 전환 애니메이션, 3D 아바타 연동 |
| 3차 목표 | 리모컨(키보드) 완전 지원, 이어보기 퀵 액션(확장 모드) |
| **4차 목표** | **화면 내 POC 컨트롤 패널 - 프로필 수 변경 및 그래픽 스타일 실시간 전환** |

---

## 2. 화면 컨셉 정의

### 2.1 메인 프로파일 선택 화면 (세로 패널 아코디언)

참고 이미지 기반 레이아웃:

```
┌─────────────────────────────────────────────────────────────────────┐
│  ■■■■■■■         Who's Watching?                  [Manage Profiles] │  ← 헤더
├───────┬────────┬──────────────────────┬────────┬────────────────────┤
│       │        │                      │        │                    │
│  👤   │   👤   │        👤            │   👤   │       👤           │
│  (흑백)│  (흑백) │  (컬러 - 포커스됨)   │  (흑백) │      (흑백)        │
│       │        │                      │        │                    │
│       │        │    Olivia Smith      │        │                    │
│       │        │                      │        │                    │
│  ██   │  ████  │ ██████████████████   │  ████  │      ████          │
│ (Red) │ (Red)  │ (Blue Gradient 확장) │ (Green)│     (Orange)      │
└───────┴────────┴──────────────────────┴────────┴────────────────────┘
  비포커스  비포커스        포커스 패널          비포커스     비포커스
  (좁음)   (좁음)         (넓게 확장됨)         (좁음)       (좁음)
```

**디자인 핵심 규칙:**
- 전체 화면을 N개의 세로 패널이 꽉 채움 (flex, 100vw × 100vh)
- **비포커스** 패널: 좁은 고정폭 + 흑백(grayscale) 필터 + 어두운 오버레이
- **포커스** 패널: 넓게 확장 (`flex-grow`) + 컬러 그래디언트 배경 + 선명한 아바타 + 이름 표시
- 포커스 이동 시 패널 너비가 부드럽게 전환 (CSS transition)
- 아바타 이미지는 하단부터 올라오듯 배치 (상반신만 보이게 bottom-align)

### 2.2 패널 상세 스펙

| 상태 | 너비 | 배경 | 아바타 필터 | 이름 표시 |
|------|------|------|------------|---------|
| 비포커스 | `flex: 1` (균등 분배) | 어두운 단색 | `grayscale(100%) brightness(40%)` | 숨김 |
| 포커스 | `flex: 4` (4배 확장) | 개인 컬러 그래디언트 | 없음 (풀컬러) | 하단에 이름 표시 |

### 2.3 각 프로파일 패널 그래디언트 예시

```
진수:   linear-gradient(to bottom, #1B4FD8, #1230A0)  → Blue
지은:   linear-gradient(to bottom, #C0392B, #8B0000)  → Red
민준:   linear-gradient(to bottom, #27AE60, #145A32)  → Green
하나:   linear-gradient(to bottom, #E67E22, #B7470A)  → Orange
새 추가: linear-gradient(to bottom, #8E44AD, #5B2C6F)  → Purple
```

### 2.4 POC 컨트롤 패널 (신규)

POC 화면 내에 항상 접근 가능한 **플로팅 컨트롤 패널**을 제공하여,
디자이너/기획자가 실시간으로 프로파일 수와 그래픽 스타일을 변경하며 컨셉을 검토할 수 있도록 한다.

```
┌──────────────────────────────────────────────┐
│  ⚙ POC Controls                          ✕  │  ← 플로팅 패널 (우측 하단)
├──────────────────────────────────────────────┤
│  프로필 수                                    │
│  [2]  [3]  [4]  [●5]  [6]  [7]              │  ← 숫자 토글 버튼
├──────────────────────────────────────────────┤
│  그래픽 스타일                                │
│  ┌────────────┐  ┌────────────┐              │
│  │ ● Dark Neo │  │   Warm     │              │  ← 스타일 카드 선택
│  └────────────┘  └────────────┘              │
│  ┌────────────┐  ┌────────────┐              │
│  │   Pastel   │  │  Midnight  │              │
│  └────────────┘  └────────────┘              │
├──────────────────────────────────────────────┤
│  [리셋]                          [적용 완료] │
└──────────────────────────────────────────────┘
```

**컨트롤 패널 동작 규칙:**
- `Tab` 키 또는 화면 우측 하단 ⚙ 버튼으로 패널 열기/닫기
- 프로필 수 변경 시 패널 레이아웃 즉시 반영 (추가 프로필은 preset 풀에서 자동 선택)
- 그래픽 스타일 변경 시 CSS 변수(`data-theme` attribute) 교체로 전체 화면 실시간 갱신
- 컨트롤 패널은 메인 화면 위에 오버레이(z-index 최상단)로 표시

---

## 3. 기술 스택

| 분류 | 기술 | 선택 이유 |
|------|------|-----------|
| **핵심 프레임워크** | **Svelte 5** | 반응형 상태 관리 내장, 빌드 결과물 경량, 러닝커브 낮음 |
| **빌드 도구** | **Vite** | 빠른 HMR, Svelte 공식 플러그인 지원 |
| **라우터** | **SvelteKit** (선택적) | SSR/SPA 전환 유연성, 추후 확장 고려 |
| **스타일링** | **Vanilla CSS (CSS Modules)** | Svelte scoped CSS 내장 활용, 외부 의존성 최소화 |
| **아바타** | **Ready Player Me API** | 3D 픽사 스타일 아바타 무료 생성 및 PNG 렌더링 지원 |
| **애니메이션** | **Svelte Transition + CSS** | `svelte/transition` 내장 + CSS `flex` 전환 |
| **폰트** | **Google Fonts (Poppins + Noto Sans KR)** | TV UI 최적 가독성 |

> **NOTE**: SvelteKit은 추후 다중 화면(페이지) 확장 시 적용하며, POC 초기 단계는 Svelte + Vite 단독으로 진행한다.

---

## 4. 프로젝트 구조

```
mp-concepts/
├── docs/
│   └── dev_plan_profile_poc.md        # 본 개발 계획서
├── src/
│   └── profile-poc/
│       ├── package.json
│       ├── vite.config.js
│       ├── index.html
│       └── src/
│           ├── main.js                # Svelte 앱 진입점
│           ├── App.svelte             # 루트 컴포넌트
│           │
│           ├── lib/
│           │   ├── data/
│           │   │   ├── profiles.js    # 프로파일 전체 풀 데이터 (최대 7개)
│           │   │   └── themes.js      # 그래픽 스타일 테마 정의 ★ 신규
│           │   │
│           │   ├── stores/
│           │   │   ├── profileStore.js  # 활성 프로파일 목록, 포커스 상태
│           │   │   └── pocConfigStore.js  # POC 설정 (프로필 수, 현재 테마) ★ 신규
│           │   │
│           │   ├── components/
│           │   │   ├── ProfileScreen.svelte     # 메인 화면 (패널 컨테이너)
│           │   │   ├── ProfilePanel.svelte      # 개별 프로파일 패널
│           │   │   ├── ProfileAvatar.svelte     # 아바타 이미지 컴포넌트
│           │   │   ├── ProfileName.svelte       # 이름 표시 컴포넌트
│           │   │   ├── Header.svelte            # 상단 헤더 (로고, 타이틀, 버튼)
│           │   │   ├── ContentCard.svelte       # 이어보기 카드 (확장 모드)
│           │   │   └── PocControlPanel.svelte   # POC 컨트롤 패널 ★ 신규
│           │   │       ├── ProfileCountControl.svelte  # 프로필 수 토글 ★ 신규
│           │   │       └── ThemeSelector.svelte        # 그래픽 스타일 선택 ★ 신규
│           │   │
│           │   └── utils/
│           │       ├── navigation.js  # 키보드 네비게이션
│           │       └── avatarUrl.js   # 아바타 URL 생성
│           │
│           └── styles/
│               ├── global.css              # 전역 스타일, CSS 변수
│               ├── animations.css          # 공통 애니메이션 keyframes
│               ├── theme-dark-neo.css      # 테마: Dark Neo ★ 신규
│               ├── theme-warm.css          # 테마: Warm ★ 신규
│               ├── theme-pastel.css        # 테마: Pastel ★ 신규
│               └── theme-midnight.css      # 테마: Midnight ★ 신규
└── README.md
```

---

## 5. 데이터 모델

### 프로파일 스키마 (`profiles.js`)

```javascript
// src/lib/data/profiles.js

export const PROFILES = [
  {
    id: 'profile_1',
    name: '진수',
    gradient: 'linear-gradient(to bottom, #1B4FD8 0%, #0A2A7A 100%)',
    panelAccentColor: '#1B4FD8',
    avatarUrl: 'https://models.readyplayer.me/[id].png?scene=fullbody-portrait-v1',
    recentContents: [
      {
        id: 'c1',
        title: '진격의 거인',
        episode: 'EP.12 - 울부짖는 새벽',
        progress: 0.65,
        thumbnailGradient: 'linear-gradient(135deg, #2C3E50, #4A4A6A)'
      }
    ]
  },
  {
    id: 'profile_2',
    name: '지은',
    gradient: 'linear-gradient(to bottom, #C0392B 0%, #6E0E0A 100%)',
    panelAccentColor: '#C0392B',
    avatarUrl: '...',
    recentContents: []
  },
  {
    id: 'profile_3',
    name: '민준',
    gradient: 'linear-gradient(to bottom, #27AE60 0%, #145A32 100%)',
    panelAccentColor: '#27AE60',
    avatarUrl: '...',
    recentContents: []
  },
  {
    id: 'profile_4',
    name: '하나',
    gradient: 'linear-gradient(to bottom, #E67E22 0%, #B7470A 100%)',
    panelAccentColor: '#E67E22',
    avatarUrl: '...',
    recentContents: []
  },
  {
    id: 'profile_add',
    name: '프로파일 추가',
    gradient: 'linear-gradient(to bottom, #4A4A4A 0%, #1A1A1A 100%)',
    panelAccentColor: '#666666',
    avatarUrl: null,   // + 아이콘 표시
    recentContents: []
  }
];
```

### Svelte Store (`profileStore.js`)

```javascript
// src/lib/stores/profileStore.js
import { writable, derived } from 'svelte/store';
import { PROFILES } from '../data/profiles.js';

export const profiles = writable(PROFILES);
export const focusedIndex = writable(0);

// 포커스된 프로파일
export const focusedProfile = derived(
  [profiles, focusedIndex],
  ([$profiles, $focusedIndex]) => $profiles[$focusedIndex]
);
```

### POC 설정 스토어 (`pocConfigStore.js`) ★ 신규

```javascript
// src/lib/stores/pocConfigStore.js
import { writable, derived } from 'svelte/store';
import { PROFILES } from '../data/profiles.js';
import { THEMES } from '../data/themes.js';

// 화면에 표시할 프로파일 수 (2~7)
export const profileCount = writable(5);

// 현재 선택된 그래픽 테마 ID
export const activeThemeId = writable('dark-neo');

// profileCount 기반으로 활성 프로파일 목록 자동 슬라이스
export const activeProfiles = derived(
  profileCount,
  ($count) => PROFILES.slice(0, $count)
);

// 현재 테마 객체
export const activeTheme = derived(
  activeThemeId,
  ($id) => THEMES.find(t => t.id === $id) ?? THEMES[0]
);

// CSS 변수 일괄 적용 헬퍼
export function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme.cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  document.documentElement.setAttribute('data-theme', theme.id);
}
```

### 그래픽 테마 정의 (`themes.js`) ★ 신규

```javascript
// src/lib/data/themes.js

export const THEMES = [
  {
    id: 'dark-neo',
    label: 'Dark Neo',
    preview: '#1a1a2e',        // 카드 미리보기 컬러
    cssVars: {
      '--bg-base':              '#0a0a0a',
      '--panel-unfocused-bg':   '#1a1a1a',
      '--panel-overlay':        'rgba(0,0,0,0.55)',
      '--unfocused-filter':     'grayscale(100%) brightness(35%)',
      '--text-primary':         '#ffffff',
      '--text-secondary':       'rgba(255,255,255,0.6)',
      '--panel-flex-focused':   '4',
      '--panel-transition':     '500ms cubic-bezier(0.34,1.56,0.64,1)',
      '--border-radius-panel':  '0px',
    }
  },
  {
    id: 'warm',
    label: 'Warm',
    preview: '#2d1b0e',
    cssVars: {
      '--bg-base':              '#1a0f07',
      '--panel-unfocused-bg':   '#2d1b0e',
      '--panel-overlay':        'rgba(80,30,0,0.5)',
      '--unfocused-filter':     'grayscale(80%) brightness(40%) sepia(30%)',
      '--text-primary':         '#ffe4c4',
      '--text-secondary':       'rgba(255,228,196,0.6)',
      '--panel-flex-focused':   '4',
      '--panel-transition':     '600ms cubic-bezier(0.25,1,0.5,1)',
      '--border-radius-panel':  '0px',
    }
  },
  {
    id: 'pastel',
    label: 'Pastel',
    preview: '#f0e6ff',
    cssVars: {
      '--bg-base':              '#f5f0ff',
      '--panel-unfocused-bg':   '#e8e0f0',
      '--panel-overlay':        'rgba(200,180,230,0.4)',
      '--unfocused-filter':     'grayscale(60%) brightness(70%) saturate(50%)',
      '--text-primary':         '#2d1b4e',
      '--text-secondary':       'rgba(45,27,78,0.6)',
      '--panel-flex-focused':   '4',
      '--panel-transition':     '450ms ease-in-out',
      '--border-radius-panel':  '16px',
    }
  },
  {
    id: 'midnight',
    label: 'Midnight',
    preview: '#0d0d2b',
    cssVars: {
      '--bg-base':              '#060614',
      '--panel-unfocused-bg':   '#0d0d2b',
      '--panel-overlay':        'rgba(0,0,40,0.65)',
      '--unfocused-filter':     'grayscale(100%) brightness(25%) hue-rotate(200deg)',
      '--text-primary':         '#c8d8ff',
      '--text-secondary':       'rgba(200,216,255,0.55)',
      '--panel-flex-focused':   '4',
      '--panel-transition':     '550ms cubic-bezier(0.16,1,0.3,1)',
      '--border-radius-panel':  '0px',
    }
  }
];
```

---

## 6. 핵심 컴포넌트 구현 사양

### 6.1 ProfilePanel.svelte (핵심 컴포넌트)

```svelte
<!-- ProfilePanel.svelte -->
<script>
  export let profile;
  export let isFocused = false;

  // 포커스 상태에 따라 클래스 동적 적용
  $: panelClass = isFocused ? 'panel panel--focused' : 'panel panel--unfocused';
</script>

<div
  class={panelClass}
  style="background: {isFocused ? profile.gradient : '#1a1a1a'};"
  role="button"
  tabindex="0"
  on:click
  on:keydown
>
  <div class="panel__avatar" class:panel__avatar--focused={isFocused}>
    <ProfileAvatar {profile} {isFocused} />
  </div>

  {#if isFocused}
    <div class="panel__name" transition:fly={{ y: 20, duration: 300 }}>
      {profile.name}
    </div>
  {/if}
</div>

<style>
  .panel {
    flex: 1;
    position: relative;
    overflow: hidden;
    transition: flex 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
  }

  .panel--focused {
    flex: 4;           /* 포커스 시 4배 확장 */
  }

  .panel--unfocused .panel__avatar {
    filter: grayscale(100%) brightness(35%);
    transition: filter 0.4s ease;
  }

  .panel--focused .panel__avatar {
    filter: none;
    transition: filter 0.4s ease;
  }

  .panel__avatar {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 85%;
    object-fit: cover;
    object-position: top;
  }

  .panel__name {
    position: absolute;
    bottom: 8%;
    width: 100%;
    text-align: center;
    font-size: clamp(1.2rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 2px 12px rgba(0,0,0,0.6);
    letter-spacing: 0.03em;
  }
</style>
```

### 6.2 ProfileScreen.svelte (메인 화면)

```svelte
<!-- ProfileScreen.svelte -->
<script>
  import { focusedIndex, profiles } from '../stores/profileStore.js';
  import ProfilePanel from './ProfilePanel.svelte';

  function navigate(dir) {
    focusedIndex.update(i => {
      const total = $profiles.length;
      return (i + dir + total) % total;   // 무한 루프
    });
  }
</script>

<svelte:window on:keydown={handleKey} />

<section class="profile-screen" aria-label="프로파일 선택">
  {#each $profiles as profile, i}
    <ProfilePanel
      {profile}
      isFocused={i === $focusedIndex}
      on:click={() => focusedIndex.set(i)}
    />
  {/each}
</section>

<style>
  .profile-screen {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #0a0a0a;
  }
</style>
```

### 6.3 키보드 네비게이션 (`navigation.js`)

```javascript
// src/lib/utils/navigation.js
export function createKeyHandler(navigateFn, selectFn) {
  return function handleKey(e) {
    const actions = {
      'ArrowLeft':  () => navigateFn(-1),
      'ArrowRight': () => navigateFn(1),
      'Enter':      () => selectFn(),
      ' ':          () => selectFn(),   // Space도 선택 지원 (리모컨 대응)
    };
    const action = actions[e.key];
    if (action) { e.preventDefault(); action(); }
  };
}
```

---

## 6.4 PocControlPanel.svelte (신규 컴포넌트)

```svelte
<!-- PocControlPanel.svelte -->
<script>
  import { profileCount, activeThemeId, activeTheme, applyTheme } from '../stores/pocConfigStore.js';
  import { THEMES } from '../data/themes.js';
  import ThemeSelector from './ThemeSelector.svelte';
  import ProfileCountControl from './ProfileCountControl.svelte';

  let isOpen = false;
  const PROFILE_COUNT_OPTIONS = [2, 3, 4, 5, 6, 7];

  // 테마 변경 시 CSS 변수 즉시 적용
  $: applyTheme($activeTheme);

  function togglePanel() { isOpen = !isOpen; }
</script>

<!-- 컨트롤 토글 버튼 -->
<button class="poc-fab" on:click={togglePanel} title="POC Controls (Tab)">
  ⚙
</button>

{#if isOpen}
  <div class="poc-panel" role="dialog" aria-label="POC 컨트롤 패널">
    <header class="poc-panel__header">
      <span>⚙ POC Controls</span>
      <button on:click={togglePanel}>✕</button>
    </header>

    <!-- 프로필 수 변경 -->
    <section class="poc-panel__section">
      <h3>프로필 수</h3>
      <ProfileCountControl
        options={PROFILE_COUNT_OPTIONS}
        bind:value={$profileCount}
      />
    </section>

    <!-- 그래픽 스타일 변경 -->
    <section class="poc-panel__section">
      <h3>그래픽 스타일</h3>
      <ThemeSelector
        themes={THEMES}
        bind:activeId={$activeThemeId}
      />
    </section>
  </div>
{/if}

<style>
  .poc-fab {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 9999;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    font-size: 1.3rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .poc-fab:hover { background: rgba(255,255,255,0.25); }

  .poc-panel {
    position: fixed;
    right: 24px;
    bottom: 84px;
    z-index: 9998;
    width: 320px;
    background: rgba(20, 20, 30, 0.92);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    padding: 16px;
    color: #fff;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  }
  .poc-panel__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 0.95rem;
  }
  .poc-panel__section {
    margin-bottom: 16px;
  }
  .poc-panel__section h3 {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }
</style>
```

### 6.5 ProfileCountControl.svelte (신규)

```svelte
<!-- ProfileCountControl.svelte -->
<script>
  export let options = [2, 3, 4, 5, 6, 7];
  export let value = 5;
</script>

<div class="count-control">
  {#each options as opt}
    <button
      class="count-btn"
      class:count-btn--active={opt === value}
      on:click={() => value = opt}
    >
      {opt}
    </button>
  {/each}
</div>

<style>
  .count-control {
    display: flex;
    gap: 8px;
  }
  .count-btn {
    flex: 1;
    padding: 8px 0;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.6);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
  }
  .count-btn--active {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.5);
    color: #fff;
  }
</style>
```

### 6.6 ThemeSelector.svelte (신규)

```svelte
<!-- ThemeSelector.svelte -->
<script>
  export let themes = [];
  export let activeId = 'dark-neo';
</script>

<div class="theme-grid">
  {#each themes as theme}
    <button
      class="theme-card"
      class:theme-card--active={theme.id === activeId}
      style="--preview: {theme.preview};"
      on:click={() => activeId = theme.id}
    >
      <span class="theme-card__swatch"></span>
      <span class="theme-card__label">{theme.label}</span>
    </button>
  {/each}
</div>

<style>
  .theme-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .theme-card {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.7);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.18s ease;
    text-align: left;
  }
  .theme-card--active {
    border-color: rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.15);
    color: #fff;
  }
  .theme-card__swatch {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: var(--preview);
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.2);
  }
</style>
```

---

## 7. 개발 단계

### Phase 1: 환경 구성 (목표: 0.5일)

- [ ] Svelte + Vite 프로젝트 초기화 (`npm create vite@latest . -- --template svelte`)
- [ ] 폴더 구조 생성 (`components/`, `stores/`, `data/`, `utils/`, `styles/`)
- [ ] `global.css` 디자인 토큰 정의 (CSS 변수 기반, 테마 교체 구조 고려)
- [ ] Google Fonts (Poppins + Noto Sans KR) 연동
- [ ] 샘플 프로파일 풀 7개 데이터 작성 (`profiles.js`)
- [ ] 그래픽 테마 4종 정의 (`themes.js`)

### Phase 2: 세로 패널 아코디언 레이아웃 (목표: 1.5일)

- [ ] `ProfileScreen.svelte` - flex 100vw×100vh 컨테이너
- [ ] `ProfilePanel.svelte` - 포커스/비포커스 `flex` 전환 + `cubic-bezier` 스프링 애니메이션
- [ ] `ProfileAvatar.svelte` - `grayscale ↔ fullcolor` 필터 전환
- [ ] `ProfileName.svelte` - 포커스 시 이름 페이드인 (`svelte/transition fly`)
- [ ] `Header.svelte` - 로고(좌), 타이틀(중앙), 관리 버튼(우) 고정 오버레이
- [ ] `activeProfiles` store → `ProfileScreen` 연동 (프로필 수 변경 반영)

### Phase 3: POC 컨트롤 패널 ★ 신규 (목표: 1일)

- [ ] `pocConfigStore.js` - `profileCount`, `activeThemeId`, `activeProfiles`, `activeTheme` store 구현
- [ ] `applyTheme()` - CSS 변수 일괄 교체 헬퍼 함수 구현
- [ ] `ProfileCountControl.svelte` - 프로필 수(2~7) 토글 버튼 UI
- [ ] `ThemeSelector.svelte` - 4종 테마 카드 선택 UI (컬러 스와치 + 레이블)
- [ ] `PocControlPanel.svelte` - 플로팅 패널 컨테이너 (글래스모피즘 스타일)
- [ ] `Tab` 키로 컨트롤 패널 열기/닫기 구현
- [ ] 테마 CSS 파일 4종 작성 (`theme-dark-neo.css`, `theme-warm.css`, `theme-pastel.css`, `theme-midnight.css`)
- [ ] 프로필 수 변경 시 `focusedIndex` 범위 초과 방지 로직

### Phase 4: 아바타 및 시각 효과 (목표: 1일)

- [ ] Ready Player Me API 연동 또는 고품질 3D 아바타 이미지 준비
- [ ] 아바타 하단 정렬 (상반신 노출 효과)
- [ ] 포커스 패널 하단 발광 효과 (box-shadow, radial-gradient overlay)
- [ ] 비포커스 패널 어두운 오버레이 레이어 (`::after` pseudo-element)
- [ ] 패널 경계 미세 구분선 효과

### Phase 5: 키보드 네비게이션 (목표: 0.5일)

- [ ] `createKeyHandler` 유틸 작성 및 App.svelte 연결
- [ ] 무한 루프 인덱스 계산 (`(i + dir + total) % total`)
- [ ] 포커스 전환 시 자동 스크롤/패널 확장 연동
- [ ] `Tab` → 컨트롤 패널 토글, ESC → 패널 닫기 / 카드 닫기
- [ ] 화면 하단 조작 키 힌트 오버레이 표시

### Phase 6: 이어보기 카드 확장 모드 (목표: 1일)

- [ ] `Enter` 키로 포커스 패널 내 이어보기 카드 표시 (2단계 인터랙션)
- [ ] `ContentCard.svelte` - 썸네일 컬러, 제목, 회차, 진행률 바
- [ ] 진행률 바 애니메이션 (`svelte/transition` + CSS)
- [ ] ESC 키로 카드 닫기

### Phase 7: 폴리싱 및 데모 준비 (목표: 0.5일)

- [ ] 반응형 레이아웃 (데스크톱 16:9, TV 해상도 대응)
- [ ] Chrome / Safari 크로스브라우저 테스트
- [ ] `README.md` 실행 방법, 조작 키, 테마/프로필 수 변경 방법 안내
- [ ] 최종 데모용 스크린샷 및 녹화

---

## 8. UI 디자인 가이드라인

### 8.1 전체 색상 팔레트

| 이름 | 값 | 용도 |
|------|-----|------|
| Background | `#0a0a0a` | 기본 배경 |
| Panel Dark | `#1a1a1a` | 비포커스 패널 배경 |
| Text Primary | `#FFFFFF` | 포커스 패널 이름 |
| Text Secondary | `rgba(255,255,255,0.6)` | 서브 텍스트 |
| Progress Fill | `#4FC3F7` | 이어보기 진행률 바 |
| Manage Button | `#E50914` (Netflix Red) | 상단 관리 버튼 |

### 8.2 개인별 테마 그래디언트

| 프로파일 | 컬러 | 그래디언트 |
|---------|------|-----------|
| 프로파일 1 | Blue | `#1B4FD8 → #0A2A7A` |
| 프로파일 2 | Red | `#C0392B → #6E0E0A` |
| 프로파일 3 | Green | `#27AE60 → #145A32` |
| 프로파일 4 | Orange | `#E67E22 → #B7470A` |
| 프로파일 5 | Purple | `#8E44AD → #5B2C6F` |

### 8.3 타이포그래피

| 요소 | 폰트 | 크기 | 굵기 |
|------|------|------|------|
| "Who's Watching?" 타이틀 | Poppins | `clamp(1.4rem, 2.5vw, 2.2rem)` | 600 |
| 프로파일 이름 | Poppins | `clamp(1.2rem, 3vw, 2.6rem)` | 700 |
| 관리 버튼 | Poppins | `1rem` | 600 |
| 콘텐츠 제목 | Noto Sans KR | `1rem` | 700 |

### 8.4 애니메이션 타이밍

| 동작 | Duration | Easing |
|------|----------|--------|
| 패널 너비 전환 | `500ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| 흑백 ↔ 컬러 전환 | `400ms` | `ease-in-out` |
| 이름 페이드인 | `300ms` | `fly { y: 20 }` |
| 버튼 호버 | `150ms` | `ease-out` |

### 8.5 패널 레이아웃 비율

```css
:root {
  --panel-flex-unfocused: 1;
  --panel-flex-focused: 4;       /* 1:4 비율 - 이미지 참고 기준 */
  --panel-transition: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --avatar-height: 85%;          /* 패널 하단에서 상반신 노출 높이 */
  --avatar-grayscale: grayscale(100%) brightness(35%);
}
```

---

## 9. 완료 기준 (Definition of Done)

| 항목 | 기준 |
|------|------|
| 패널 아코디언 | ← → 키로 패널 포커스 이동, 포커스 패널 flex 4배 확장 |
| 흑백/컬러 전환 | 비포커스: grayscale, 포커스: 개인 컬러 그래디언트, 전환 시 부드러운 애니메이션 |
| 아바타 표시 | 3D 스타일 아바타 하단 정렬 (상반신 노출), 포커스 시 선명 출력 |
| 이름 표시 | 포커스 패널 하단에 프로파일 이름 표시, 전환 시 fly 애니메이션 |
| 헤더 | 로고(좌), "Who's Watching?"(중앙), "Manage Profiles" 버튼(우) 고정 표시 |
| 이어보기 카드 | Enter 키 시 이어보기 콘텐츠 카드 2개 이상 표시, 진행률 바 시각화 |
| **프로필 수 변경** ★ | **컨트롤 패널에서 2~7 중 선택 시 패널 개수 즉시 반영, 포커스 인덱스 안전하게 조정** |
| **그래픽 스타일 변경** ★ | **4종 테마 카드(Dark Neo / Warm / Pastel / Midnight) 선택 시 CSS 변수 즉시 교체, 전체 화면 변경** |
| **컨트롤 패널 접근** ★ | **⚙ FAB 버튼 클릭 또는 Tab 키로 패널 열기/닫기, 글래스모피즘 스타일 패널 표시** |
| 크로스브라우저 | Chrome, Safari 정상 동작 |
| 조작 안내 | 화면 하단에 키 힌트 상시 표시 (← → 이동, Enter 선택, Tab 컨트롤 패널) |

---

## 10. 리스크 및 대응

| 리스크 | 영향도 | 대응방안 |
|--------|--------|---------|
| Ready Player Me API 접근 제한 | 중 | 고품질 3D 아바타 이미지 직접 수집하여 `/assets/avatars/` 로컬 저장 |
| CSS `filter: grayscale()` TV 브라우저 미지원 | 중 | `opacity` 대체 + 흑백 아바타 별도 이미지 준비 폴백 |
| `flex` 전환 레이아웃 성능 저하 | 저 | `will-change: flex`, GPU 가속 `transform` 병행 사용 |
| Svelte 빌드 결과물 TV WebKit 호환성 | 중 | Svelte target을 ES6+로 설정, `@sveltejs/vite-plugin-svelte` 최신 버전 유지 |
| 프로필 수 변경 시 focusedIndex 범위 초과 | 저 | `profileCount` store 변경 시 `focusedIndex.update(i => Math.min(i, count-1))` 처리 |
| Pastel 테마에서 grayscale 필터 어색한 밝기 | 저 | 테마별 `--unfocused-filter` CSS 변수로 개별 조정 |

---

## 11. 실행 방법 (개발 서버)

```bash
# 프로젝트 폴더로 이동
cd src/profile-poc

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

---

## 12. 참고 자료

- [Gemini Canvas 참고 구현](https://gemini.google.com/share/41fe538b2364)
- [Svelte 공식 문서](https://svelte.dev/docs)
- [Vite + Svelte 시작 가이드](https://vitejs.dev/guide/)
- [Ready Player Me API](https://docs.readyplayer.me/ready-player-me/api-reference/rest-api/avatars/get-3d-avatars)
- [CSS cubic-bezier 시각화](https://cubic-bezier.com/)
- [Samsung TV Web 개발 가이드](https://developer.samsung.com/smarttv/develop/guides.html)

---

*본 계획서는 POC 진행 과정에서 업데이트될 수 있습니다.*
