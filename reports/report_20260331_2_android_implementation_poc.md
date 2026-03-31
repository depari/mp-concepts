# Android 기반 구현 (1단계: POC) 보고서

## 1. 개요
`docs/Android_Development_Plan.md`에 정의된 Phase 1(기반 구축) 및 Phase 2(UI 구현) 일부를 수행하였습니다. 안드로이드 네이티브(Kotlin/Jetpack Compose) 기반의 프로필 선택 기능을 구현하였습니다.

## 2. 주요 수행 내용
### 2.1 TDD 기반 핵심 로직 구현
- **Unit Test 선행**: `ProfileModelTest.kt` 및 `ProfileViewModelTest.kt` 작성을 통해 도메인 로직(데이터 필드 및 상태 관리 로직)의 정확성을 검증하였습니다.
- **도메인 구현**: `Profile.kt` (데이터 모델) 및 `ProfileViewModel.kt` (Flow 기반 상태 관리)를 구현하였습니다.

### 2.2 안드로이드 프로젝트 구조 구축
- **Build Script**: `settings.gradle`, `build.gradle` (Project/App)을 구성하여 Jetpack Compose for TV 환경을 구축하였습니다.
- **Manifest**: Android TV(Leanback) 런처 지원을 위한 `AndroidManifest.xml` 설정을 마쳤습니다.

### 2.3 UI/UX 컴포넌트 (POC)
- **ProfileAvatar (Compose)**: Svelte 버전의 동작을 모방하여, D-Pad 포커스 시 스케일 업 애니메이션과 테두리 효과가 적용된 네이티브 컴포넌트를 구현하였습니다.
- **MainActivity**: 실제 동작을 확인할 수 있는 프로필 선택 화면(ProfileSelectionScreen)을 구성하였습니다.

## 3. 결과물 목록
- `/android-poc` : 안드로이드 프로젝트 루트 폴더.
- `app/src/main/java/com/depari/mpconcepts/*.kt` : 핵심 구현 코드.
- `app/src/test/java/com/depari/mpconcepts/*.kt` : 단위 테스트 코드.

## 4. 향후 계획
- Phase 2의 나머지 UI (홈 스크린 그리드, 콘텐츠 행) 구현을 지속합니다.
- 실제 리모컨 하드웨어 연동 시 포커스 체인 최적화 작업을 진행할 예정입니다.
