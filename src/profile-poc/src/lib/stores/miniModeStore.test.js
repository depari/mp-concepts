import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { miniModeStore, toggleMiniMode } from './miniModeStore.js';

describe('miniModeStore', () => {
  beforeEach(() => {
    miniModeStore.set({ isActive: false });
  });

  it('toggleMiniMode 함수 호출 시 isActive가 전환(toggle)되어야 합니다.', () => {
    expect(get(miniModeStore).isActive).toBe(false);
    toggleMiniMode();
    expect(get(miniModeStore).isActive).toBe(true);
    toggleMiniMode();
    expect(get(miniModeStore).isActive).toBe(false);
  });
});
