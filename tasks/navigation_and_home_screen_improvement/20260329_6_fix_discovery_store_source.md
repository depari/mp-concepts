# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: fix_content_switching_on_focus
**기록**: 20260329_6_fix_discovery_store_source

## 1. 포커스 이동 시 추천 컨텐츠 즉시 변경 버그 개선
* **문제 상황**: 이전 작업에서 홈 화면의 배경색과 프로필 정보는 `selectedProfile` 기준으로 고정했으나, 하단에 렌더링되는 최근 실행 앱, 이어보기, 추천 컨텐츠 등의 데이터는 여전히 `focusedProfile`을 구독하고 있어 포커스 이동 시 실시간으로 데이터가 교체되는 현상 발생. 
* **개선 내용**:
  - **데이터 소스 정합성 확보**: `contentDiscoveryStore.ts` 내의 모든 `derived` 스토어(`profileRecentApps`, `profileRecentContents`, `profileRecommendedContents`, `profileFilteredNews`)가 `focusedProfile` 대신 `selectedProfile`을 구독하도록 수정함.
  - **결과**: 배경 테마, 사용자 이름 뿐만 아니라 홈 화면에 표시되는 모든 개인화 컨텐츠 데이터가 'Enter'를 통한 확정 선택 전까지는 현재 로그인된 유저의 정보를 일관성 있게 유지하도록 보장함.

결과적으로 포커스 조작 시의 시각적 파편화(배경은 유지되는데 컨텐츠만 바뀌는 문제)를 완벽히 해결하였습니다.
