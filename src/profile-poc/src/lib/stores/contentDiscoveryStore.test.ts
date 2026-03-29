import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

// contentDiscoveryStore.js가 없으면 import 실패 → TC failed 상태
import {
  discoveryFocusStore,
  moveSection,
  moveCard,
  hubFilteredNews,
  hubRecentApps,
  hubRecentContents,
  hubRecommendedContents,
  homeRecentApps,
  homeRecentContents
} from './contentDiscoveryStore.js';

describe('contentDiscoveryStore - moveSection', () => {
  beforeEach(() => {
    discoveryFocusStore.set({ section: 'apps', cardIndex: 0 });
  });

  it('moveSection(1) → section이 apps에서 recents로 이동', () => {
    moveSection(1);
    expect(get(discoveryFocusStore).section).toBe('recents');
  });

  it('moveSection(-1) → section이 첫번째(apps)이면 변하지 않음', () => {
    moveSection(-1);
    expect(get(discoveryFocusStore).section).toBe('apps');
  });

  it('moveSection(1) → 마지막 섹션(news)에서 변하지 않음', () => {
    discoveryFocusStore.set({ section: 'news', cardIndex: 0 });
    moveSection(1);
    expect(get(discoveryFocusStore).section).toBe('news');
  });

  it('moveSection(1) → section 이동 시 cardIndex가 0으로 리셋됨', () => {
    discoveryFocusStore.set({ section: 'apps', cardIndex: 3 });
    moveSection(1);
    expect(get(discoveryFocusStore).cardIndex).toBe(0);
  });

  it('섹션 순서: apps → recents → recommended → news', () => {
    expect(get(discoveryFocusStore).section).toBe('apps');
    moveSection(1);
    expect(get(discoveryFocusStore).section).toBe('recents');
    moveSection(1);
    expect(get(discoveryFocusStore).section).toBe('recommended');
    moveSection(1);
    expect(get(discoveryFocusStore).section).toBe('news');
  });
});

describe('contentDiscoveryStore - moveCard', () => {
  beforeEach(() => {
    discoveryFocusStore.set({ section: 'recents', cardIndex: 2 });
  });

  it('moveCard(1, 5) → cardIndex가 3이 됨', () => {
    moveCard(1, 5);
    expect(get(discoveryFocusStore).cardIndex).toBe(3);
  });

  it('moveCard(-1, 5) → cardIndex가 1이 됨', () => {
    moveCard(-1, 5);
    expect(get(discoveryFocusStore).cardIndex).toBe(1);
  });

  it('moveCard(-1, 5) → cardIndex가 0 미만이 되지 않음', () => {
    discoveryFocusStore.set({ section: 'recents', cardIndex: 0 });
    moveCard(-1, 5);
    expect(get(discoveryFocusStore).cardIndex).toBe(0);
  });

  it('moveCard(1, 5) → cardIndex가 maxCount-1(4)을 초과하지 않음', () => {
    discoveryFocusStore.set({ section: 'recents', cardIndex: 4 });
    moveCard(1, 5);
    expect(get(discoveryFocusStore).cardIndex).toBe(4);
  });

  it('moveCard(1, 0) → maxCount가 0이면 cardIndex는 그대로 0', () => {
    discoveryFocusStore.set({ section: 'apps', cardIndex: 0 });
    moveCard(1, 0);
    expect(get(discoveryFocusStore).cardIndex).toBe(0);
  });
});

describe('contentDiscoveryStore - Data Integration', () => {
  it('hub 스토어들이 유효한 배열을 반환해야 한다 (Hub 전용)', () => {
    expect(Array.isArray(get(hubRecentApps))).toBe(true);
    expect(Array.isArray(get(hubRecentContents))).toBe(true);
    expect(Array.isArray(get(hubRecommendedContents))).toBe(true);
    expect(Array.isArray(get(hubFilteredNews))).toBe(true);
  });

  it('homeRecentApps는 공통 앱을 포함하고 있어야 한다', () => {
    const apps = get(homeRecentApps);
    // 공통 앱 (Settings, Browser, Gallery) 3개가 기본으로 포함됨
    expect(apps.some(a => a.id === 'settings')).toBe(true);
    expect(apps.length).toBeGreaterThanOrEqual(3);
  });

  it('homeRecentContents는 공통 컨텐츠를 포함하고 있어야 한다', () => {
    const contents = get(homeRecentContents);
    expect(contents.some(c => c.content_id === 'common_1')).toBe(true);
  });
});
