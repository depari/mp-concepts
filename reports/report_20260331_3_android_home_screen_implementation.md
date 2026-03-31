# Android 홈 화면 구현 (2단계: UI/UX 확장) 보고서

## 1. 개요
안드로이드 개발 계획서의 Phase 2를 수행하였습니다. 프로필 선택 이후 접근하게 되는 메인 홈 화면의 데이터 구조와 UI 컴포넌트를 구축하고 화면 전환 로직을 구현하였습니다.

## 2. 주요 수행 내용
### 2.1 데이터 아키텍처 (TDD 준수)
- **Content 모델 구현**: `ContentModelTest.kt` 선행 작성 후 `Content.kt` 데이터 클래스 구현.
- **HomeViewModel 구현**: 섹션별 콘텐츠 상태 관리를 위해 `HomeViewModelTest.kt` 작성 및 가변 상태 흐름(MutableStateFlow) 기반의 뷰모델 구현.

### 2.2 TV 전용 UI 컴포넌트 구축
- **RecommendedCard (Compose TV)**: `androidx.tv.material3.Card`를 사용하여 포커스 이벤트 및 시각적 효과를 기본 지원하는 카드 컴포넌트를 구현하였습니다.
- **RecommendedRow (LazyRow)**: 가로 스크롤 섹션을 위해 `LazyRow`를 활용하여 수평 탐색이 가능한 행 컴포넌트를 구현하였습니다.

### 2.3 화면 탐색 및 전환 로직
- **App Mode 전환**: `AppMode` Enum을 통해 프로필 선택 화면과 홈 화면 간의 상태 전환을 구현하였습니다.
- **선택 프로필 연동**: 프로필 선택 시 해당 프로필 정보가 홈 화면 상단에 노출되도록 데이터 바인딩을 완료하였습니다.

## 3. 결과물 목록
- `android-poc/app/src/main/java/com/depari/mpconcepts/data/Content.kt`
- `android-poc/app/src/main/java/com/depari/mpconcepts/HomeViewModel.kt`
- `android-poc/app/src/main/java/com/depari/mpconcepts/components/RecommendedCard.kt`
- `android-poc/app/src/main/java/com/depari/mpconcepts/components/RecommendedRow.kt`
- `android-poc/app/src/main/java/com/depari/mpconcepts/MainActivity.kt` (화면 전환 통합)

## 4. 향후 계획
- Phase 3: 고도화 단계로서, Google TV Home 통합을 위한 런처 서비스 및 영상 재생 기능(ExoPlayer) 연동을 검토합니다.
- 복잡한 리모컨 키 이벤트(뒤로 가기, 메뉴 등)에 대한 글로벌 핸들러를 추가할 예정입니다.
