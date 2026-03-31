# Android 기반 Smart TV UX 개발 계획서

## 1. 프로젝트 개요
본 계획서는 현재 Svelte 기반의 `profile-poc` 프로젝트를 안드로이드(Android TV/Google TV) 기반으로 이식 및 확장하기 위한 개발 계획을 기술한다.

## 2. 현재 프로젝트 분석 (`profile-poc`)
### 2.1 주요 기능
- **멀티 프로필 시스템**: 사용자별 프로필 선택 및 전환 (ProfileAvatar, MiniModeSelector)
- **홈 스크린 UX**: 맞춤형 추천 콘텐츠 노출 (RecommendedRow, NewsCardRow)
- **상태 관리**: 홈 모드, 미니 모드, 풀 플레이어 모드 등 복합적인 UI 상태 관리 (appStateStore)
- **리모컨 내비게이션**: 5-way D-Pad 내비게이션 최적화 (navigation.ts)
- **테마 및 애니메이션**: Vanilla CSS 기반의 동적 디자인 시스템 (animations.css, global.css)

### 2.2 기술 스택
- **Language**: TypeScript
- **Framework**: Svelte 4
- **Styling**: Vanilla CSS
- **Testing**: Vitest (TDD 기반)
- **Build Tool**: Vite

## 3. Android 기반 개발 전략
Android TV 환경의 네이티브 기능을 최대한 활용하면서 현재의 UX를 구현하는 방식으로 추진한다.

### 3.1 기술 스택 선정
- **OS**: Android TV 11+ (API Level 30이상)
- **Language**: Kotlin 2.0+
- **UI Framework**: Jetpack Compose for TV
- **Architecture**: MVVM (Model-View-ViewModel) + Clean Architecture
- **Dependency Injection**: Hilt / Koin
- **Network**: Retrofit2 + OkHttp / Ktor
- **Testing**: JUnit5, MockK, Espresso (TDD 준수)

### 3.2 주요 컴포넌트 이식 계획
| 웹 컴포넌트 | Android (Jetpack Compose for TV) 대응 |
| :--- | :--- |
| `SamsungTVHome.svelte` | `HomeActivity` + `HomeScreen` (Compose) |
| `ProfileAvatar.svelte` | `ProfileCircle` (Image + Border Focus) |
| `RecommendedCard.svelte` | `StandardCardContainer` (TV 전용 카드) |
| `navigation.ts` | `FocusRequester` 및 `onKeyEvent` 핸들러 |
| `appStateStore.ts` | `ViewModel` + `StateFlow` |

## 4. 개발 로드맵 (TDD 기반)
### Phase 1: 기반 구축 (TC 개발 선행)
1.  **Project Setup**: Android Studio 프로젝트 생성 및 Hilt/Compose 설정.
2.  **Core Domain Logic**: 프로필 관리 및 데이터 모델링 (Unit Test 작성 및 통과).
3.  **Navigation System**: D-Pad 리스너 및 포커스 관리 로직 구현 (Unit Test 기반).

### Phase 2: UI/UX 구현
1.  **Profile Hub**: 프로필 선택 및 전환 기능을 Jetpack Compose로 구현.
2.  **Home Grid**: LazyColumn / LazyRow를 활용한 추천 섹션 구현.
3.  **App State Sync**: UI 상태 변화에 따른 애니메이션 처리.

### Phase 3: 고도화 및 안정화
1.  **Android Integration**: Google TV Home 레이아웃 통합(Leanback/TV-Specific APIs).
2.  **Performance Tuning**: TV 메모리 최적화 및 렌더링 성능 개선.
3.  **Final QA**: 리모컨 입력 반응도 및 엣지 케이스 테스트.

## 5. 예상 고려 사항
- **포커스 처리**: 웹과 달리 안드로이드 TV는 포커스 체인이 매우 엄격하므로, `focusable` 및 `onFocusChanged` 속성에 대한 세밀한 제어가 필요하다.
- **영상 재생 최적화**: 웹 플레이어 대신 ExoPlayer 또는 Media3 라이브러리를 사용하여 안드로이드 네이티브 재생 성능을 확보한다.
- **배포 방식**: `.apk` 또는 `.aab` 제작을 통한 Play Store TV용 배포.
