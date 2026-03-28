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
        if (!isSideMode && isSelectionMode) { e.preventDefault(); navigate(-1); }
      },
      'ArrowRight': () => { 
        if (!isSideMode && isSelectionMode) { e.preventDefault(); navigate(1); }
      },
      'ArrowUp':    () => { 
        e.preventDefault();
        if (isSideMode) {
          navigate(-1);
        } else if (isDashboard) {
          deactivateDashboard();
        }
      },
      'ArrowDown':  () => { 
        e.preventDefault();
        if (isSideMode) {
          navigate(1);
        } else if (!isDashboard) {
          activateDashboard();
        }
      },
      'Enter':      () => { e.preventDefault(); onSelect?.(); },
      ' ':          () => { e.preventDefault(); onSelect?.(); },
      'Tab':        () => { e.preventDefault(); togglePocPanel(); },
      'Escape':     () => { e.preventDefault(); if (isDashboard) deactivateDashboard(); },
      'm':          () => { e.preventDefault(); window.dispatchEvent(new CustomEvent('toggle-mini-mode')); },
      'M':          () => { e.preventDefault(); window.dispatchEvent(new CustomEvent('toggle-mini-mode')); },
    };

    actions[e.key]?.();
  };
}
