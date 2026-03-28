# 미니 모드 활성 아바타 상단 잘림 버그 수정

* **Date**: 2026-03-28
* **Task Number**: 05
* **Memorized Item**: minimode_avatar_clipping

## 개요
미니 모드(`MiniModeSelector.svelte`)에서 프로필 포커스 시, 대상 프로필 아바타의 크기가 축척 변환(`scale(1.1)`)되고 상단으로 이동(`translateY(-8px)`)하는 강조 CSS 애니메이션이 적용되어 있습니다. 
하지만 감싸고 있는 래퍼(`.mini-profiles`) 영역에 `overflow-x: auto` 속성이 활성화됨에 따라 이 래퍼의 상단 패딩 여백이 부족해져 확장된 아바타의 윗 부분이 잘려 나가는 클리핑(Clipping) 버그가 발견되어 시정했습니다.

## 문제점 개선 내역
1. **패딩(Padding) 여백 확대 배정**:
   - `MiniModeSelector.svelte` 내 `.mini-profiles` CSS 여백을 `padding: 10px 0;`에서 `padding: 24px 10px 10px;`로 상단 공간을 충분히 확보했습니다.
   - 이렇게 이너 바운딩 박스를 확장함으로써 Y축 음수 방향으로 포지션이 변환되더라도 래퍼의 스크롤 한계선 바깥으로 나가지 않게 되어 잘림 현상을 해결했습니다.

## 결과
이제 키보드 M 키를 눌러 활성화한 미니 모드 내에서 방향키 좌/우 이동 시 부드럽게 강조된 아바타의 원형(보더 포함)이 100% 온전하게 그려집니다.
