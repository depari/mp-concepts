import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { homeFocusStore, moveHomeFocus, resetHomeFocus } from './homeNavigationStore.js';

describe('homeNavigationStore.ts - Navigation Focus sequence', () => {
  beforeEach(() => {
    resetHomeFocus('header');
  });

  it('기본 상태(HOME 모드)에서 header에서 Down 시 pig를 건너뛰고 hero로 가야 한다', () => {
    // appMode가 'home'이면 pig를 건너뛰어 hero로 바로 가야 함.
    moveHomeFocus('ArrowDown', { apps: 5, recents: 5, recommended: 5, news: 5 }, 'home');
    
    expect(get(homeFocusStore).focusedSection).toBe('hero'); 
  });

  it('PIG 모드일 때는 header에서 Down 시 pig로 가야 한다', () => {
    // appMode가 'pig'이면 pig 섹션이 포함되므로 pig로 가야 함.
    moveHomeFocus('ArrowDown', { apps: 5, recents: 5, recommended: 5, news: 5 }, 'pig');
    
    expect(get(homeFocusStore).focusedSection).toBe('pig');
  });
});
