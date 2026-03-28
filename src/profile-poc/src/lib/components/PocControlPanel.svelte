<script>
  import { fly, fade } from 'svelte/transition';
  import { THEMES } from '../data/themes.js';
  import {
    profileCount,
    activeThemeId,
    activeTheme,
    applyTheme,
    isPocPanelOpen,
    togglePocPanel
  } from '../stores/pocConfigStore.js';
  import ProfileCountControl from './ProfileCountControl.svelte';
  import ThemeSelector from './ThemeSelector.svelte';

  const COUNT_OPTIONS = [2, 3, 4, 5, 6, 7];

  // 테마 변경 시 CSS 변수 즉시 적용
  $: applyTheme($activeTheme);
</script>

<!-- ⚙ FAB 버튼 -->
<button
  class="poc-fab"
  on:click={togglePocPanel}
  aria-label="POC 컨트롤 패널 (Tab)"
  title="POC Controls"
>
  {$isPocPanelOpen ? '✕' : '⚙'}
</button>

<!-- 컨트롤 패널 -->
{#if $isPocPanelOpen}
  <div
    class="poc-panel"
    role="dialog"
    aria-label="POC 컨트롤 패널"
    in:fly={{ x: 20, y: 10, duration: 280 }}
    out:fade={{ duration: 150 }}
  >
    <!-- 헤더 -->
    <div class="panel-header">
      <span class="panel-header__title">⚙ POC Controls</span>
      <button class="panel-header__close" on:click={togglePocPanel} aria-label="닫기">✕</button>
    </div>

    <!-- 구분선 -->
    <div class="panel-divider"></div>

    <!-- 프로필 수 섹션 -->
    <section class="panel-section">
      <h3 class="panel-section__label">프로필 수</h3>
      <ProfileCountControl
        options={COUNT_OPTIONS}
        bind:value={$profileCount}
      />
    </section>

    <!-- 구분선 -->
    <div class="panel-divider"></div>

    <!-- 그래픽 스타일 섹션 -->
    <section class="panel-section">
      <h3 class="panel-section__label">그래픽 스타일</h3>
      <ThemeSelector
        themes={THEMES}
        bind:activeId={$activeThemeId}
      />
    </section>

    <!-- 현재 상태 표시 -->
    <div class="panel-status">
      <span>프로필 {$profileCount}개</span>
      <span class="panel-status__sep">·</span>
      <span>{THEMES.find(t => t.id === $activeThemeId)?.label ?? 'Dark Neo'}</span>
    </div>
  </div>
{/if}

<style>
  /* ⚙ FAB 버튼 */
  .poc-fab {
    position: fixed;
    right: 28px;
    bottom: 28px;
    z-index: var(--z-fab, 9999);
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--text-primary, #fff);
    font-size: 1.35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  .poc-fab:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: scale(1.06);
    box-shadow: 0 6px 24px rgba(0,0,0,0.5);
  }

  /* 패널 */
  .poc-panel {
    position: fixed;
    right: 28px;
    bottom: 92px;
    z-index: var(--z-controls, 9998);
    width: 312px;
    background: var(--control-bg, rgba(15, 15, 25, 0.95));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--control-border, rgba(255, 255, 255, 0.12));
    border-radius: 18px;
    padding: 0;
    color: var(--text-primary, #fff);
    box-shadow: 0 12px 48px rgba(0,0,0,0.65);
    overflow: hidden;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 18px 14px;
  }

  .panel-header__title {
    font-size: 0.88rem;
    font-weight: 600;
    font-family: var(--font-primary);
    letter-spacing: 0.04em;
    color: var(--text-primary);
  }

  .panel-header__close {
    font-size: 0.9rem;
    color: var(--text-secondary);
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease;
    cursor: pointer;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .panel-header__close:hover {
    background: rgba(255, 255, 255, 0.13);
    color: var(--text-primary);
  }

  .panel-divider {
    height: 1px;
    background: var(--control-border, rgba(255,255,255,0.1));
    margin: 0;
  }

  .panel-section {
    padding: 14px 18px 16px;
  }

  .panel-section__label {
    font-size: 0.72rem;
    color: var(--text-hint, rgba(255,255,255,0.35));
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 10px;
    font-family: var(--font-primary);
    font-weight: 600;
  }

  .panel-status {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px 14px;
    font-size: 0.75rem;
    color: var(--text-hint, rgba(255,255,255,0.35));
    font-family: var(--font-primary);
  }

  .panel-status__sep {
    opacity: 0.4;
  }
</style>
