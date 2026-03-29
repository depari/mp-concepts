import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { createKeyHandler } from './navigation.js';
import { interactionStore } from '../stores/interactionStore.js';
import { appStateStore } from '../stores/appStateStore.js';
import { miniModeStore } from '../stores/miniModeStore.js';
import { isPowerOn } from '../stores/tvPowerStore.js';
import { focusedIndex } from '../stores/profileStore.js';

describe('navigation.ts - Profile Selection Mode Key Handling', () => {
  beforeEach(() => {
    isPowerOn.set(true);
    appStateStore.set({ mode: 'selection', deepLinkTarget: null });
    miniModeStore.set({ isActive: false, position: 'bottom' });
    interactionStore.set({ isDashboardActive: false, isContentHubActive: false });
  });

  it('ArrowDown을 누르면 컨텐츠 브라우저(ContentHub)가 열려야 한다', () => {
    const handler = createKeyHandler(() => {});
    
    expect(get(interactionStore).isContentHubActive).toBe(false);

    // ArrowDown 이벤트 발생 시뮬레이션
    handler({ key: 'ArrowDown', preventDefault: vi.fn() } as unknown as KeyboardEvent);

    expect(get(interactionStore).isContentHubActive).toBe(true);
  });

  it('컨텐츠 브라우저가 열려있을 때는 ArrowLeft/ArrowRight가 프로파일 네비게이션을 발생시키지 않아야 한다', () => {
    const preventDefault = vi.fn();
    const handler = createKeyHandler(() => {});
    
    // ContentHub 열림 설정
    interactionStore.set({ isContentHubActive: true, isDashboardActive: false });
    
    // 이 테스트는 navigate가 호출되지 않아야 함을 간접적으로 증명해야 함.
    // store.get(focusedIndex) 가 변경되지 않음을 확인할 수도 있지만 mock이 편함
    // 우리는 navigation.test.ts에서 focusedIndex 변화를 볼 수 있음
    focusedIndex.set(1);
    
    handler({ key: 'ArrowLeft', preventDefault } as unknown as KeyboardEvent);
    expect(get(focusedIndex)).toBe(1); // 변경되지 않음 (원래는 0이 되어야함)
    
    handler({ key: 'ArrowRight', preventDefault } as unknown as KeyboardEvent);
    expect(get(focusedIndex)).toBe(1); // 변경되지 않음 (원래는 2가 되어야함)
  });

  it('딥링크 모드(로딩) 중에는 프로필 변경 방향키가 무시되어야 하고, Escape로 취소되어야 한다', () => {
    const preventDefault = vi.fn();
    const handler = createKeyHandler(() => {});
    
    appStateStore.set({ mode: 'deep_link', deepLinkTarget: 'netflix' });
    focusedIndex.set(0);

    // 방향키 무시 테스트
    handler({ key: 'ArrowLeft', preventDefault } as unknown as KeyboardEvent);
    expect(get(focusedIndex)).toBe(0);

    // Escape 입력 시 딥링크 취소
    handler({ key: 'Escape', preventDefault } as unknown as KeyboardEvent);
    expect(get(appStateStore).mode).toBe('selection');
  });
});
