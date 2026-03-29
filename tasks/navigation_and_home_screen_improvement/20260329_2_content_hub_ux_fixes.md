# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: content_hub_UX_improvement
**기록**: [date]_[number]_[memorizedItem] 포맷에 따른 개선 내용 정리. (20260329_2_content_hub_ux_fixes)

## 1. 딥링크 로딩 중 프로필 변경 (간섭 방지) 개선
* **문제 상황**: 컨텐츠 허브에서 특정 항목을 선택해 실행(딥링크 모드, 로딩 화면 전환) 중일 때 좌우 방향키 입력 시 보이지 않는 백그라운드의 프로필(`focusedIndex`)이 변경되고, 계속해서 로딩 화면이 표시되는 현상.
* **TDD 절차 진행**:
  1) `navigation.test.ts`에 `appStateStore.mode === 'deep_link'` 상황에서 `ArrowLeft/Right`가 입력되어도 `focusedIndex`가 변경되지 않는지 검증 및 `Escape` 누를 시 딥링크가 취소되고 `selection` 모드로 복귀하는 검증 추가.
  2) 테스트 실패(Failed) 확인 (방향키가 막히지 않아 인덱스 순환 발생).
  3) `navigation.ts` 내부의 `state.mode === 'deep_link'` 블록 추가: `Escape` 처리를 제외한 모든 이벤트 기본 방지 및 반환 구현.
  4) 테스트 통과(Passed) 및 버그 해결.

## 2. 컨텐츠 로우 항목 포커스 잘림(Clipping) 현상 개선
* **문제 상황**: `FullModeContentHub` 영역에서 각 가로 스크롤 행(`AppShortcutRow`, `RecentWatchRow`, `RecommendedRow`, `NewsCardRow`) 요소들이 `overflow-x: auto` 적용 된 상태에서, 포커스 시 카드가 커질 때 상하단(`transform: scale(...)`)이 잘려 나가는 클리핑 에러. 
* **개선 시도**:
  - CSS 기반의 뷰포트/레이아웃 단위 문제이므로 TDD(JS-DOM) 테스트 구현 한계로 인해, 구조적 컴포넌트 뷰를 직접 수정.
  - 컨테이너 스타일(`padding: 24px 12px 36px`, `margin: -18px -8px -24px`)을 넉넉하게 확장하고 음수 마진으로 오리지널 레이아웃 간격의 뒤틀림을 상쇄.
  - 확대된 포커스 아이템 표출 영역(비율 1.08 ~ 1.1x)을 안전하게 확보해 상하 짤림 제거 완수.

결과적으로 두 가지 UX 이슈에 대해 근본적인 논리적 차단과 레이아웃 보완을 완수하였습니다.
