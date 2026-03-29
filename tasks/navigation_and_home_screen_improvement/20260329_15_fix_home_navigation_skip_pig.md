# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: fix_home_navigation_skip_pig
**기록**: 20260329_15_fix_home_navigation_skip_pig

## 1. 홈 화면 네비게이션 포커스 점프 문제 수정
* **문제점**:
  - 홈 화면 헤더(프로필 아이콘)에서 아래 방향키(`ArrowDown`)를 눌렀을 때, PIG 모드가 아님에도 불구하고 보이지 않는 'pig' 섹션으로 포커스가 이동함.
  - 이로 인해 사용자는 한 번 더 아래 방향키를 눌러야 '지금 시청하기(Hero)' 섹션으로 이동할 수 있는 불편함이 발생함.
* **개선 계획 (TDD)**:
  1. `homeNavigationStore.test.ts`를 생성하여 `appMode`가 'home'일 때 `header`에서 `ArrowDown` 시 `pig`를 건너뛰고 `hero`로 직접 이동하는지 검증하는 테스트 작성. (테스트 실패 확인)
  2. `moveHomeFocus` 함수에 `appMode` 파라미터를 추가하고, 현재 모드에 따라 유효한(`pig` 포함 여부) 섹션 목록만 사용하여 포커스를 이동하도록 로직 수정.
  3. `navigation.ts`에서 `moveHomeFocus` 호출 시 현재 `state.mode`를 전달하도록 연동.
* **최종 결과**:
  - 일반 홈 화면 모드(`home`)에서는 PIG 영역을 완전히 무시하고 자연스럽게 `header` <-> `hero` 간 이동이 가능해짐.
  - 실제 컨텐츠 재생 중인 `pig` 모드에서는 정상적으로 PIG 플레이어에 포커스가 잡힘을 테스트로 확인.

## 2. 작업 일지
- TDD 기반으로 테스트 및 로직 개선 완료. 2026-03-29 17:37
