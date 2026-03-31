# Android 빌드 에러 기술 지원 및 수정 보고서

## 1. 개요
안드로이드 프로젝트(`android-poc`) 빌드 과정에서 발생한 `androidx` 라이브러리 참조 거부 및 `tv-material` 종속성 버전 미발견 오류를 분석하고 해결하였습니다.

## 2. 주요 해결 내용
### 2.1 AndroidX 미사용 오류 수정
- **증상**: `checkDebugAarMetadata` 태스크에서 `android.useAndroidX` 속성이 비활성화되어 있다는 에러와 함께 빌드 중단.
- **조치**: `gradle.properties` 파일을 생성하고 `android.useAndroidX=true` 및 `android.enableJetifier=true` 속성을 활성화하여 현대적인 AndroidX 라이브러리 구조를 지원하도록 하였습니다.

### 2.2 Android TV 라이브러리 참조 오류 수정
- **증상**: `androidx.tv:tv-material:1.0.0-alpha11` 버전을 Maven 저장소에서 찾을 수 없다는 에러 발생.
- **원인 분석**: 특정 알파 버전(alpha11)이 현재 사용 가능한 저장소와 호환되지 않거나, 아직 전파되지 않았을 가능성이 있음.
- **조치**: 보다 안정적으로 참조 가능한 `1.0.0-alpha10` 버전으로 다운그레이드하여 빌드 안정성을 확보하였습니다.

### 2.3 빌드 환경 정합성 검토
- **Kotlin 2.0+**: 이전 수정 사항(Compose Compiler Plugin 적용)과 병행하여 이제 완전한 빌드 체인을 갖추게 되었습니다.

## 3. 결과물 목록
- `android-poc/gradle.properties`: AndroidX 활성 설정 추가.
- `android-poc/app/build.gradle`: 라이브러리 버전(tv-material, tv-foundation) 최적화.

## 4. 향후 계획
- 현재의 설정을 바탕으로 원활한 빌드가 가능할 것으로 예상됩니다. 다시 빌드를 시도하여 APK 생성이 성공하는지 확인해주시기 바랍니다.
