# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: sync_content_hub_and_home_screen
**기록**: 20260329_7_home_and_hub_data_separation

## 1. 홈 화면과 컨텐츠 탐색창의 데이터 동기화 및 분리 설계
* **요구 사항**: 
  - 컨텐츠 탐색창(`FullModeContentHub`): 포커스(리모컨 이동) 중인 프로필의 전용 컨텐츠만 노출.
  - 홈 화면(`SamsungTVHome`): 선택(로그인)된 프로필의 컨텐츠와 프로필 구분이 없는 공통 컨텐츠(`Settings`, `Web Browser` 등)를 함께 노출.
* **개선 내용**:
  - **공통 데이터 도입**: `common.ts`를 신설하여 모든 유저에게 공통으로 노출될 앱(`COMMON_APPS`)과 컨텐츠(`COMMON_CONTENTS`)를 정의함.
  - **스토어 이원화 (`contentDiscoveryStore.ts`)**:
    - `hub*` 스토어: `focusedProfile`을 구독하여 탐색 리모컨 이동에 따라 실시간으로 해당 유저의 정보만 필터링하여 제공.
    - `home*` 스토어: `selectedProfile`을 구독하고 공통 데이터를 병합(`[...Common, ...Profile]`)하여 메인 화면에 적합한 풍성한 데이터를 제공.
  - **컴포넌트 연동**: `SamsungTVHome`은 `home*` 스토어를, `FullModeContentHub`는 `hub*` 스토어를 구독하도록 각각 매핑하여 UX 정합성을 맞춤.
* **TDD 결과**: 
  - `contentDiscoveryStore.test.ts` 및 `SamsungTVHome.test.ts`를 통해 홈 화면에 공통 앱과 개별 유저 컨텐츠가 공존하며, 탐색창은 포커스 이동 시 마다 올바르게 데이터가 교체됨을 확인 완료.

결과적으로 개인화된 탐색 경험과 풍부한 통합 홈 화면 경험을 동시에 보장하도록 데이터 구조를 고도화하였습니다.
