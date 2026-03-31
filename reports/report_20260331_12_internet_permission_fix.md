# 런타임 권한 에러(SecurityException) 해결 보고서

## 1. 개요
안드로이드 POC 실행 중 발생한 `java.lang.SecurityException: Permission denied (missing INTERNET permission?)` 오류에 대한 분석 및 조치 결과를 보고합니다.

## 2. 문제 원인 분석
- **증상**: 앱 실행 및 이미지/비디오 로딩 시점에 즉시 크래시 발생 및 프로세스 종료.
- **원인**: Phase 3 고도화 과정에서 도입된 `Coil`(프로필 이미지 로딩) 및 `ExoPlayer`(비디오 스트리밍)가 원격 서버에 접근을 시도하였으나, `AndroidManifest.xml`에 인터넷 사용 권한이 누락되어 안드로이드 OS 수준에서 보안 예외를 발생시킴.

## 3. 조치 내용
- **AndroidManifest.xml 수정**: 
    - `<uses-permission android:name="android.permission.INTERNET" />` 태그를 추가하여 네트워크 접근 권한을 명시적으로 부여하였습니다.
- **빌드 검증**: 
    - 권한 추가 후 `BUILD SUCCESSFUL`을 확인하였으며, 런타임 시 네트워크 소켓 오픈이 정상적으로 허용됨을 확인하였습니다.

## 4. 결과물
- `android-poc/app/src/main/AndroidManifest.xml`: 원격 리소스 로딩을 위한 필수 권한 확보.

## 5. 향후 조치
- 외부 API 연동 시 필요한 추가 권한(예: 네트워크 상태 확인 등)이 발생할 경우 즉시 반영할 예정입니다.
