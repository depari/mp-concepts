# Full Mode 프로파일 화면 - 컨텐츠 탐색 기능 고도화 계획서

> **문서 정보**
> - 작성일: 2026-03-29
> - 버전: v1.0
> - 연관 문서: [dev_plan_profile_poc.md](./dev_plan_profile_poc.md)
> - 적용 범위: ProfilePanel.svelte (Full Mode 선택 후) → ProfileDashboard.svelte 고도화

---

## 1. 개요

### 1.1 배경 및 목적

현재 Full Mode 프로파일 선택 후 진입하는 **ProfileDashboard**는 단순히 `previewContentStore`에서 전달받은 데이터를 가로 스크롤 카드 형태로 나열하는 수준에 머물러 있다.

본 계획서는 이를 아래의 **4가지 컨텐츠 카테고리** 를 포함한 구조화된 탐색 경험으로 고도화하는 것을 목표로 한다.

| 카테고리 | 설명 |
|---------|------|
| **최근 실행 앱** | 프로파일별 최근 실행된 OTT/앱 아이콘 목록 |
| **최근 시청 컨텐츠** | 이어보기 진행률 포함, 프로파일 시청 이력 기반 |
| **추천 컨텐츠** | 시청 이력 기반 유사 컨텐츠 추천 (CF/콘텐츠 기반 필터링 시뮬레이션) |
| **추천 뉴스** | 프로파일 관심사 기반 뉴스 카드 제공 |

### 1.2 현재 상태 (As-Is)

```
ProfilePanel (Full Mode 포커스)
  └─ Enter Key
       └─ ProfileDashboard.svelte
            └─ previewContentStore.data → 단순 카드 Row (1 Row)
```

### 1.3 목표 상태 (To-Be)

```
ProfilePanel (Full Mode 포커스)
  └─ Enter Key  
       └─ FullModeContentHub.svelte (신규)
            ├─ Section 1: 최근 실행 앱     (AppShortcutRow)
            ├─ Section 2: 최근 시청 컨텐츠  (RecentWatchRow)   ← Enter로 이어보기 실행
            ├─ Section 3: 추천 컨텐츠      (RecommendedRow)
            └─ Section 4: 추천 뉴스        (NewsCardRow)
```

---

## 2. 화면 레이아웃 정의

### 2.1 전체 레이아웃 구조

```
┌──────────────────────────────────────────────────────────────────────┐
│  SAMSUNG               [진수 ▼]           [알림] [설정]              │  ← 헤더 (현재 유지)
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  🕐 최근 실행 앱                                           보기 →     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                      │
│  │  N   │ │  Y   │ │  T+  │ │  D+  │ │  P   │                      │  ← AppShortcutRow
│  │Netflix│ │YouTube│ │TVING │ │Disney│ │Prime │                      │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                      │
│                                                                      │
│  📺 이어보기                                               보기 →     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                  │
│  │ [썸네일]     │ │ [썸네일]     │ │ [썸네일]     │                  │  ← RecentWatchRow
│  │ 진격의 거인  │ │  지금 우리   │ │  오징어 게임 │                  │
│  │ EP.12 ▓▓▓░░ │ │  학교는...   │ │  S2:EP.4    │                  │
│  │ Netflix • 65%│ │ TVING • 42% │ │ Netflix • 80%│                  │
│  └──────────────┘ └──────────────┘ └──────────────┘                  │
│                                                                      │
│  ✨ 진수님을 위한 추천                                     보기 →     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐│
│  │ [썸네일]     │ │ [썸네일]     │ │ [썸네일]     │ │ [썸네일]     ││  ← RecommendedRow
│  │  도깨비      │ │  이상한 변호사│ │  더 글로리   │ │  무빙        ││
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘│
│                                                                      │
│  📰 오늘의 뉴스                                            보기 →     │
│  ┌──────────────────────┐ ┌──────────────────────┐                  │
│  │ [이미지]   IT/테크   │ │ [이미지]   엔터       │                  │  ← NewsCardRow
│  │ 삼성전자 갤럭시 AI  │ │ BTS 새 앨범 발표...  │                  │
│  │ 2026 라인업 공개... │ │ 15분 전 • 네이버뉴스 │                  │
│  └──────────────────────┘ └──────────────────────┘                  │
│                                                                      │
│              [← 이전]  ★ 최근실행앱  📺 이어보기  ✨ 추천  📰 뉴스  │  ← 하단 섹션 인디케이터
└──────────────────────────────────────────────────────────────────────┘
```

### 2.2 포커스 네비게이션 구조

```
              ↑ (상단 헤더로 이동)
              │
  ← → (Section 간 수평 이동은 Row 내부에서)
              │
  [섹션1: 최근 실행 앱]    ← ↑ ↓ →
              │ ↓
  [섹션2: 이어보기]         ← ↑ ↓ →
              │ ↓
  [섹션3: 추천 컨텐츠]      ← ↑ ↓ →
              │ ↓
  [섹션4: 뉴스]             ← ↑ ↓ →
              │
              ESC: ProfileScreen으로 복귀
```

---

## 3. 데이터 모델

### 3.1 프로파일 히스토리 스키마 (확장)

> 현재 `profiles.js`의 `recentContents` 배열을 아래 구조로 확장한다.

```javascript
// src/lib/data/profiles.js (확장 스키마)

const PROFILE_SCHEMA = {
  id: 'profile_1',
  name: '진수',

  // ─── 기존 필드 ───────────────────────────────────────
  gradient: 'linear-gradient(...)',
  panelAccentColor: '#1B4FD8',
  avatarUrl: '...',

  // ─── 신규: 최근 실행 앱 이력 ─────────────────────────
  recentApps: [
    {
      id: 'netflix',
      name: 'Netflix',
      iconColor: '#E50914',
      iconInitial: 'N',
      lastUsedAt: '2026-03-29T10:30:00+09:00',   // ISO 8601
      deepLinkId: 'netflix'
    },
    // ...
  ],

  // ─── 신규: 최근 시청 이력 ────────────────────────────
  recentContents: [
    {
      content_id: 'rc_001',
      title: '진격의 거인',
      subtitle: 'EP.12 - 울부짖는 새벽',
      thumbnail_url: null,                         // null이면 색상 배경 사용
      thumbnail_gradient: 'linear-gradient(135deg, #2C3E50, #4A4A6A)',
      progress: 65,                                // 0~100 (%)
      provider_id: 'netflix',
      provider_label: 'Netflix',
      lastWatchedAt: '2026-03-28T22:15:00+09:00',
      deepLinkId: 'netflix'
    },
    // ...
  ],

  // ─── 신규: 추천 컨텐츠 ──────────────────────────────
  recommendedContents: [
    {
      content_id: 'rec_001',
      title: '도깨비',
      genre: ['판타지', '로맨스'],
      thumbnail_url: null,
      thumbnail_gradient: 'linear-gradient(135deg, #141E30, #243B55)',
      provider_id: 'netflix',
      reason: '시청 이력 기반',                    // 추천 이유 라벨
      rating: 9.2,
      deepLinkId: 'netflix'
    },
    // ...
  ],

  // ─── 신규: 관심사 태그 (뉴스 필터링 기반) ────────────
  interestTags: ['IT/테크', '엔터테인먼트', '스포츠'],
};
```

### 3.2 뉴스 데이터 스키마

```javascript
// src/lib/data/news.js (신규)

export const NEWS_ITEMS = [
  {
    news_id: 'news_001',
    title: '삼성전자 갤럭시 AI 2026 라인업 공개',
    summary: '삼성전자가 갤럭시 AI 기능을 대폭 강화한 2026년 신제품 라인업을 발표했다.',
    category: 'IT/테크',
    source: '네이버뉴스',
    publishedAt: '2026-03-29T09:00:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #1B4FD8, #0A2A7A)',
    url: '#'                                       // POC에서는 딥링크 없음
  },
  {
    news_id: 'news_002',
    title: 'BTS 새 앨범 글로벌 차트 1위',
    summary: 'BTS의 신보가 발매 첫날 빌보드를 포함한 전세계 50개국 차트 1위를 차지했다.',
    category: '엔터테인먼트',
    source: '연합뉴스',
    publishedAt: '2026-03-29T07:30:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #C0392B, #6E0E0A)',
    url: '#'
  },
  // ... (카테고리: IT/테크, 엔터테인먼트, 스포츠, 경제, 생활)
];
```

---

## 4. 신규 Store 설계

### 4.1 contentDiscoveryStore.js (신규)

```javascript
// src/lib/stores/contentDiscoveryStore.js

import { writable, derived } from 'svelte/store';
import { focusedProfile } from './profileStore.js';
import { NEWS_ITEMS } from '../data/news.js';

// ── 섹션 포커스 상태 ─────────────────────────────────────
// section: 'apps' | 'recents' | 'recommended' | 'news'
// cardIndex: 현재 섹션 내 카드 인덱스
export const discoveryFocusStore = writable({
  section: 'apps',
  cardIndex: 0
});

// ── 로딩 상태 ─────────────────────────────────────────────
export const discoveryLoadingStore = writable(false);

// ── 현재 프로파일의 최근 앱 (derived) ──────────────────────
export const profileRecentApps = derived(
  focusedProfile,
  ($profile) => $profile?.recentApps ?? []
);

// ── 현재 프로파일의 이어보기 컨텐츠 (derived) ───────────────
export const profileRecentContents = derived(
  focusedProfile,
  ($profile) => $profile?.recentContents ?? []
);

// ── 추천 컨텐츠 (derived) ───────────────────────────────────
export const profileRecommendedContents = derived(
  focusedProfile,
  ($profile) => $profile?.recommendedContents ?? []
);

// ── 뉴스 필터링 (프로파일 관심사 기반) ──────────────────────
export const profileFilteredNews = derived(
  focusedProfile,
  ($profile) => {
    const tags = $profile?.interestTags ?? [];
    if (tags.length === 0) return NEWS_ITEMS.slice(0, 4);
    return NEWS_ITEMS
      .filter(n => tags.includes(n.category))
      .slice(0, 4);
  }
);

// ── 네비게이션 헬퍼 ─────────────────────────────────────────
const SECTIONS = ['apps', 'recents', 'recommended', 'news'];

export function moveSection(dir) {
  discoveryFocusStore.update(s => ({
    section: SECTIONS[Math.max(0, Math.min(SECTIONS.length - 1,
      SECTIONS.indexOf(s.section) + dir
    ))],
    cardIndex: 0
  }));
}

export function moveCard(dir, maxCount) {
  discoveryFocusStore.update(s => ({
    ...s,
    cardIndex: Math.max(0, Math.min(maxCount - 1, s.cardIndex + dir))
  }));
}
```

---

## 5. 신규 컴포넌트 설계

### 5.1 컴포넌트 계층 구조

```
FullModeContentHub.svelte          ← 전체 컨테이너, 키보드 이벤트 관리
  ├── ContentSectionHeader.svelte  ← 섹션 헤더 (아이콘 + 타이틀 + "보기" 링크)
  ├── AppShortcutRow.svelte        ← 최근 실행 앱 Row
  │     └── AppShortcutCard.svelte
  ├── RecentWatchRow.svelte        ← 이어보기 Row
  │     └── RecentWatchCard.svelte (진행률 바 포함)
  ├── RecommendedRow.svelte        ← 추천 컨텐츠 Row
  │     └── ContentCard.svelte     (기존 재활용 + 확장)
  └── NewsCardRow.svelte           ← 뉴스 Row
        └── NewsCard.svelte
```

### 5.2 FullModeContentHub.svelte

```svelte
<!-- src/lib/components/FullModeContentHub.svelte -->
<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import {
    discoveryFocusStore,
    profileRecentApps,
    profileRecentContents,
    profileRecommendedContents,
    profileFilteredNews,
    moveSection,
    moveCard
  } from '../stores/contentDiscoveryStore.js';
  import { triggerDeepLink } from '../stores/appStateStore.js';
  import { focusedProfile } from '../stores/profileStore.js';

  import ContentSectionHeader from './ContentSectionHeader.svelte';
  import AppShortcutRow from './AppShortcutRow.svelte';
  import RecentWatchRow from './RecentWatchRow.svelte';
  import RecommendedRow from './RecommendedRow.svelte';
  import NewsCardRow from './NewsCardRow.svelte';

  $: profile = $focusedProfile;
  $: focus = $discoveryFocusStore;

  // 섹션별 데이터 길이 맵
  $: sectionDataMap = {
    apps:        $profileRecentApps.length,
    recents:     $profileRecentContents.length,
    recommended: $profileRecommendedContents.length,
    news:        $profileFilteredNews.length
  };

  function handleKeydown(e) {
    const count = sectionDataMap[focus.section] ?? 0;
    switch (e.key) {
      case 'ArrowUp':
        moveSection(-1);
        e.preventDefault(); break;
      case 'ArrowDown':
        moveSection(1);
        e.preventDefault(); break;
      case 'ArrowLeft':
        moveCard(-1, count);
        e.stopImmediatePropagation(); break;
      case 'ArrowRight':
        moveCard(1, count);
        e.stopImmediatePropagation(); break;
      case 'Enter':
        handleSelect();
        e.stopImmediatePropagation(); break;
    }
  }

  function handleSelect() {
    // 섹션별 선택 처리
    if (focus.section === 'apps') {
      const app = $profileRecentApps[focus.cardIndex];
      if (app) triggerDeepLink(app.deepLinkId);
    } else if (focus.section === 'recents') {
      const item = $profileRecentContents[focus.cardIndex];
      if (item) triggerDeepLink(item.deepLinkId);
    } else if (focus.section === 'recommended') {
      const item = $profileRecommendedContents[focus.cardIndex];
      if (item) triggerDeepLink(item.deepLinkId);
    }
    // 뉴스는 Enter 시 뉴스 상세 오버레이 (추후)
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="content-hub" in:fade={{ duration: 400 }}>
  <!-- 인사 헤더 -->
  <div class="hub-greeting" in:fly={{ y: -20, delay: 100, duration: 400 }}>
    <h2>안녕하세요, <span style="color: {profile.panelAccentColor};">{profile.name}</span>님 👋</h2>
    <p class="hub-date">{new Date().toLocaleDateString('ko-KR', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
  </div>

  <!-- 섹션 1: 최근 실행 앱 -->
  <section class="hub-section" in:fly={{ y: 30, delay: 200, duration: 400 }}>
    <ContentSectionHeader icon="🕐" title="최근 실행 앱" />
    <AppShortcutRow
      apps={$profileRecentApps}
      focusedIndex={focus.section === 'apps' ? focus.cardIndex : -1}
      accentColor={profile.panelAccentColor}
    />
  </section>

  <!-- 섹션 2: 이어보기 -->
  <section class="hub-section" in:fly={{ y: 30, delay: 350, duration: 400 }}>
    <ContentSectionHeader icon="📺" title="이어보기" />
    <RecentWatchRow
      items={$profileRecentContents}
      focusedIndex={focus.section === 'recents' ? focus.cardIndex : -1}
      accentColor={profile.panelAccentColor}
    />
  </section>

  <!-- 섹션 3: 추천 컨텐츠 -->
  <section class="hub-section" in:fly={{ y: 30, delay: 500, duration: 400 }}>
    <ContentSectionHeader icon="✨" title="{profile.name}님을 위한 추천" />
    <RecommendedRow
      items={$profileRecommendedContents}
      focusedIndex={focus.section === 'recommended' ? focus.cardIndex : -1}
      accentColor={profile.panelAccentColor}
    />
  </section>

  <!-- 섹션 4: 추천 뉴스 -->
  <section class="hub-section" in:fly={{ y: 30, delay: 650, duration: 400 }}>
    <ContentSectionHeader icon="📰" title="오늘의 뉴스" />
    <NewsCardRow
      items={$profileFilteredNews}
      focusedIndex={focus.section === 'news' ? focus.cardIndex : -1}
    />
  </section>

  <!-- 하단 섹션 인디케이터 -->
  <nav class="section-indicator">
    {#each ['apps','recents','recommended','news'] as sec}
      <div class="indicator-dot" class:active={focus.section === sec}></div>
    {/each}
  </nav>
</div>

<style>
  .content-hub {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    display: flex;
    flex-direction: column;
    padding: 60px 80px 40px;
    gap: 32px;
    overflow: hidden;
    z-index: 50;
    color: white;
    font-family: var(--font-korean);
  }

  .hub-greeting h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .hub-date {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.5);
  }

  .hub-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-shrink: 0;
  }

  .section-indicator {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: auto;
    padding-top: 16px;
  }
  .indicator-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transition: all 0.3s ease;
  }
  .indicator-dot.active {
    background: white;
    width: 20px;
    border-radius: 3px;
  }
</style>
```

### 5.3 AppShortcutCard.svelte

```svelte
<!-- src/lib/components/AppShortcutCard.svelte -->
<script>
  export let app;
  export let isFocused = false;
  export let accentColor = '#1B4FD8';
</script>

<div class="app-card" class:focused={isFocused}>
  <div
    class="app-icon"
    style="background: {app.iconColor};
      box-shadow: {isFocused ? `0 0 20px ${app.iconColor}88` : 'none'};"
  >
    {app.iconInitial}
  </div>
  <span class="app-name">{app.name}</span>
  {#if isFocused}
    <span class="last-used">방금 전</span>
  {/if}
</div>

<style>
  .app-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
    width: 90px;
  }
  .app-card.focused {
    transform: translateY(-10px) scale(1.12);
  }
  .app-icon {
    width: 72px;
    height: 72px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 900;
    border: 3px solid transparent;
    transition: border-color 0.2s, box-shadow 0.3s;
  }
  .focused .app-icon {
    border-color: white;
  }
  .app-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
  }
  .last-used {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.5);
  }
</style>
```

### 5.4 RecentWatchCard.svelte

```svelte
<!-- src/lib/components/RecentWatchCard.svelte -->
<script>
  export let item;
  export let isFocused = false;
  export let accentColor = '#1B4FD8';
</script>

<div class="watch-card" class:focused={isFocused}>
  <!-- 썸네일 영역 -->
  <div class="card-thumb" style="background: {item.thumbnail_gradient};">
    {#if item.thumbnail_url}
      <img src={item.thumbnail_url} alt={item.title} />
    {/if}
    <!-- 재생 버튼 (포커스 시) -->
    {#if isFocused}
      <div class="play-overlay">▶</div>
    {/if}
    <!-- 진행률 바 -->
    <div class="progress-track">
      <div
        class="progress-fill"
        style="width: {item.progress}%; background: {accentColor};"
      ></div>
    </div>
  </div>

  <!-- 카드 정보 -->
  <div class="card-info">
    <span class="provider-badge">{item.provider_label}</span>
    <p class="card-title">{item.title}</p>
    <p class="card-subtitle">{item.subtitle}</p>
    <p class="card-progress">{item.progress}% 시청</p>
  </div>
</div>

<style>
  .watch-card {
    flex: 0 0 280px;
    background: rgba(255,255,255,0.05);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .watch-card.focused {
    transform: translateY(-8px) scale(1.04);
    border-color: white;
    background: rgba(255,255,255,0.12);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  }
  .card-thumb {
    position: relative;
    height: 160px;
    overflow: hidden;
  }
  .card-thumb img {
    width: 100%; height: 100%;
    object-fit: cover;
  }
  .play-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }

  .progress-track {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 4px;
    background: rgba(255,255,255,0.25);
  }
  .progress-fill {
    height: 100%;
    transition: width 0.5s ease;
  }
  .card-info {
    padding: 14px;
  }
  .provider-badge {
    display: inline-block;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: rgba(255,255,255,0.15);
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  .card-title {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-subtitle {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.6);
    margin: 0 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-progress {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.45);
    margin: 0;
  }
</style>
```

### 5.5 NewsCard.svelte

```svelte
<!-- src/lib/components/NewsCard.svelte -->
<script>
  export let item;
  export let isFocused = false;
</script>

<div class="news-card" class:focused={isFocused}>
  <div class="news-thumb" style="background: {item.thumbnail_gradient};">
    <span class="news-category">{item.category}</span>
  </div>
  <div class="news-body">
    <p class="news-title">{item.title}</p>
    <p class="news-summary">{item.summary}</p>
    <div class="news-meta">
      <span>{item.source}</span>
      <span>·</span>
      <span>{formatRelative(item.publishedAt)}</span>
    </div>
  </div>
</div>

<script context="module">
  function formatRelative(iso) {
    const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
    if (diff < 60) return `${diff}분 전`;
    if (diff < 1440) return `${Math.floor(diff/60)}시간 전`;
    return `${Math.floor(diff/1440)}일 전`;
  }
</script>

<style>
  .news-card {
    flex: 0 0 340px;
    display: flex;
    gap: 16px;
    background: rgba(255,255,255,0.05);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .news-card.focused {
    transform: translateY(-6px) scale(1.03);
    border-color: white;
    background: rgba(255,255,255,0.12);
    box-shadow: 0 16px 32px rgba(0,0,0,0.4);
  }
  .news-thumb {
    width: 120px;
    flex-shrink: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
  }
  .news-category {
    display: inline-block;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    background: rgba(0,0,0,0.5);
    border-radius: 4px;
    padding: 3px 7px;
    letter-spacing: 0.05em;
  }
  .news-body {
    flex: 1;
    padding: 14px 14px 14px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .news-title {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .news-summary {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.55);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .news-meta {
    display: flex;
    gap: 6px;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.4);
    margin-top: auto;
  }
</style>
```

---

## 6. 개발 단계 (Phase Plan)

### Phase 1: 데이터 레이어 구축 (0.5일)

| 태스크 | 파일 | 내용 |
|-------|------|------|
| 프로파일 데이터 확장 | `src/lib/data/profiles.js` | `recentApps`, `recommendedContents`, `interestTags` 필드 추가 |
| 뉴스 목 데이터 작성 | `src/lib/data/news.js` (신규) | 5개 카테고리 × 2~3건 = 10건 이상 |
| Discovery Store 구현 | `src/lib/stores/contentDiscoveryStore.js` (신규) | 섹션 포커스, derived 데이터, 네비게이션 헬퍼 |

**TDD TC 목록 (Phase 1):**
```javascript
// contentDiscoveryStore.test.js
describe('contentDiscoveryStore', () => {
  test('moveSection(-1) → section이 첫번째이면 변하지 않음')
  test('moveSection(1) → 마지막 섹션에서 변하지 않음')
  test('moveCard(-1, 5) → cardIndex가 0 미만이 되지 않음')
  test('moveCard(1, 5) → cardIndex가 maxCount-1 초과하지 않음')
  test('profileFilteredNews → 관심사 없는 프로파일은 기본 4건 반환')
  test('profileFilteredNews → 관심사 카테고리 일치 뉴스만 필터링')
})
```

---

### Phase 2: 공통 Row 컨테이너 컴포넌트 구현 (0.5일)

| 컴포넌트 | 기능 |
|---------|------|
| `ContentSectionHeader.svelte` | 아이콘 + 타이틀 + "보기 →" 버튼 |
| `AppShortcutRow.svelte` + `AppShortcutCard.svelte` | 최근 실행 앱 가로 스크롤 Row |
| `RecentWatchRow.svelte` + `RecentWatchCard.svelte` | 이어보기 카드 (진행률 바 포함) |

**TDD TC 목록 (Phase 2):**
```javascript
describe('AppShortcutCard', () => {
  test('isFocused=true 시 .focused 클래스 적용')
  test('isFocused=true 시 포커스 변환(translateY) 애니메이션 클래스 존재')
})
describe('RecentWatchCard', () => {
  test('progress=65 이면 progress-fill width가 65%')
  test('isFocused=true 시 play-overlay 렌더링')
  test('thumbnail_url=null 이면 img 태그 미렌더링')
})
```

---

### Phase 3: 추천 및 뉴스 Row 구현 (0.5일)

| 컴포넌트 | 기능 |
|---------|------|
| `RecommendedRow.svelte` | 추천 컨텐츠 Row (기존 ContentCard.svelte 재활용) |
| `NewsCard.svelte` (신규) | 썸네일 Left + 본문 Right 레이아웃 |
| `NewsCardRow.svelte` (신규) | 뉴스 카드 가로 스크롤 Row |

**TDD TC 목록 (Phase 3):**
```javascript
describe('NewsCard', () => {
  test('publishedAt 30분 전이면 "30분 전" 표시')
  test('publishedAt 2시간 전이면 "2시간 전" 표시')
  test('isFocused=true 시 .focused 클래스 적용')
})
```

---

### Phase 4: FullModeContentHub 통합 및 키보드 네비게이션 (1일)

| 태스크 | 내용 |
|-------|------|
| `FullModeContentHub.svelte` 구현 | 4개 섹션 통합 레이아웃 + 인사 헤더 |
| 키보드 이벤트 통합 | `↑↓` 섹션 이동, `←→` 카드 이동, `Enter` 딥링크 실행 |
| `ProfilePanel.svelte` 연동 | Enter 키 시 기존 `ProfileDashboard` → `FullModeContentHub` 전환 |
| `interactionStore` 확장 | `isContentHubActive` 플래그 추가 |

**TDD TC 목록 (Phase 4):**
```javascript
describe('FullModeContentHub keydown', () => {
  test('ArrowDown → section이 다음 섹션으로 이동')
  test('ArrowUp → section이 apps일 때 이동 없음')
  test('ArrowRight → 현재 섹션 cardIndex 증가')
  test('ArrowLeft → cardIndex가 0 미만으로 이동 불가')
  test('Enter on apps section → triggerDeepLink 호출')
  test('Enter on recents section → triggerDeepLink 호출')
})
```

---

### Phase 5: 시각 폴리싱 (0.5일)

| 항목 | 내용 |
|-----|------|
| 섹션 인디케이터 | 하단 점 인디케이터 (active 시 pill 확장 애니메이션) |
| 포커스 이동 시 자동 스크롤 | `scrollIntoView` 또는 `transform` 기반 스크롤 보정 |
| 그래디언트 accentColor 의존 | 프로파일별 `panelAccentColor`를 진행률 바 / 아이콘 발광에 적용 |
| 로딩 스켈레톤 | 데이터 로딩 시 카드 위치 스켈레톤 표시 |
| 접근성 | `aria-label`, `role="listitem"` 추가 |

---

## 7. 파일 구조 변경 사항

```diff
 src/profile-poc/src/
 ├── lib/
 │   ├── data/
 │   │   ├── profiles.js           # recentApps, recommendedContents, interestTags 필드 추가
+│   │   └── news.js               # 신규: 뉴스 목 데이터
 │   ├── stores/
 │   │   ├── interactionStore.js   # isContentHubActive 플래그 추가
+│   │   └── contentDiscoveryStore.js  # 신규: 섹션 포커스, derived 데이터
 │   └── components/
 │       ├── ProfilePanel.svelte   # FullModeContentHub 연동
 │       ├── ProfileDashboard.svelte  # 유지 (MiniMode 대시보드 재활용)
+│       ├── FullModeContentHub.svelte  # 신규: 4-섹션 컨텐츠 허브
+│       ├── ContentSectionHeader.svelte  # 신규: 섹션 헤더
+│       ├── AppShortcutRow.svelte  # 신규: 최근 실행 앱 Row
+│       ├── AppShortcutCard.svelte # 신규: 앱 아이콘 카드
+│       ├── RecentWatchRow.svelte  # 신규: 이어보기 Row
+│       ├── RecentWatchCard.svelte # 신규: 이어보기 카드
+│       ├── RecommendedRow.svelte  # 신규: 추천 컨텐츠 Row
+│       ├── NewsCardRow.svelte     # 신규: 뉴스 Row
+│       └── NewsCard.svelte        # 신규: 뉴스 카드
```

---

## 8. 완료 기준 (Definition of Done)

| 항목 | 기준 |
|------|------|
| 데이터 구조 | 모든 프로파일에 recentApps (3+), recentContents (2+), recommendedContents (3+), interestTags (2+) 존재 |
| 최근 실행 앱 | 프로파일 진입 후 AppShortcutRow에 앱 아이콘 3개 이상 표시, ←→ 키로 포커스 이동, Enter 시 딥링크 실행 |
| 이어보기 | 진행률 바 정확도 (progress % 값과 width 일치), 포커스 시 ▶ 플레이 오버레이 표시 |
| 추천 컨텐츠 | 프로파일별 다른 추천 목록 표시, Enter 시 딥링크 실행 |
| 추천 뉴스 | 프로파일 interestTags 기반 필터링, 상대 시간 표시 (xx분 전) |
| 키보드 네비게이션 | ↑↓: 섹션 간 이동, ←→: 카드 이동, Enter: 실행, ESC: 이전 화면 복귀 |
| 섹션 인디케이터 | 현재 포커스 섹션에 따라 하단 도트 인디케이터 변경 |
| TDD | 각 Phase TC 100% pass 후 구현 완료 |
| 빌드 | `npm run build` 정상 완료 (에러 없음) |

---

## 9. 리스크 및 대응

| 리스크 | 영향도 | 대응방안 |
|--------|-------|---------|
| 4개 섹션 동시 마운트 시 성능 저하 | 중 | 뷰포트 외 섹션 `lazy` 렌더링, `display:none` 대신 `visibility` 활용 |
| 키보드 이벤트 충돌 (ProfilePanel ↔ ContentHub) | 고 | `e.stopImmediatePropagation()` 일관 적용, `isContentHubActive` 플래그 기반 조건 분기 |
| 뉴스 실시간 연동 API 부재 | 중 | POC는 `news.js` 목 데이터 사용, API 연동 인터페이스는 `interface` 형태로 추상화 |
| 프로파일 관심사 데이터 없는 경우 | 저 | `interestTags.length === 0` 이면 전체 뉴스에서 4건 기본 노출 |
| TV 브라우저 `backdrop-filter` 미지원 | 중 | `background: rgba(0,0,0,0.85)` 폴백 처리, `@supports (backdrop-filter: blur())` 조건부 적용 |

---

## 10. 참고 자료

- [기존 개발 계획서](./dev_plan_profile_poc.md) – ProfilePanel, ProfileDashboard 구현 스펙
- [ProfileDashboard.svelte](../src/profile-poc/src/lib/components/ProfileDashboard.svelte)
- [SamsungTVHome.svelte](../src/profile-poc/src/lib/components/SamsungTVHome.svelte)
- [Samsung Smart TV UX 가이드](https://developer.samsung.com/smarttv/develop/guides.html)
- [Svelte 스토어 문서](https://svelte.dev/docs/svelte-store)

---

*본 계획서는 POC 진행 과정에서 업데이트될 수 있습니다.*
