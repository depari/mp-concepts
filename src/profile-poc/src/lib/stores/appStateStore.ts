import { writable } from 'svelte/store';

export const APP_MODES = {
  SELECTION: 'selection', // 프로필 선택 화면
  HOME: 'home',          // TV 홈 화면 (Mock)
  DEEP_LINK: 'deep_link' // 앱 실행 시뮬레이션
};

export const appStateStore = writable({
  mode: APP_MODES.SELECTION,
  deepLinkTarget: null
});

export function enterHome() {
  appStateStore.update(s => ({ ...s, mode: APP_MODES.HOME }));
}

export function exitHome() {
  appStateStore.update(s => ({ ...s, mode: APP_MODES.SELECTION }));
}

export function triggerDeepLink(target) {
  appStateStore.update(s => ({ 
    ...s, 
    mode: APP_MODES.DEEP_LINK,
    deepLinkTarget: target
  }));
  
  // 3초 뒤에 홈 화면으로 복귀하거나 안내 메시지 표시 종료 (시뮬레이션)
  setTimeout(() => {
    appStateStore.set({ mode: APP_MODES.HOME, deepLinkTarget: null });
  }, 3000);
}
