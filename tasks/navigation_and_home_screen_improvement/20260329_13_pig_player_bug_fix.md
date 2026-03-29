# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: pig_player_bug_fix
**기록**: 20260329_13_pig_player_bug_fix

## 1. PIG Player 및 홈 화면 배경 연동 이슈 개선
* **문제점**:
  - PIG 모드로 진입 시 홈 화면 배경이 사라지거나 제대로 렌더링되지 않음.
  - 컨텐츠 선택 후 PIG 전환 시 해당 유저의 홈 화면이 배경으로 노출되어야 하나, 상태 전이 로직 미흡으로 확인됨.
* **개선 계획 (TDD)**:
  1. `SamsungTVHome.test.ts`에 PIG 모드 렌더링 및 배경 프로필 연동 테스트 케이스 추가.
  2. `App.svelte`의 렌더링 조건에 `APP_MODES.PIG` 추가.
  3. `appStateStore.ts` 및 관련 네비게이션 로직 검토하여 부드러운 전이 보장.
* **테스트 케이스**:
  - `appStateStore`가 `PIG` 모드일 때 `SamsungTVHome` 컴포넌트 내부에 `pig-player-wrapper`가 존재해야 함.
  - `selectedProfile`이 변경되었을 때 `SamsungTVHome`의 배경색(또는 틴트)이 해당 프로필의 색상을 반영해야 함.

## 2. 작업 일지 및 결과
- **2026-03-29**:
  - `SamsungTVHome.test.ts`에 PIG 모드 및 배경 색상 동기화 테스트 추가. (초기 실패)
  - `App.svelte`의 렌더링 조건에 `APP_MODES.PIG` 추가하여 컴포넌트 유실 방지. (성공)
  - `homeNavigationStore.ts`의 `SECTIONS`에 'pig' 추가 및 `focusPIG()` 구현. (성공)
  - `SamsungTVHome.svelte`에 PIG 모드 진입 시 자동 포커스 처리 추가. (성공)
  - `ProfileDashboard.svelte`에 `selectProfile()` 호출 추가하여 배경 홈 화면 동기화 보장. (성공)
- **최종 결과**: 모든 테스트 케이스(27개) 통과 및 요구사항 100% 충족. 텔레그램 알림 발송 완료.
