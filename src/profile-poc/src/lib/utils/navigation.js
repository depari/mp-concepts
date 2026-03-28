import { navigate, focusedIndex } from '../stores/profileStore.js';
import { togglePocPanel, isPocPanelOpen } from '../stores/pocConfigStore.js';
import { activateDashboard, deactivateDashboard, interactionStore } from '../stores/interactionStore.js';
import { miniModeStore } from '../stores/miniModeStore.js';
import { appStateStore } from '../stores/appStateStore.js';
import { get } from 'svelte/store';

let panelOpen = false;
isPocPanelOpen.subscribe(v => { panelOpen = v; });

export function createKeyHandler(onSelect) {
  return function handleKey(e) {
    const state = get(appStateStore);
    const isSelectionMode = state.mode === 'selection';

    // 컨트롤 패널이 열려 있으면 Tab/Escape만 처리
    if (panelOpen) {
      if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault();
        togglePocPanel();
      }
      return;
    }

    const isDashboard = get(interactionStore).isDashboardActive;
    const miniMode = get(miniModeStore);
    const isSideMode = miniMode.isActive && (miniMode.position === 'left' || miniMode.position === 'right');

    const actions = {
      'ArrowLeft':  () => { 
        if (miniMode.isActive && !isSideMode) { e.preventDefault(); navigate(-1); }
        else if (isSelectionMode && !isSideMode) { e.preventDefault(); navigate(-1); }
      },
      'ArrowRight': () => { 
        if (miniMode.isActive && !isSideMode) { e.preventDefault(); navigate(1); }
        else if (isSelectionMode && !isSideMode) { e.preventDefault(); navigate(1); }
      },
      'ArrowUp':    () => { 
        if (miniMode.isActive && isSideMode) { e.preventDefault(); navigate(-1); }
        else {
          e.preventDefault();
          if (isDashboard) deactivateDashboard();
        }
      },
      'ArrowDown':  () => { 
        if (miniMode.isActive && isSideMode) { e.preventDefault(); navigate(1); }
        else {
          e.preventDefault();
          if (!isDashboard && isSelectionMode) activateDashboard();
        }
      },
      'Enter':      () => { 
        e.preventDefault(); 
        if (miniMode.isActive) {
          // 미니 모드에서 Enter시 홈으로 다시 진입 (이미 홈이겠지만 상태 갱신 및 모드 닫기)
          onSelect?.(); 
          window.dispatchEvent(new CustomEvent('toggle-mini-mode'));
        } else {
          onSelect?.(); 
        }
      },
      ' ':          () => { e.preventDefault(); onSelect?.(); },
      'Tab':        () => { e.preventDefault(); togglePocPanel(); },
      'Escape':     () => { e.preventDefault(); if (isDashboard) deactivateDashboard(); },
      'm':          () => { e.preventDefault(); window.dispatchEvent(new CustomEvent('toggle-mini-mode')); },
      'M':          () => { e.preventDefault(); window.dispatchEvent(new CustomEvent('toggle-mini-mode')); },
    };

    actions[e.key]?.();
  };
}
