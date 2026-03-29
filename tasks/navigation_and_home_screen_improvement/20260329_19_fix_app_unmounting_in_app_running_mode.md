# 문제점 개선 시도 및 결과 기록

**날짜**: 2026-03-29
**Task**: fix_app_unmounting_in_app_running_mode
**기록**: 20260329_19_fix_app_unmounting_in_app_running_mode

## 1. 앱 전체 화면(Full Screen) 진입 시 검은 화면 원인 해결 (언마운트 버그)
* **문제점**:
  - PIG 모드에서 Enter 키를 눌러 `app_running` 모드로 전환할 때, 화면이 검게 변하는 현상이 지속됨.
  - 조사 결과, `App.svelte`의 렌더링 조건문에서 `app_running` 모드가 누락되어 있어, 모드 변경 즉시 플레이어 UI를 포함하고 있는 `SamsungTVHome.svelte` 컴포넌트 전체가 언마운트(Unmount)되고 있었음.
* **개선 계획**:
  - `App.svelte`의 컨디셔널 렌더링 블록에 `$appStateStore.mode === 'app_running'` 조건을 추가하여, 전체 화면 모드에서도 홈 컴포넌트(및 플레이어 오버레이)가 유지되도록 수정.
* **최종 결과**:
  - 이제 PIG 모드에서 Enter 클릭 시 정상적으로 `SamsungTVHome` 내의 `app-content-player` UI가 노출됨을 확인.

## 2. 작업 일지
- `App.svelte` 렌더링 로직 수정 완료. 2026-03-29 17:48
