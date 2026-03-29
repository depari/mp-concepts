<!-- src/lib/components/FullModeContentHub.svelte -->
<!-- Full Mode 컨텐츠 탐색 허브: 4개 섹션 통합 컨테이너 -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { get } from 'svelte/store';

  import {
    discoveryFocusStore,
    profileRecentApps,
    profileRecentContents,
    profileRecommendedContents,
    profileFilteredNews,
    moveSection,
    moveCard,
    resetDiscoveryFocus
  } from '../stores/contentDiscoveryStore.js';
  import {
    deactivateContentHub
  } from '../stores/interactionStore.js';
  import { triggerDeepLink } from '../stores/appStateStore.js';
  import { focusedProfile } from '../stores/profileStore.js';

  import ContentSectionHeader from './ContentSectionHeader.svelte';
  import AppShortcutRow from './AppShortcutRow.svelte';
  import RecentWatchRow from './RecentWatchRow.svelte';
  import RecommendedRow from './RecommendedRow.svelte';
  import NewsCardRow from './NewsCardRow.svelte';

  $: profile = $focusedProfile;
  $: focus = $discoveryFocusStore;

  // 섹션별 데이터 목록
  $: recentApps       = $profileRecentApps;
  $: recentContents   = $profileRecentContents;
  $: recommended      = $profileRecommendedContents;
  $: news             = $profileFilteredNews;

  // 섹션별 아이템 카운트 맵
  $: sectionCountMap = {
    apps:        recentApps.length,
    recents:     recentContents.length,
    recommended: recommended.length,
    news:        news.length
  };

  // 현재 날짜 표시 (한국어)
  const today = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const SECTIONS_ORDER = ['apps', 'recents', 'recommended', 'news'] as const;
  type SectionType = typeof SECTIONS_ORDER[number];
  
  const sectionRefs: Record<SectionType, HTMLElement | null> = {
    apps: null,
    recents: null,
    recommended: null,
    news: null
  };

  function scrollOnFocus(section: SectionType) {
    const el = sectionRefs[section];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }

  $: if (focus.section) {
    scrollOnFocus(focus.section as SectionType);
  }

  // 허브 진입 시 포커스 초기화
  onMount(() => {
    resetDiscoveryFocus();
  });

  function handleKeydown(e) {
    const { section, cardIndex } = get(discoveryFocusStore);
    const count = sectionCountMap[section] ?? 0;

    switch (e.key) {
      case 'ArrowUp':
        if (section === 'apps') {
          deactivateContentHub();
        } else {
          moveSection(-1);
        }
        e.stopImmediatePropagation();
        e.preventDefault();
        break;

      case 'ArrowDown':
        moveSection(1);
        e.stopImmediatePropagation();
        e.preventDefault();
        break;

      case 'ArrowLeft':
        moveCard(-1, count);
        e.stopImmediatePropagation();
        e.preventDefault();
        break;

      case 'ArrowRight':
        moveCard(1, count);
        e.stopImmediatePropagation();
        e.preventDefault();
        break;

      case 'Enter':
        handleSelect(section, cardIndex);
        e.stopImmediatePropagation();
        e.preventDefault();
        break;

      case 'Escape':
      case 'Backspace':
        deactivateContentHub();
        e.stopImmediatePropagation();
        e.preventDefault();
        break;
    }
  }

  function handleSelect(section, cardIndex) {
    if (section === 'apps') {
      const app = recentApps[cardIndex];
      if (app) {
        deactivateContentHub();
        triggerDeepLink(app.deepLinkId);
      }
    } else if (section === 'recents') {
      const item = recentContents[cardIndex];
      if (item) {
        deactivateContentHub();
        triggerDeepLink(item.deepLinkId);
      }
    } else if (section === 'recommended') {
      const item = recommended[cardIndex];
      if (item) {
        deactivateContentHub();
        triggerDeepLink(item.deepLinkId);
      }
    }
    // 뉴스는 Enter 시 별도 처리 없음 (POC)
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div
  class="content-hub"
  in:fade={{ duration: 350 }}
  out:fade={{ duration: 250 }}
  style="--accent: {profile?.panelAccentColor ?? '#ffffff'};"
>
  <!-- 배경 그라데이션 (프로파일 accent 색상 반영) -->
  <div
    class="hub-bg-tint"
    style="background: radial-gradient(ellipse at top right, {profile?.panelAccentColor ?? '#ffffff'}18 0%, transparent 55%);"
  ></div>

  <!-- 상단 인사 헤더 -->
  <div class="hub-greeting" in:fly={{ y: -24, delay: 80, duration: 400 }}>
    <div class="hub-greeting__left">
      <h2 class="hub-greeting__name">
        안녕하세요, <span style="color: {profile?.panelAccentColor};">{profile?.name}</span>님 👋
      </h2>
      <p class="hub-greeting__date">{today}</p>
    </div>
    <button class="hub-close-btn" on:click={deactivateContentHub} title="닫기 (ESC)">
      ✕
    </button>
  </div>

  <!-- 섹션 컨테이너 -->
  <div class="hub-sections">

    <!-- 섹션 1: 최근 실행 앱 -->
    <section
      class="hub-section"
      class:hub-section--focused={focus.section === 'apps'}
      in:fly={{ y: 30, delay: 160, duration: 400 }}
      bind:this={sectionRefs.apps}
    >
      <ContentSectionHeader icon="🕐" title="최근 실행 앱" />
      <AppShortcutRow
        apps={recentApps}
        focusedIndex={focus.section === 'apps' ? focus.cardIndex : -1}
      />
    </section>

    <!-- 구분선 -->
    <div class="hub-divider"></div>

    <!-- 섹션 2: 이어보기 -->
    <section
      class="hub-section"
      class:hub-section--focused={focus.section === 'recents'}
      in:fly={{ y: 30, delay: 260, duration: 400 }}
      bind:this={sectionRefs.recents}
    >
      <ContentSectionHeader icon="📺" title="이어보기" />
      <RecentWatchRow
        items={recentContents}
        focusedIndex={focus.section === 'recents' ? focus.cardIndex : -1}
        accentColor={profile?.panelAccentColor}
      />
    </section>

    <!-- 구분선 -->
    <div class="hub-divider"></div>

    <!-- 섹션 3: 추천 컨텐츠 -->
    <section
      class="hub-section"
      class:hub-section--focused={focus.section === 'recommended'}
      in:fly={{ y: 30, delay: 360, duration: 400 }}
      bind:this={sectionRefs.recommended}
    >
      <ContentSectionHeader icon="✨" title="{profile?.name}님을 위한 추천" />
      <RecommendedRow
        items={recommended}
        focusedIndex={focus.section === 'recommended' ? focus.cardIndex : -1}
      />
    </section>

    <!-- 구분선 -->
    <div class="hub-divider"></div>

    <!-- 섹션 4: 추천 뉴스 -->
    <section
      class="hub-section"
      class:hub-section--focused={focus.section === 'news'}
      in:fly={{ y: 30, delay: 460, duration: 400 }}
      bind:this={sectionRefs.news}
    >
      <ContentSectionHeader icon="📰" title="오늘의 뉴스" />
      <NewsCardRow
        items={news}
        focusedIndex={focus.section === 'news' ? focus.cardIndex : -1}
      />
    </section>

  </div>

  <!-- 하단 섹션 인디케이터 -->
  <nav class="section-indicator" aria-label="섹션 네비게이션">
    {#each SECTIONS_ORDER as sec}
      <div
        class="indicator-dot"
        class:active={focus.section === sec}
        style={focus.section === sec ? `background: ${profile?.panelAccentColor};` : ''}
      ></div>
    {/each}
  </nav>

  <!-- 키 조작 힌트 -->
  <div class="key-hints">
    <span class="hint">↑↓ 섹션 이동</span>
    <span class="hint-sep">·</span>
    <span class="hint">← → 카드 이동</span>
    <span class="hint-sep">·</span>
    <span class="hint">Enter 실행</span>
    <span class="hint-sep">·</span>
    <span class="hint">ESC 닫기</span>
  </div>
</div>

<style>
  .content-hub {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: rgba(5, 5, 12, 0.82);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    display: flex;
    flex-direction: column;
    padding: 36px 72px 20px;
    gap: 0;
    overflow: hidden;
    color: white;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
  }

  /* 배경 accent 틴트 */
  .hub-bg-tint {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  /* 인사 헤더 */
  .hub-greeting {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-shrink: 0;
  }

  .hub-greeting__name {
    font-size: 1.7rem;
    font-weight: 700;
    margin: 0 0 4px;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
    line-height: 1.2;
  }

  .hub-greeting__date {
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.45);
    margin: 0;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
  }

  /* 닫기 버튼 */
  .hub-close-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .hub-close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  /* 섹션 목록 */
  .hub-sections {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
  }

  .hub-sections::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }

  /* 개별 섹션 */
  .hub-section {
    padding: 10px 0 4px;
    transition: background 0.2s ease;
    border-radius: 10px;
    padding: 8px 10px;
    margin: 0 -10px;
    flex-shrink: 0;
  }

  .hub-section--focused {
    background: rgba(255, 255, 255, 0.04);
  }

  /* 구분선 */
  .hub-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.07);
    margin: 2px 0;
    flex-shrink: 0;
  }

  /* 하단 섹션 인디케이터 */
  .section-indicator {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 6px;
    justify-content: center;
    padding-top: 12px;
    flex-shrink: 0;
  }

  .indicator-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .indicator-dot.active {
    width: 22px;
    border-radius: 3px;
  }

  /* 키 조작 힌트 */
  .key-hints {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding-top: 8px;
    flex-shrink: 0;
  }

  .hint {
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.28);
    font-family: var(--font-primary, 'Poppins', sans-serif);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .hint-sep {
    color: rgba(255, 255, 255, 0.15);
    font-size: 0.68rem;
  }
</style>
