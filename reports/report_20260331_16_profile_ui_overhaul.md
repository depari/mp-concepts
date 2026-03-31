# Android TV 프로필 선택 화면 디자인 갱신 보고서 (Web Project 디자인 동기화)

## 1. 개요
기존 안드로이드 UI의 단조로움을 탈피하고, 기존 **Web Project(Svelte)** 의 고도화된 프로필 아코디언 디자인을 안드로이드 TV 앱에 1:1로 이식하였습니다.

## 2. 디자인 분석 및 반영 (Web vs Android)
| 항목 | Web Project (Svelte) | Android TV (Compose) |
| :--- | :--- | :--- |
| **레이아웃** | 가로 아코디언 (12vw <-> 44vw) | `animateDpAsState` 기반 너비 확장 (120dp <-> 450dp) |
| **배경** | 프로필별 고유 그라데이션 | `Brush.verticalGradient` (프로필 색상 연동) |
| **정보 노출** | 포커스 시 이름, 앱 리스트, 콘텐츠 카드 노출 | `AnimatedVisibility` 기반 상세 정보 애니메이션 노출 |
| **UX 요소** | 중앙 정렬 슬라이딩 효과 | `Box` & `Row` 중앙 배치 및 하단 D-Pad 키 힌트 보강 |

## 3. 주요 구현 내용
### 3.1 신규 컴포넌트: `ProfilePanel.kt`
- **역동적인 너비 변화**: 포커스 이동 시 패널 너비가 유려하게 확장 및 축소됩니다.
- **시각적 깊이감**: 비포커스 상태에서는 어두운 가림막(Overlay) 처리를, 포커스 시에는 전면 배경 이미지와 그라데이션을 적용하여 집중도를 높였습니다.

### 3.2 `MainActivity.kt` 레이아웃 개편
- `ProfileSelectionScreen`을 전면 재작성하여 "Choose Your Experience" 타이틀과 하단 내비게이션 가이드(MOVE, SELECT)를 추가하였습니다.
- 더 풍부한 화면 구성을 위해 Mock 프로필 데이터를 3개로 확장하였습니다.

## 4. 최종 결과물
- [/src/main/java/com/depari/mpconcepts/components/ProfilePanel.kt](file:///Volumes/SSEOSSD/dwon.seo/Git/mp-concepts/android-poc/app/src/main/java/com/depari/mpconcepts/components/ProfilePanel.kt)
- [/src/main/java/com/depari/mpconcepts/MainActivity.kt](file:///Volumes/SSEOSSD/dwon.seo/Git/mp-concepts/android-poc/app/src/main/java/com/depari/mpconcepts/MainActivity.kt)

## 5. 확인 사항
- 빌드 결과: **BUILD SUCCESSFUL**
- 향후 추가 과제: 프로필 대시보드(ProfileDashboard) 연동 및 실제 선호 앱 데이터 바인딩.
