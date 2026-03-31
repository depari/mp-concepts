# Android 빌드 종속성 강제 해결 보고서 (2026-03-31)

## 1. 개요
빌드 로그에서 발견된 비정상적인 구버전(1.0.1, 1.4.3 등) 라이브러리 혼입 현상과 그로 인한 `Resolution Strategy` 충동 에러를 해결하기 위해 강력한 의존성 규격화 조치를 취하였습니다.

## 2. 조치 사항
### 2.1 최신 Compose BOM 및 Kotlin 2.0 완전 대응
- `androidx.compose:compose-bom:2024.06.00` 버전으로 상향하였습니다. 이는 Compose 1.7.0 및 Kotlin 2.0에 최적화된 최신 정액제(BOM)입니다.

### 2.2 종속성 강제 해결 전략(ResolutionStrategy) 도입
- 어떠한 하위 의존성(예: androidx.tv)도 옛날 버전의 Compose 코어 라이브러리를 끌고 오지 못하도록 `force` 구문을 사용하여 모든 주요 모듈을 `1.7.0` 버전으로 고정하였습니다.
- 고정 대상: `runtime`, `ui`, `foundation`, `foundation-layout`, `ui-graphics`, `ui-text`

### 2.3 라이브러리 정합성 높이기
- `lifecycle-runtime-ktx` 및 `lifecycle-viewmodel-compose` 버전을 `2.8.2`로 동기화하여 안정성을 높였습니다.

## 3. 결과물 목록
- [app/build.gradle](file:///Volumes/SSEOSSD/dwon.seo/Git/mp-concepts/android-poc/app/build.gradle): BOM 2024.06.00 적용 및 강제 해제 전략 포함.

## 4. 권장 사항
- 이전에 꼬였던 그래들 해결 결과를 지우기 위해 반드시 "Clean Build"로 다시 시도해 주시기 바랍니다.
- 명령어: `./gradlew clean :app:assembleDebug`
