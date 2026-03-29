import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

// contentDiscoveryStore.js가 없으면 import 실패 → TC failed 상태
import {
  discoveryFocusStore,
  moveSection,
  moveCard,
  profileFilteredNews,
  profileRecentApps,
  profileRecentContents,
  profileRecommendedContents,
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

describe('contentDiscoveryStore - profileFilteredNews', () => {
  it('profileFilteredNews는 store이며 배열을 반환함', () => {
    const news = get(profileFilteredNews);
    expect(Array.isArray(news)).toBe(true);
  });
});

describe('contentDiscoveryStore - profileRecentApps', () => {
  it('profileRecentApps는 store이며 배열을 반환함', () => {
    const apps = get(profileRecentApps);
    expect(Array.isArray(apps)).toBe(true);
  });
});

describe('contentDiscoveryStore - profileRecentContents', () => {
  it('profileRecentContents는 store이며 배열을 반환함', () => {
    const contents = get(profileRecentContents);
    expect(Array.isArray(contents)).toBe(true);
  });
});

describe('contentDiscoveryStore - profileRecommendedContents', () => {
  it('profileRecommendedContents는 store이며 배열을 반환함', () => {
    const recommended = get(profileRecommendedContents);
    expect(Array.isArray(recommended)).toBe(true);
  });
});
