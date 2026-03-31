# Android 빌드 에러 개선 기록

## 1. 발생한 문제
- **상태**: Android 프로젝트(`android-poc`) 빌드 시 컴파일 에러 또는 설정 에러 발생.
- **원인 분석**:
    1. **Kotlin 및 Compose 버전 충돌**: Kotlin 2.0.0 버전에서 기존 `composeOptions` 방식이 아닌 전용 Compose Compiler Gradle Plugin 방식을 사용해야 하나, 이전 방식의 코드가 남아있었음.
    2. **라이브러리 임포트 충돌**: `androidx.tv.material3.Text`와 `androidx.compose.material3.Text` 간의 충돌 및 TV 라이브러리 내 `Text` 컴포넌트 부재 이슈.
    3. **비즈니스 로직 종속성 누락**: ViewModel 및 StateFlow 사용을 위한 `lifecycle-viewmodel-compose` 및 `kotlinx-coroutines-android` 종속성 누락.

## 2. 조치 내용
### 2.1 빌드 스크립트 고도화 (Kotlin 2.0 대응)
- `build.gradle` (Project): `org.jetbrains.kotlin:compose-compiler-gradle-plugin` 추가.
- `app/build.gradle`: `apply plugin: 'org.jetbrains.kotlin.plugin.compose'` 적용 및 `composeOptions` 제거.

### 2.2 종속성 보완
- 코루틴 및 뷰모델 관련 핵심 라이브러리 종속성 추가 (`androidx.lifecycle`, `kotlinx.coroutines`).

### 2.3 소스 코드 정제 (임포트 최적화)
- `MainActivity.kt`, `RecommendedCard.kt`, `RecommendedRow.kt` 등에서 `Text` 컴포넌트 임포트를 `androidx.compose.material3.Text`로 통일하여 컴파일 안정성 확보.

## 3. 확인 결과
- **설정 정합성**: Kotlin 2.0 아키텍처에 맞게 Gradle 설정이 업데이트됨.
- **컴포넌트 참조**: TV Material3 테마 하에서 표준 Compose Text를 사용하도록 수정되어 참조 에러 해결 예상.
