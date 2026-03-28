import { navigate, focusedIndex } from '../stores/profileStore.js';
import { togglePocPanel, isPocPanelOpen } from '../stores/pocConfigStore.js';
import { activateDashboard, deactivateDashboard, interactionStore } from '../stores/interactionStore.js';
import { miniModeStore, openMiniMode, toggleMiniMode } from '../stores/miniModeStore.js';
import { appStateStore, enterHome, exitHome } from '../stores/appStateStore.js';
import { isPowerOn } from '../stores/tvPowerStore.js';
import { homeFocusStore, moveHomeFocus } from '../stores/homeNavigationStore.js';
import { get } from 'svelte/store';

let panelOpen = false;
isPocPanelOpen.subscribe(v => { panelOpen = v; });

export function createKeyHandler(onSelect) {
  return function handleKey(e) {
    // 1. 전원 꺼짐 처리
    if (!get(isPowerOn)) return;

    // 2. 컨트롤 패널(Tab) 우선 처리
    if (panelOpen) {
      if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault();
        togglePocPanel();
      }
      return;
    }

    const state = get(appStateStore);
    const miniMode = get(miniModeStore);
    const homeFocus = get(homeFocusStore);
    const isSelectionMode = state.mode === 'selection';
    const isHomeMode = state.mode === 'home';
    const isSideMode = miniMode.isActive && (miniMode.position === 'left' || miniMode.position === 'right');
    const isDashboard = get(interactionStore).isDashboardActive;

    // 3. 미니 모드 활성화 시 네비게이션
    if (miniMode.isActive) {
      const pos = miniMode.position || 'bottom';
      
      // 위치별 바깥쪽 방향키로 Full 모드 진입
      if (pos === 'bottom' && e.key === 'ArrowDown') { e.preventDefault(); exitHome(); toggleMiniMode(); return; }
      if (pos === 'top' && e.key === 'ArrowUp') { e.preventDefault(); exitHome(); toggleMiniMode(); return; }
      if (pos === 'left' && e.key === 'ArrowLeft') { e.preventDefault(); exitHome(); toggleMiniMode(); return; }
      if (pos === 'right' && e.key === 'ArrowRight') { e.preventDefault(); exitHome(); toggleMiniMode(); return; }

      if (e.key === 'ArrowLeft' && !isSideMode) { e.preventDefault(); navigate(-1); }
      if (e.key === 'ArrowRight' && !isSideMode) { e.preventDefault(); navigate(1); }
      if (e.key === 'ArrowUp' && isSideMode) { e.preventDefault(); navigate(-1); }
      if (e.key === 'ArrowDown' && isSideMode) { e.preventDefault(); navigate(1); }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterHome();
        toggleMiniMode();
      }
      if (e.key === 'Escape') { e.preventDefault(); toggleMiniMode(); }
      return;
    }

    // 4. 홈 화면 모드 시 네비게이션
    if (isHomeMode) {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        moveHomeFocus(e.key);
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (homeFocus.focusedSection === 'header') {
          openMiniMode();
        } else {
          // TODO: 앱 실행 또는 컨텐츠 재생 로직
          console.log('Action performed on', homeFocus.focusedSection);
        }
      }
      if (e.key === 'm' || e.key === 'M') { e.preventDefault(); toggleMiniMode(); }
      return;
    }

    // 5. 프로필 선택 화면 (Selection Mode)
    const actions = {
      'ArrowLeft':  () => { if (!isSideMode) { e.preventDefault(); navigate(-1); } },
      'ArrowRight': () => { if (!isSideMode) { e.preventDefault(); navigate(1); } },
      'ArrowUp':    () => { 
        if (isSideMode) { e.preventDefault(); navigate(-1); }
        else if (isDashboard) { e.preventDefault(); deactivateDashboard(); }
      },
      'ArrowDown':  () => { 
        if (isSideMode) { e.preventDefault(); navigate(1); }
        else if (!isDashboard) { e.preventDefault(); activateDashboard(); }
      },
      'Enter':      () => { e.preventDefault(); onSelect?.(); },
      ' ':          () => { e.preventDefault(); onSelect?.(); },
      'Tab':        () => { e.preventDefault(); togglePocPanel(); },
      'Escape':     () => { if (isDashboard) { e.preventDefault(); deactivateDashboard(); } },
      'm':          () => { e.preventDefault(); toggleMiniMode(); },
      'M':          () => { e.preventDefault(); toggleMiniMode(); },
    };

    actions[e.key]?.();
  };
}
