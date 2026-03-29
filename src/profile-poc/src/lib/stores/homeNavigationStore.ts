import { writable } from 'svelte/store';

const SECTIONS = ['header', 'hero', 'recents', 'recommended', 'news', 'apps'];

const initialState = {
  focusedSection: 'hero', // 기본적으로 중앙 히어로 포커스
  focusedAppIndex: 2,     // TV Plus (default)
  focusedCardIndex: 0,    // 컨텐츠 행 내 포커스
  mainBtnIndex: 0         // 메인 버튼 포커스
};

export const homeFocusStore = writable({ ...initialState });

export function resetHomeFocus() {
  homeFocusStore.set({ ...initialState });
}

export function moveHomeFocus(direction, counts: any = {}) {
  // counts 예상 구조: { apps: 6, recents: 4, recommended: 4, news: 4 }
  homeFocusStore.update(s => {
    const next = { ...s };
    const currentIdx = SECTIONS.indexOf(s.focusedSection);

    if (direction === 'ArrowUp') {
      if (currentIdx > 0) {
        next.focusedSection = SECTIONS[currentIdx - 1];
        next.focusedCardIndex = 0; // 섹션 이동 시 카드 인덱스 초기화
      }
    } else if (direction === 'ArrowDown') {
      if (currentIdx < SECTIONS.length - 1) {
        next.focusedSection = SECTIONS[currentIdx + 1];
        next.focusedCardIndex = 0;
      }
    } else if (direction === 'ArrowLeft') {
      if (s.focusedSection === 'apps') {
        next.focusedAppIndex = Math.max(0, s.focusedAppIndex - 1);
      } else if (s.focusedSection === 'hero') {
        next.mainBtnIndex = Math.max(0, s.mainBtnIndex - 1);
      } else {
        // 컨텐츠 행 내 좌우 이동
        next.focusedCardIndex = Math.max(0, s.focusedCardIndex - 1);
      }
    } else if (direction === 'ArrowRight') {
      const currentCounts = (counts[s.focusedSection] || 4);
      if (s.focusedSection === 'apps') {
        const appsCount = counts.apps || 6;
        next.focusedAppIndex = Math.min(appsCount - 1, s.focusedAppIndex + 1);
      } else if (s.focusedSection === 'hero') {
        next.mainBtnIndex = Math.min(1, s.mainBtnIndex + 1);
      } else {
        // 컨텐츠 행 내 좌우 이동
        next.focusedCardIndex = Math.min(currentCounts - 1, s.focusedCardIndex + 1);
      }
    }

    return next;
  });
}
