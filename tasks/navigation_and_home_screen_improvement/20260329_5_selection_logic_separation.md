# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: separate_profile_selection_from_focus
**기록**: 20260329_5_selection_logic_separation

## 1. 프로파일 포커스 이동과 전환 로직 분리
* **문제 상황**: 미니 모드나 프로필 선택 화면에서 좌우 방향키로 포커스만 이동해도, 뒤쪽에 보이는 홈 화면의 배경색과 컨텐츠가 즉시 해당 프로필의 것으로 바뀌는 현상이 발생함. (유저 피드백: 선택했을 때만 전환되어야 함)
* **개선 내용**:
  - **스토어 분리**: `profileStore.ts`에 `focusedIndex`(강조용)와 `selectedIndex`(확정용/전환용)를 분리하여 도입함.
  - **데이터 소스 변경**: `SamsungTVHome.svelte`와 내부 컨텐츠 스토어들이 `$focusedProfile`이 아닌 `$selectedProfile`을 구독하도록 수정하여, 실제 'Enter'를 치기 전까지는 홈 화면 데이터가 보존되도록 함.
  - **선택 로직 추가**: `navigation.ts`, `ProfilePanel.svelte`, `MiniModeSelector.svelte`에서 'Enter' 키 또는 클릭 이벤트 발생 시에만 `selectProfile()`을 명시적으로 호출하도록 보강함.
* **UX 결과**: 
  - 미니 모드에서 프로필을 가로지르며 이동해도 홈 화면은 현재 로그인된 유저의 정보를 유지함.
  - 'Enter'를 눌러 프로필을 확정하는 순간에만 홈 화면의 배경과 컨텐츠가 부드럽게 전환됨.

결과적으로 포커스 조작과 실제 로그인 전환 사이의 혼선을 제거하고 의도된 동작(Explicit Selection)을 완성하였습니다.
