# 홈 화면 네비게이션 포커스 점프 버그 수정 보고서

**날짜**: 2026-03-29
**Task**: fix_home_navigation_skip_pig
**담당**: Antigravity

## 1. 개요
홈 화면의 상단(헤더)에서 하단(지금 시청하기)으로 이동할 때, 보이지 않는 PIG 플레이어 영역이 포커스 목록에 남아 있어 사용자 경험을 저해하던 문제를 해결하였습니다.

## 2. 주요 수정 내용

### 2.1 가변적 섹션 목록 지원 (`homeNavigationStore.ts`)
- **문제**: `SECTIONS` 리스트에 `pig`가 하드코딩되어 있어, 실제 PIG 모드가 아닐 때도 포커스가 이동 가능했던 상황.
- **수정**: `moveHomeFocus` 함수가 현재의 `appMode`를 인식하도록 고도화하였습니다.
- **로직**:
  - `appMode === 'pig'`일 때만 `pig` 섹션을 포함한 네비게이션 수행.
  - 그 외의 상태(`home`, `selection` 등)에서는 `pig`를 제외한 `['header', 'hero', ...]` 순서로 포커스 목록을 필터링하여 이동.

### 2.2 글로벌 네비게이션 연동 (`navigation.ts`)
- `createKeyHandler` 내부에서 `moveHomeFocus` 호출 시, 현재 앱의 상태(`state.mode`)를 파라미터로 전달하여 동적인 네비게이션 경험을 동기화하였습니다.

## 3. 테스트 및 검증 결과 (TDD)
- **추가된 테스트 케이스**:
  - `HOME 모드에서 Down 시 pig 건너뛰고 hero로 가야 함` (Pass)
  - `PIG 모드일 때는 Down 시 pig로 정상 이동` (Pass)
- **전체 테스트 결과**: 29개 테스트 전체 통과 확인.

## 4. 최종 결과물 소감
이번 수정을 통해 홈 화면에서 사용자의 동작 의도와 실제 UI의 시각적 피드백이 완벽히 일치하게 되었습니다. 보이지 않는 요소에 포커스가 잡히는 현상을 원천 차단함으로써 더욱 쾌적한 TV 리모컨 경험을 완성하였습니다.

상세 기술 내역은 `tasks/navigation_and_home_screen_improvement/20260329_15_fix_home_navigation_skip_pig.md`를 참조하세요.
