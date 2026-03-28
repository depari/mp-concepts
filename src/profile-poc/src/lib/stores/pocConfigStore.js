// src/lib/stores/pocConfigStore.js
import { writable, derived } from 'svelte/store';
import { THEMES } from '../data/themes.js';

// 화면에 표시할 프로파일 수 (2~7)
export const profileCount = writable(5);

// 현재 선택된 테마 ID
export const activeThemeId = writable('dark-neo');

// 현재 테마 객체
export const activeTheme = derived(
  activeThemeId,
  ($id) => THEMES.find(t => t.id === $id) ?? THEMES[0]
);

// CSS 변수 일괄 적용
export function applyTheme(theme) {
  if (!theme || typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(theme.cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute('data-theme', theme.id);
}

// 컨트롤 패널 오픈 상태
export const isPocPanelOpen = writable(false);

export function togglePocPanel() {
  isPocPanelOpen.update(v => !v);
}
