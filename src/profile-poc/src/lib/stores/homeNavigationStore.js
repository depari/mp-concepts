import { writable } from 'svelte/store';

const initialState = {
  focusedSection: 'apps', // 'header', 'hero', 'apps'
  focusedAppIndex: 2,     // TV Plus (default)
  mainBtnIndex: 0        // 지금 시청하기 (default)
};

export const homeFocusStore = writable({ ...initialState });

export function resetHomeFocus() {
  homeFocusStore.set({ ...initialState });
}

export function moveHomeFocus(direction, mockAppsCount = 6) {
  homeFocusStore.update(s => {
    const next = { ...s };

    if (direction === 'ArrowLeft') {
      if (s.focusedSection === 'apps') {
        next.focusedAppIndex = Math.max(0, s.focusedAppIndex - 1);
      } else if (s.focusedSection === 'hero') {
        next.mainBtnIndex = Math.max(0, s.mainBtnIndex - 1);
      }
    } else if (direction === 'ArrowRight') {
      if (s.focusedSection === 'apps') {
        next.focusedAppIndex = Math.min(mockAppsCount - 1, s.focusedAppIndex + 1);
      } else if (s.focusedSection === 'hero') {
        next.mainBtnIndex = Math.min(1, s.mainBtnIndex + 1);
      }
    } else if (direction === 'ArrowUp') {
      if (s.focusedSection === 'apps') next.focusedSection = 'hero';
      else if (s.focusedSection === 'hero') next.focusedSection = 'header';
    } else if (direction === 'ArrowDown') {
      if (s.focusedSection === 'header') next.focusedSection = 'hero';
      else if (s.focusedSection === 'hero') next.focusedSection = 'apps';
    }

    return next;
  });
}
