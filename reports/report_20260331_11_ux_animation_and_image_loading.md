# Android Phase 3: UX 애니메이션 및 이미지 로딩 고도화 보고서

## 1. 개요
TV 시청 환경에서의 몰입감을 높이기 위해 이미지 로딩 라이브러리(Coil)를 도입하고, 리모컨 포커스에 반응하는 동적 애니메이션(Scale & Glow)을 구현하였습니다.

## 2. 주요 구현 내용
### 2.1 Coil 이미지 로딩 라이브러리 연동
- **구현**: `io.coil-kt:coil-compose`를 도입하여 프로필 및 콘텐츠 이미지를 비동기적으로 로딩할 수 있는 기반을 마련하였습니다.
- **적용**: `ProfileAvatar`에 `ui-avatars` API를 연동하여 실시간 프로필 이미지를 생성 및 표시합니다.

### 2.2 포커스 Scale 및 Glow 애니메이션
- **Scale Up**: 리모컨 포커스가 위치할 때 `animateFloatAsState`를 사용하여 카드는 **1.15배**, 프로필 아바타는 **1.25배** 부드럽게 확대되도록 구현하였습니다.
- **Glow 효과**: 포커스 시 테두리 색상을 시안(Cyan) 또는 화이트(White)로 변경하고 두께를 조절하여 사용자가 현재 위치를 명확히 인지할 수 있도록 하였습니다.
- **배경 변화**: 포커스 시 배경색의 투명도와 명도를 조절하여 입체감을 부여하였습니다.

### 2.3 코드 안정화
- **Import 에러 수정**: `Modifier.fillMaxSize()` 누락으로 인한 컴파일 에러를 즉시 해결하여 빌드 정합성을 유지하였습니다.

## 3. 결과물 목록
- `android-poc/app/build.gradle`: Coil 라이브러리 추가.
- `android-poc/app/src/main/java/com/depari/mpconcepts/components/ProfileAvatar.kt`: Coil 연동 및 Scale 애니메이션 적용.
- `android-poc/app/src/main/java/com/depari/mpconcepts/components/RecommendedCard.kt`: Scale 및 Border Glow 효과 적용.

## 4. 향후 계획
- 콘텐츠 상세 정보 표시를 위한 오버레이 레이아웃 추가.
- 실제 앱 아이콘 및 리소스 최적화.
