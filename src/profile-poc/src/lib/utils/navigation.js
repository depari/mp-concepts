// src/lib/utils/navigation.js
import { navigate, focusedIndex } from '../stores/profileStore.js';
import { togglePocPanel, isPocPanelOpen } from '../stores/pocConfigStore.js';

let panelOpen = false;
isPocPanelOpen.subscribe(v => { panelOpen = v; });

export function createKeyHandler(onSelect) {
  return function handleKey(e) {
    // 컨트롤 패널이 열려 있으면 Tab/Escape만 처리
    if (panelOpen) {
      if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault();
        togglePocPanel();
      }
      return;
    }

    const actions = {
      'ArrowLeft':  () => { e.preventDefault(); navigate(-1); },
      'ArrowRight': () => { e.preventDefault(); navigate(1); },
      'Enter':      () => { e.preventDefault(); onSelect?.(); },
      ' ':          () => { e.preventDefault(); onSelect?.(); },
      'Tab':        () => { e.preventDefault(); togglePocPanel(); },
      'Escape':     () => { e.preventDefault(); },
    };

    actions[e.key]?.();
  };
}
