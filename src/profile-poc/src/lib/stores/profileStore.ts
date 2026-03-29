// src/lib/stores/profileStore.js
import { writable, derived } from 'svelte/store';
import { PROFILES } from '../data/profiles.js';
import { profileCount } from './pocConfigStore.js';

// 포커스 인덱스 (강조 표시용)
export const focusedIndex = writable(0);

// 실제 선택된 인덱스 (화면 전환용)
export const selectedIndex = writable(0);

// profileCount에 따라 활성 프로파일 목록 자동 슬라이스
export const activeProfiles = derived(
  profileCount,
  ($count) => PROFILES.slice(0, $count)
);

// 포커스된 프로파일 객체 (UI 하이라이트용)
export const focusedProfile = derived(
  [activeProfiles, focusedIndex],
  ([$profiles, $idx]) => $profiles[$idx] ?? $profiles[0]
);

// 선택(확정)된 프로파일 객체 (실제 컨텐츠 표출용)
export const selectedProfile = derived(
  [activeProfiles, selectedIndex],
  ([$profiles, $idx]) => $profiles[$idx] ?? $profiles[0]
);

// 네비게이션: 무한 루프 (포커스 인덱스만 조절)
export function navigate(dir) {
  let currentProfiles;
  activeProfiles.subscribe(p => { currentProfiles = p; })();

  focusedIndex.update(i => {
    const total = currentProfiles.length;
    return (i + dir + total) % total;
  });
}

// 프로파일 확정: 현재 포커스된 인덱스를 선택된 인덱스로 동기화
export function selectProfile() {
  let fIdx;
  focusedIndex.subscribe(v => { fIdx = v; })();
  selectedIndex.set(fIdx);
}

// profileCount 변경 시 인덱스 범위 초과 방지
profileCount.subscribe(count => {
  focusedIndex.update(i => Math.min(i, count - 1));
  selectedIndex.update(i => Math.min(i, count - 1));
});
