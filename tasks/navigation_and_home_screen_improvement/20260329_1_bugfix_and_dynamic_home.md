# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: navigation_and_home_screen_improvement
**기록**: [date]_[number]_[memorizedItem] 포맷에 따른 개선 내용 정리. (20260329_1_bugfix_and_dynamic_home)

## 1. 백그라운드 프로필 네비게이션 방지 (Bugfix)
* **문제 상황**: `FullModeContentHub` (컨텐츠 탐색 화면)이 활성화되어 화면을 덮은 상태에서도, 좌/우 방향키를 누르면 이벤트가 전역 핸들러(`navigation.ts`)로 흘러 들어가 백그라운드의 프로필 선택이 바뀌는 버그.
* **TDD 절차 진행**:
  1) `navigation.test.ts`에 `isContentHubActive === true`일 때 `ArrowLeft/Right`를 누르면 `navigate`가 동작하지 않아 `focusedIndex`가 유지되는지 검증하는 테스트 코드 추가.
  2) 테스트 실패(Failed) 확인 (이벤트 전파로 인해 mock data 변경됨).
  3) `navigation.ts`에서 `isContentHub` 스토어 값을 조회하여, 활성화 시 좌/우 방향키의 `navigate()` 호출을 조건부로 막도록(block) 로직 개선.
  4) 전체 테스트 성공(Passed) 확인.

## 2. 홈 화면 프로필 연동 (Improvement)
* **문제 상황**: 홈 화면(`SamsungTVHome.svelte`)이 프로필 데이터 스토어(`contentDiscoveryStore`)의 내용과 연동되지 않고 내부에 따로 정적 배열 리스트(`mockApps`)와 고정된 텍스트('이번 주 인기 오리지널' 등)를 보여주고 있음.
* **TDD 절차 진행**:
  1) `SamsungTVHome.test.ts`를 신규 작성하여, `activeProfiles` 스토어에 임의의 객체를 주입하고 `profileRecentApps` 및 `profileRecentContents` 항목이 뷰에 맞게 랜더링(H1, Launcher 텍스트) 되는지 테스트.
  2) 테스트 실패(Failed) 확인 (`mockApps`와의 불일치).
  3) `SamsungTVHome.svelte` 컴포넌트 내부에서 `profileRecentApps` 및 `profileRecentContents`를 import 하도록 하고 레이아웃 연동 처리(정적 데이터 제거).
  4) 전체 테스트 성공(Passed) 확인.

결과적으로 앱 전체의 유닛 테스트 커버리지 무결성을 보장하며 문제점 수습 조치를 완수하였습니다.
