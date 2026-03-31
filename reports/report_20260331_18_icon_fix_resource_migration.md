# Android TV 아이콘 표기 오류 해결 및 리소스 이식 보고서

## 1. 개요
프로필 선택 화면에서 아이콘(아바타)이 제대로 표시되지 않던 문제를 해결하기 위해, 웹 프로젝트의 물리적 리소스를 안드로이드 프로젝트 내부로 직접 이식하고 연동 로직을 강화하였습니다.

## 2. 문제 원인 분석
- **원인**: 외부 GitHub URL을 통한 이미지 로딩 방식이 불안정하거나 경로가 유효하지 않았음.
- **분석**: 안드로이드 TV 환경에서는 로컬 리보스를 통한 렌더링이 성능 및 안정성 측면에서 우수하므로 이식 작업 결정.

## 3. 해결 및 조치 내용
### 3.1 리소스 물리적 이식
- 웹 프로젝트(`src/profile-poc/public/avatars/`) 내의 아바타 이미지 7종을 안드로이드 프로젝트의 `app/src/main/res/drawable/` 위치로 복사하였습니다.
- **파일명 규칙 준수**: `avatar_1.png`, `avatar_2.png` 등 안드로이드 리소스 명명 규칙을 유지함.

### 3.2 데이터 연동 로직 수정
- **Profile 모델 확장**: `drawableResId` 필드를 추가하여 로컬 리소스 ID를 저장할 수 있도록 개선하였습니다.
- **MainActivity Mock 데이터 수정**: 외부 URL 대신 `R.drawable.avatar_n`을 직접 참조하도록 업데이트하여 앱 실행 시 즉각적인 로딩이 가능하게 하였습니다.

### 3.3 로딩 컴포넌트 강화 (`ProfileAvatar.kt`)
- `AsyncImage` 가 `drawableResId` 가 존재할 경우 이를 최우선으로 로드하도록 수정하여 네트워크 연결과 관계없이 아이콘이 항상 표시되도록 보장하였습니다.

## 4. 최종 결과
- 빌드 결과: **BUILD SUCCESSFUL**
- 실제 확인: 지은, 민준, 하나 프로필의 실제 웹 아바타 아이콘이 고해상도로 정상 노출됨.

## 5. 관련 리소스 위치
- [android-poc/app/src/main/res/drawable/](file:///Volumes/SSEOSSD/dwon.seo/Git/mp-concepts/android-poc/app/src/main/res/drawable/)
