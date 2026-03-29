# Full Mode 컨텐츠 브라우저 및 홈 화면 분리 / TypeScript 마이그레이션 계획서

## 1. 개요
* **목표**:
  1. 기존 JavaScript 기반 Svelte 애플리케이션을 TypeScript로 전면 마이그레이션.
  2. 홈 화면(Home Screen)과 프로파일 컨텐츠 브라우저(Profile Content Hub)의 명확한 역할 분리 및 진입 UX 변경.
* **주요 변경 사항**:
  - **진입 방식**: Full Mode 프로파일 아바타에서 `Enter`가 아닌 `ArrowDown(↓)` 키를 눌러 프로파일 전용 컨텐츠 브라우저로 진입.
  - **홈 화면(Home)**: 사용자의 개인화 컨텐츠 + 모든 프로파일의 공통 인기 컨텐츠를 혼합 제공.
  - **프로파일 컨텐츠 브라우저**: 현재 포커스된 프로파일과 직접적으로 연관된 항목(최근 실행, 이어보기 등)을 집중 탐색.
  - **TypeScript 적용**: 모든 `.js` 파일을 `.ts`로 변경하고, `.svelte` 컴포넌트의 script에 `lang="ts"` 추가. 엄격한 타입 체크 적용.

## 2. 작업 단계 (TDD 준수)

### Phase 1: TypeScript 환경 구성 및 스토어 마이그레이션
1. TypeScript, svelte-preprocess 등 필요 모듈 설치.
2. `tsconfig.json` 및 `svelte.config.js` 설정.
3. 기존 Unit Test 구조가 TS에서도 동작하도록 보장.
4. `src/lib/stores/*` 파일들을 `.ts`로 변경하고, 인터페이스(타입) 정의.
5. `interactionStore`, `profileStore`, `contentDiscoveryStore` 테스트 케이스(TS) 확보 및 Pass 확인.

### Phase 2: 컴포넌트 TypeScript 적용
1. `src/lib/components/*.svelte`에 `<script lang="ts">` 적용.
2. Store의 타입과 Mismatch가 없는지 컴파일 레벨에서 검증 (`npm run check` 또는 `vite build`).

### Phase 3: 진입 네비게이션 UX 변경
1. `ProfilePanel.svelte` 및 `ProfileScreen.svelte`의 네비게이션 수정.
   - **기존**: `Enter` -> 컨텐츠 브라우저 진입.
   - **변경**: `ArrowDown` -> 컨텐츠 브라우저(FullModeContentHub) 진입. (컴포넌트 내 방향키 핸들링이 브라우저에서도 정상 동작하도록 엣지 케이스 처리)
2. `ArrowUp`을 눌렀을 때 다시 프로파일 선택부로 복귀.

### Phase 4: 홈 화면(Home Screen) 개념 분리
1. 별도의 `HomeScreen.svelte`를 구성하거나, 기존 미니모드 대시보드와 공통 컨텐츠 영역을 통합하여 개인+공통 컨텐츠를 보여주는 레이아웃 설계.
*(해당 페이즈는 Phase 3 작업 완료 후 디테일하게 세분화하여 진행)*

## 3. 테스트 전략 (TDD)
- TS 변환 간 Type 실패/컴파일 에러를 첫 번째 Failed로 취급.
- 네비게이션 로직(아래 방향키 이동) 변경 전 `interactionStore` 및 컴포넌트 테스트 작성, 실패 확인, 성공 구현 순으로 반복 진행.
