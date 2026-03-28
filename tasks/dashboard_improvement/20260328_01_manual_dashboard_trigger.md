# 수동 대시보드 트리거 개선 기록

* **Date**: 2026-03-28
* **Task Number**: 01
* **Memorized Item**: manual_dashboard_trigger

## 개요
기존에 프로필 간 포커스가 이동하면 일정 지연 시간 후(800ms)에 자동으로 전체화면 대시보드(ProfileDashboard) 렌더링이 이루어졌습니다.
하지만 사용자가 탐색 화면 진입 여부를 직접 선택할 수 있도록, 방향키 아래(`ArrowDown`) 버튼을 통해서만 명시적으로 탐색 화면에 진입하도록 정책을 수정했습니다.

## 개선 과정 (TDD 적용)
1. **TC 갱신 및 실패 확인**: `src/lib/stores/interactionStore.test.js`에 기존 자동 타이머 기반 검증 TC를 제거하고, 수동 활성화(`activateDashboard`), 비활성화(`deactivateDashboard`)에 대한 TC를 새로이 작성. 코드가 미구현되어 Test Failed 상태임을 확인.
2. **TC Pass 구현 로직 업데이트**: `interactionStore.js`에서 `startFocusTimer` 및 `cancelFocusTimer` 구현체를 삭제하고, 상태값을 직접 제어하는 토글 함수를 작성하여 TC Pass를 달성.
3. **컴포넌트 리팩토링 유기적 처리**: `ProfileScreen.svelte` 컴포넌트 반응성 블록 내 자동 타이머 호출 코드를 제거. 포커스 이동 시 Preview 데이터만 사전에 Background로 유지하도록(prefetch) 수정.
4. **이벤트 핸들러 매핑**: `navigation.js`에서 키보드 액션 `ArrowDown`시 대시보드 활성화, `ArrowUp` 및 `Escape`시 비활성화되도록 연동.

## 상세 결과
- **테스트 케이스 결과**: `vitest` 런너 기반 모든 테스트 100% Pass 달성 완료.
- **주요 UI 반응 시나리오**: 프로필 좌우 이동 시에는 각 프로필의 아바타와 하이라이트(이름 영역)가 기존 화면에서 정상 유지되며, 아래(ArrowDown)로 명시적 조작 시에만 콘텐츠 탐색 대시보드로 전환됩니다.
