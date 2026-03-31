# .gitignore 업데이트 (Android 프로젝트 대응) 보고서

## 1. 개요
새로 추가된 안드로이드 프로젝트(`android-poc`)의 빌드 아티팩트 및 로컬 설정 파일들이 Git 형상관리에 포함되지 않도록 `.gitignore` 파일을 업데이트하였습니다.

## 2. 수행 내용
### 2.1 기존 .gitignore 분석
- 루트 디렉토리의 `.gitignore`를 확인한 결과, Node.js 및 Vite 관련 설정 위주로 구성되어 안드로이드 특화 항목(Gradle, Local Properties 등)이 누락되어 있음을 확인하였습니다.

### 2.2 업데이트 항목 추가
- **Gradle 빌드 캐시**: `.gradle/`
- **로컬 설정**: `local.properties` (SDK 경로 등 민감 정보 포함 가능)
- **빌드 결과물**: `*.apk`, `*.aab`, 그리고 `android-poc/**/build/` 하위의 모든 생성물.
- **IDE 및 보조 디렉토리**: `.cxx/`, `.externalNativeBuild/`, `captures/`, `.navigation/` 등.
- **보안 관련**: `google-services.json` (필요 시 제외).

## 3. 결과물
- [.gitignore](file:///Volumes/SSEOSSD/dwon.seo/Git/mp-concepts/.gitignore) : 최신화 완료.

## 4. 향후 계획
- 이후 안드로이드 빌드 테스트 시 생성되는 임시 파일들이 올바르게 무시되는지 점검하고, 필요한 경우 섹션을 추가로 세분화할 예정입니다.
