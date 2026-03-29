// src/lib/stores/contentDiscoveryStore.js
// Full Mode 컨텐츠 탐색 허브의 섹션 포커스 및 데이터 관리

import { writable, derived } from 'svelte/store';
import { selectedProfile } from './profileStore.js';
import { NEWS_ITEMS } from '../data/news.js';

// ── 섹션 순서 정의 ─────────────────────────────────────────
const SECTIONS = ['apps', 'recents', 'recommended', 'news'];

// ── 섹션 포커스 상태 ───────────────────────────────────────
// section: 'apps' | 'recents' | 'recommended' | 'news'
// cardIndex: 현재 섹션 내 선택된 카드 인덱스
export const discoveryFocusStore = writable({
  section: 'apps',
  cardIndex: 0
});

// ── 현재 프로파일의 최근 실행 앱 (derived) ─────────────────
export const profileRecentApps = derived(
  selectedProfile,
  ($profile) => $profile?.recentApps ?? []
);

// ── 현재 프로파일의 이어보기 컨텐츠 (derived) ──────────────
export const profileRecentContents = derived(
  selectedProfile,
  ($profile) => $profile?.recentContents ?? []
);

// ── 현재 프로파일의 추천 컨텐츠 (derived) ──────────────────
export const profileRecommendedContents = derived(
  selectedProfile,
  ($profile) => $profile?.recommendedContents ?? []
);

// ── 뉴스 필터링: 프로파일 관심사 기반 (derived) ─────────────
// interestTags가 없으면 NEWS_ITEMS 앞 4건을 기본 반환
export const profileFilteredNews = derived(
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
