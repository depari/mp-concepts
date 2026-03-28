// src/lib/stores/profileStore.js
import { writable, derived } from 'svelte/store';
import { PROFILES } from '../data/profiles.js';
import { profileCount } from './pocConfigStore.js';

// 포커스 인덱스
export const focusedIndex = writable(0);

// profileCount에 따라 활성 프로파일 목록 자동 슬라이스
export const activeProfiles = derived(
  profileCount,
  ($count) => PROFILES.slice(0, $count)
);

// 포커스된 프로파일 객체
export const focusedProfile = derived(
  [activeProfiles, focusedIndex],
  ([$profiles, $idx]) => $profiles[$idx] ?? $profiles[0]
);

// 네비게이션: 무한 루프
export function navigate(dir) {
  let currentProfiles;
  activeProfiles.subscribe(p => { currentProfiles = p; })();

  focusedIndex.update(i => {
    const total = currentProfiles.length;
    return (i + dir + total) % total;
  });
}

// profileCount 변경 시 focusedIndex 범위 초과 방지
profileCount.subscribe(count => {
  focusedIndex.update(i => Math.min(i, count - 1));
});
