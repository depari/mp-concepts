# Android Phase 3: 미디어 재생 및 내비게이션 고도화 보고서

## 1. 개요
Android TV POC 프로젝트의 Phase 3인 미디어 재생 기능 연동 및 리모컨 내비게이션(BackKey) 제어 로직 구현을 완료하였습니다.

## 2. 주요 구현 내용
### 2.1 Media3 (ExoPlayer) 기반 비디오 재생
- **의존성**: `androidx.media3` 라이브러리를 추가하여 안정적인 네이티브 재생 환경을 구축하였습니다.
- **컴포넌트**: `PlayerScreen.kt`를 구현하여 `ExoPlayer`와 `PlayerView`를 Jetpack Compose 환경에 통합하였습니다.
- **기능**: 홈 화면의 맞춤형 콘텐츠 클릭 시 즉시 비디오 재생 화면으로 전환됩니다. (샘플 URL: BigBuckBunny.mp4 연동)

### 2.2 리모컨 내비게이션 (BackHandler) 최적화
- **뒤로가기 처리**: TV 리모컨의 `Back` 키 입력 시 현재 상태에 따라 지능적으로 화면을 전환합니다.
    - **Player ➔ Home**: 영상 시청 중 나가기.
    - **Home ➔ Profile Selection**: 프로필 전환을 위해 상위 메뉴로 이동.
- **포커스 유지**: 모드 전환 후에도 Compose의 상태 관리(`mutableStateOf`)를 통해 원활한 UI 흐름을 유지합니다.

### 2.3 안정화 조치
- **Experimental API**: `ExperimentalTvMaterial3Api`를 전역적으로 적절히 처리하여 컴파일 경고 및 런타임 불안정성을 제거하였습니다.
- **빌드 검증**: `BUILD SUCCESSFUL`을 통해 신규 의존성(Media3)과의 정합성을 확인하였습니다.

## 3. 결과물 목록
- `android-poc/app/src/main/java/com/depari/mpconcepts/components/PlayerScreen.kt`: 신규 생성.
- `android-poc/app/src/main/java/com/depari/mpconcepts/MainActivity.kt`: 내비게이션 및 재생 로직 통합.
- `android-poc/app/build.gradle`: Media3 의존성 추가.

## 4. 향후 계획 (Phase 3 마무리 및 검증)
- 실제 TV 셋톱박스 환경에서의 스트리밍 성능 테스트.
- Google TV Home 피드 연동을 위한 ContentProvider 기초 설계.
