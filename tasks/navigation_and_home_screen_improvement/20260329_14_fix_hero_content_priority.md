# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: fix_hero_content_priority
**기록**: 20260329_14_fix_hero_content_priority

## 1. 홈 화면 '지금 시청하기(Hero)' 컨텐츠 고정 문제 개선
* **문제점**:
  - 프로필을 변경했음에도 홈 화면의 메인 Hero 영역(지금 시청하기)의 제목이 항상 "Samsung TV Plus Guide"로 고정되어 노출됨.
  - 이는 `contentDiscoveryStore.ts`에서 공통 컨텐츠(`COMMON_CONTENTS`)를 프로필 컨텐츠 앞에 배치하여, 첫 번째 아이템을 메인으로 사용하는 홈 화면 로직에서 항상 공통 컨텐츠가 선택되었기 때문임.
* **개선 계획 (TDD)**:
  1. `SamsungTVHome.test.ts`에 프로필 선택 시 Hero 영역 제목이 해당 프로필의 최근 시청 컨텐츠로 변경되는지 검증하는 테스트 케이스 추가. (테스트 실패 확인)
  2. `contentDiscoveryStore.ts`의 `homeRecentApps`, `homeRecentContents`, `homeRecommendedContents`에서 프로필 특화 컨텐츠를 공통 컨텐츠보다 앞선 순서로 배치하여 우선순위 상향 조정.
* **최종 결과**:
  - `selectedIndex` 변경 시, 해당 유저의 첫 번째 최근 시청 컨텐츠('오징어 게임', '진격의 거인' 등)가 Hero 영역에 정상적으로 노출됨을 테스트로 확인.
  - 공통 앱 및 컨텐츠는 우선순위 뒤로 밀려나되, 여전히 리스트의 뒤쪽에서 접근 가능함.

## 2. 작업 일지
- TDD 기반으로 테스트 추가 및 개선 완료. 2026-03-29 17:35
