# 홈 화면 '지금 시청하기' 컨텐츠 프로필 연동 버그 수정 보고서

**날짜**: 2026-03-29
**Task**: fix_hero_content_priority
**담당**: Antigravity

## 1. 개요
프로필 변경 후에도 홈 화면 상단의 메인 카드(Hero 영역, '지금 시청하기')의 제목이 "Samsung TV Plus Guide"로 고정되어 표시되던 문제를 수정하였습니다. 이는 각 사용자의 개인화된 시청 이력이 공통 컨텐츠보다 낮은 우선순위로 데이터 리스트에 포함되어 발생한 문제였습니다.

## 2. 주요 수정 내용

### 2.1 홈 화면 데이터 우선순위 조정 (`contentDiscoveryStore.ts`)
- **수정 전**: `[...COMMON_CONTENTS, ...profileContents]` 순서로 리스트 구성.
- **수정 후**: `[...profileContents, ...COMMON_CONTENTS]` 순서로 변경.
- **적용 대상**:
  - `homeRecentApps`: 사용자가 최근에 사용한 앱이 가장 먼저 배치됩니다.
  - `homeRecentContents`: 사용자의 "이어보기" 항목이 '지금 시청하기'의 메인 제목으로 자동 채택됩니다.
  - `homeRecommendedContents`: 사용자의 관심사에 맞는 추천이 먼저 노출됩니다.

### 2.2 메인 Hero 텍스트 연동 확인
- `SamsungTVHome.svelte`의 `mainContent` 로직(`recentContents[0]`)이 이제 해당 사용자의 실제 마지막 시청 컨텐츠를 정확히 가리키게 되었습니다.

## 3. 테스트 및 검증 결과 (TDD)
- **추가된 테스트 케이스**: `선택된 프로필에 따라 Hero 영역(지금 시청하기)의 제목이 변경되어야 한다` (Pass)
- **검증 내용**: 
  - 지은 프로필 선택 시: <h1> 제목이 '오징어 게임'으로 변경됨.
  - 민준 프로필 선택 시: <h1> 제목이 '진격의 거인'으로 변경됨.
- **전체 테스트 결과**: 6개 파일, 28개 테스트 전체 통과 확인.

## 4. 최종 결과물 소감
이번 수정을 통해 프로필 전환 시 단순히 배경 색상만 바뀌는 것이 아니라, 사용자가 마지막으로 보던 컨텐츠가 홈 화면의 가장 눈에 띄는 위치(Hero 영역)에 즉시 노출됨으로써 진정한 '개인화된 홈 화면' 경험을 완성하였습니다.

상세 기술 내역은 `tasks/navigation_and_home_screen_improvement/20260329_14_fix_hero_content_priority.md`를 참조하세요.
