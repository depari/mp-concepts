# Android TV 프로필 중앙 정렬 정밀 고도화 보고서

## 1. 개요
기존 중앙 정렬 로직이 프로필 패널의 동적 너비 확장(Accordion) 시 정확한 위치를 유지하지 못하던 문제를 해결하기 위해, 시스템 기반의 Pivot 제어와 상태 기반의 스크롤 애니메이션을 통합 적용하였습니다.

## 2. 정밀 중앙 정렬 솔루션 (Precise Centering)
단순한 Pivot 설정을 넘어, 너비 변화에 유연하게 대응하는 하이브리드 방식을 적용하였습니다.
- **상태 동기화 스크롤**: `focusedProfileId` 가 변경될 때마다 `listState.animateScrollToItem(index)` 를 명시적으로 호출합니다. 이를 통해 아이템의 너비가 120dp에서 450dp로 확장되는 중에도 해당 아이템의 새로운 기하학적 중심을 화면 중앙에 강제 고정합니다.
- **레이아웃 충돌 해결**: `horizontalArrangement = Arrangement.Center` 를 제거하고, 대신 대형 좌우 패딩(`contentPadding = 400.dp`)을 사용하여 아이템 개수에 상관없이 모든 프로필이 중앙 스크롤 궤도 내에서 움직이도록 설계하였습니다.
- **아이템 중첩 방지**: 확장된 패널이 인접 패널을 가리지 않도록 `Arrangement.spacedBy(40.dp)` 로 여유 공간을 확보하였습니다.

## 3. 디폴트 포커스 안정화
- 앱 시작 시 첫 번째 프로필(지은)에 대한 `FocusRequester.requestFocus()` 와 `focusedProfileId` 상태 초기화를 동기화하여, 화면 진입 즉시 중앙 정렬된 확장 패널을 볼 수 있도록 보장하였습니다.

## 4. 최종 결과
- 빌드 결과: **BUILD SUCCESSFUL**
- 실제 UX: D-Pad 이동 시 선택된 프로필이 자석처럼 화면 중앙으로 정렬되며 확장되는 최고 수준의 TV UI 경험을 제공합니다.
