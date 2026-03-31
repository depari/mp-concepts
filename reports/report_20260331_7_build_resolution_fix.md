# Android 빌드 해상도 및 매니페스트 충돌 수정 보고서

## 1. 개요
빌드 단계에서 발생한 `processDebugResources` 실패 및 `debugCompileClasspath` 종속성 변이 오류를 분석하고 해결하였습니다.

## 2. 주요 해결 내용
### 2.1 AndroidManifest.xml 패키지 충돌 해결
- **증상**: `processDebugMainManifest` 태스크에서 `AndroidManifest.xml`의 `package` 속성이 경고를 유발하고 빌드 정합성을 해침.
- **조치**: `manifest` 태그에서 `package` 어트리뷰트를 제거하여 `build.gradle`의 `namespace`와 충돌을 방지하고 최신 AGP(Android Gradle Plugin) 권고 표준을 따랐습니다.

### 2.2 종속성 해결 시점 오류 수정 (BOM 제거)
- **증상**: `Cannot mutate the dependencies of configuration ':app:debugCompileClasspath' after the configuration was resolved.` 에러 발생.
- **원인**: `Compose BOM`이 내부적으로 종속성을 조정하려 할 때, 이미 다른 라이브러리에 의해 해결된 시점과 충돌하여 발생한 것으로 추정됩니다 (특히 Kotlin 2.0 및 Compose Compiler Plugin 환경).
- **조치**: `androidx.compose:compose-bom`을 제거하고, 각 라이브러리 버전을 명시적(Compose 1.6.7)으로 선언하여 Gradle의 의존성 해결 그래프를 단순화하였습니다.

### 2.3 플러그인 정의 표준화
- **조치**: `kotlin-android` 플러그인 대신 표준 명칭인 `org.jetbrains.kotlin.android`를 사용하도록 수정하여 플러그인 로드 시점 및 설정의 명확성을 높였습니다.

## 3. 결과물 목록
- `android-poc/app/src/main/AndroidManifest.xml`: 패키지 속성 제거 완료.
- `android-poc/app/build.gradle`: BOM 제거 및 명시적 버전 선언, 플러그인 명칭 수정 완료.

## 4. 향후 계획
- 현재의 설정을 바탕으로 깨끗한 상태(Clean Build)에서 다시 빌드를 시도해주시기 바랍니다. (`./gradlew clean assembleDebug`)
