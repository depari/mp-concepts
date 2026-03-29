// src/lib/stores/contentDiscoveryStore.js
// Full Mode 컨텐츠 탐색 허브의 섹션 포커스 및 데이터 관리

import { writable, derived } from 'svelte/store';
import { focusedProfile, selectedProfile } from './profileStore.js';
import { NEWS_ITEMS } from '../data/news.js';
import { COMMON_APPS, COMMON_CONTENTS, COMMON_RECOMMENDED } from '../data/common.js';

// ── 섹션 순서 정의 ─────────────────────────────────────────
const SECTIONS = ['apps', 'recents', 'recommended', 'news'];

// ── 섹션 포커스 상태 ───────────────────────────────────────
export const discoveryFocusStore = writable({
  section: 'apps',
  cardIndex: 0
});

// ── [Hub 전용] 포커스된 프로파일 기반 (실시간 탐색용) ───────
export const hubRecentApps = derived(
  focusedProfile,
  ($profile) => $profile?.recentApps ?? []
);

export const hubRecentContents = derived(
  focusedProfile,
  ($profile) => $profile?.recentContents ?? []
);

export const hubRecommendedContents = derived(
  focusedProfile,
  ($profile) => $profile?.recommendedContents ?? []
);

// ── [Home 전용] 선택된 프로파일 + 공통 컨텐츠 (메인 화면용) ──
export const homeRecentApps = derived(
  selectedProfile,
  ($profile) => {
    const profileApps = $profile?.recentApps ?? [];
    // 공통 앱을 앞에, 프로필 앱을 뒤에 합침 (유동적)
    return [...COMMON_APPS, ...profileApps];
  }
);

export const homeRecentContents = derived(
  selectedProfile,
  ($profile) => {
    const profileContents = $profile?.recentContents ?? [];
    return [...COMMON_CONTENTS, ...profileContents];
  }
);

export const homeRecommendedContents = derived(
  selectedProfile,
  ($profile) => {
    const profileRec = $profile?.recommendedContents ?? [];
    return [...COMMON_RECOMMENDED, ...profileRec];
  }
);

// ── 뉴스 필터링 (Hub용: 포커스 기반, Home용: 선택 기반) ───
export const hubFilteredNews = derived(
  focusedProfile,
  ($profile) => {
    const tags = $profile?.interestTags ?? [];
    if (tags.length === 0) return NEWS_ITEMS.slice(0, 4);
    const filtered = NEWS_ITEMS.filter((n) => tags.includes(n.category));
    return filtered.length > 0 ? filtered.slice(0, 4) : NEWS_ITEMS.slice(0, 4);
  }
);

export const homeFilteredNews = derived(
  selectedProfile,
  ($profile) => {
    const tags = $profile?.interestTags ?? [];
    if (tags.length === 0) return NEWS_ITEMS.slice(0, 4);
    const filtered = NEWS_ITEMS.filter((n) => tags.includes(n.category));
    return filtered.length > 0 ? filtered.slice(0, 4) : NEWS_ITEMS.slice(0, 4);
  }
);

// ── 네비게이션 헬퍼: 섹션 이동 ───────────────────────────
// dir: -1 (위) | 1 (아래)
export function moveSection(dir) {
  discoveryFocusStore.update((s) => {
    const currentIdx = SECTIONS.indexOf(s.section);
    const nextIdx = Math.max(0, Math.min(SECTIONS.length - 1, currentIdx + dir));
    return {
      section: SECTIONS[nextIdx],
      cardIndex: 0  // 섹션 이동 시 카드 인덱스 리셋
    };
  });
}

// ── 네비게이션 헬퍼: 카드 이동 ───────────────────────────
// dir: -1 (좌) | 1 (우), maxCount: 현재 섹션 아이템 수
export function moveCard(dir, maxCount) {
  if (maxCount <= 0) return;
  discoveryFocusStore.update((s) => ({
    ...s,
    cardIndex: Math.max(0, Math.min(maxCount - 1, s.cardIndex + dir))
  }));
}

// ── 섹션 포커스 리셋 (허브 진입 시 초기화) ────────────────
export function resetDiscoveryFocus() {
  discoveryFocusStore.set({ section: 'apps', cardIndex: 0 });
}
