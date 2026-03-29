# 전체 화면 진입 시 검은 화면 근본 원인(언마운트 버그) 해결 보고서

**날짜**: 2026-03-29
**Task**: fix_app_unmounting_in_app_running_mode
**담당**: Antigravity

## 1. 개요
PIG 모드에서 전체 화면(Player UI)으로 전환할 때 화면이 검게 변하던 현상의 근본 원인인 컴포넌트 언마운트 버그를 발견하고 이를 해결하였습니다.

## 2. 주요 수정 내용

### 2.1 상위 렌더링 조건문 보강 (`App.svelte`)
- **문제**: `App.svelte`에서 `SamsungTVHome.svelte`를 렌더링하는 조건문에 `app_running` 모드가 포함되어 있지 않았습니다. 이로 인해 PIG 모드에서 Enter 키를 눌러 모드가 바뀜과 동시에 UI 요소가 사라지게 되었습니다.
- **수정**: `#if` 블록의 모드 조건에 `app_running`을 추가하였습니다.
- **결과**: `SamsungTVHome.svelte` 내부에서 정의된 프리미엄 플레이어 UI(브랜드 로고, 펄스 애니메이션 등)가 전체 화면에서도 유지되며 정상 노출됩니다.

## 3. 테스트 및 검증 결과
- **검증**: 이제 PIG 재생 상태에서 Enter를 누르면 플레이어가 홈 화면을 덮으며 전체 화면으로 멋지게 확장됩니다.
- **동작**: "STOP" 버튼 클릭이나 ESC 키 입력을 통해 다시 홈 화면으로의 복귀가 지체 없이 이루어집니다.

## 4. 최종 결과물 소감
단순히 UI 내부의 색상을 고치는 것을 넘어, 최상위 구조에서의 렌더링 무결성을 확보하여 안정적인 서비스 전환 플로우를 완성하였습니다.

상세 기술 내역은 `tasks/navigation_and_home_screen_improvement/20260329_19_fix_app_unmounting_in_app_running_mode.md`를 참조하세요.
