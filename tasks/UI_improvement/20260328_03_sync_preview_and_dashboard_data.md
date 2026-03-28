# 포커스 프리뷰 및 대시보드 간 데이터 정합성 일치 업데이트

* **Date**: 2026-03-28
* **Task Number**: 03
* **Memorized Item**: sync_preview_and_dashboard_data

## 개요
기존 구조에서는 프로필 포커스 시 보여지는 이어보기 요약 콘텐츠는 `profiles.js`의 `recentContents` 하드코딩 데이터를 참조하고 있었고, 아래 방향키를 눌렀을 때 표시되는 대시보드는 `previewDB.js`를 바라보는 `previewContentStore`를 참조하고 있었습니다. 두 데이터셋 불일치로 인해 UX 상의 이질감이 있었습니다.

## 개선 과정
1. **데이터 단일화 (Single Source of Truth) 적용**: `ProfilePanel.svelte` 컴포넌트 내부에서 `profile.recentContents`에 의존하던 로직을 완전히 제거하고, 대시보드와 동일한 상태 스토어인 `$previewContentStore.data`를 참조하도록 리팩토링했습니다. 
2. **`ContentCard.svelte` 확장**: `previewDB.js`가 제공하는 데이터 명세에 맞추기 위해, 컴포넌트가 `thumbnailUrl` 속성을 수신하여 이미지 배경을 지원할 수 있도록 업데이트했습니다. 또한 진행률(`progress`) 처리의 포맷(기존 0.0~1.0 비율 vs. 현재 0~100 퍼센트) 혼선을 방지하는 렌더링 로직도 추가 보강했습니다.
3. **조건부 동시성 제어**: `ProfilePanel` 컴포넌트 목록에서 오직 `isFocused`가 참(True)인 패널만이 `$previewContentStore` 데이터를 렌더링하도록 조건(`{#if isFocused && $previewContentStore.data}`)을 엄격하게 걸어, 비동기 호출 시 다른 패널에서 잔여 데이터가 보이는 현상을 방지했습니다.

## 상세 결과
- 사용자가 특정 프로필 포커스시 프리뷰에서 본 2개의 카드가 방향키를 내려 들어간 탐색 화면에서도 100% 동일한 정보와 썸네일로 표출됨을 보장합니다.
