import { writable } from 'svelte/store';

export const APP_MODES = {
  SELECTION: 'selection', // 프로필 선택 화면
  HOME: 'home',          // TV 홈 화면 (Mock)
  DEEP_LINK: 'deep_link', // 앱 실행 시뮬레이션
  PIG: 'pig',            // Picture-In-Graphic (작은 재생창)
  APP_RUNNING: 'app_running' // 전체 화면 실행
};

export const appStateStore = writable({
  mode: APP_MODES.SELECTION,
  deepLinkTarget: null,
  pigContent: null
});

export function enterHome() {
  appStateStore.update(s => ({ ...s, mode: APP_MODES.HOME, pigContent: null }));
}

export function exitHome() {
  appStateStore.update(s => ({ ...s, mode: APP_MODES.SELECTION, pigContent: null }));
}

let deepLinkTimeout = null;

export function triggerDeepLink(target, content = null) {
  if (deepLinkTimeout) clearTimeout(deepLinkTimeout);

  appStateStore.update(s => ({ 
    ...s, 
    mode: APP_MODES.DEEP_LINK,
    deepLinkTarget: target
  }));
  
  // 2초 로딩 후 PIG 모드로 진입 (사용자 컨텐츠 재생 시작)
  deepLinkTimeout = setTimeout(() => {
    appStateStore.update(s => ({ 
      ...s, 
      mode: APP_MODES.PIG, 
      deepLinkTarget: null,
      pigContent: content
    }));
    deepLinkTimeout = null;
  }, 2000);
}

export function enterAppFull() {
  appStateStore.update(s => ({ ...s, mode: APP_MODES.APP_RUNNING }));
}

export function exitPIG() {
  appStateStore.update(s => ({ ...s, mode: APP_MODES.HOME, pigContent: null }));
}

export function cancelDeepLink() {
  if (deepLinkTimeout) {
    clearTimeout(deepLinkTimeout);
    deepLinkTimeout = null;
  }
  appStateStore.update(s => ({ ...s, mode: APP_MODES.SELECTION, deepLinkTarget: null, pigContent: null }));
}
