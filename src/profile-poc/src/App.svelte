<script lang="ts">
  import { onMount } from 'svelte';
  import ProfileScreen from './lib/components/ProfileScreen.svelte';
  import Header from './lib/components/Header.svelte';
  import PocControlPanel from './lib/components/PocControlPanel.svelte';
  import MiniModeSelector from './lib/components/MiniModeSelector.svelte';
  import { createKeyHandler } from './lib/utils/navigation.js';
  import { miniModeStore, toggleMiniMode } from './lib/stores/miniModeStore.js';
  import { appStateStore } from './lib/stores/appStateStore.js';
  import { isPowerOn } from './lib/stores/tvPowerStore.js';
  import SamsungTVHome from './lib/components/SamsungTVHome.svelte';
  import TvPowerButton from './lib/components/TvPowerButton.svelte';

  let screenRef;

  function handleEnter() {
    if (!$isPowerOn) return;
    // 딥링크 상태가 아닌 일반 선택 상태일 때만 엔터 핸들
    if ($appStateStore.mode === 'selection') {
      screenRef?.handleEnter();
    }
  }

  onMount(() => {
    const handler = createKeyHandler(handleEnter);
    window.addEventListener('keydown', handler);
    window.addEventListener('toggle-mini-mode', toggleMiniMode);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('toggle-mini-mode', toggleMiniMode);
    };
  });
</script>

<!-- TV Power Off Layer -->
{#if !$isPowerOn}
  <div class="power-off-layer"></div>
{/if}

<!-- TV 배경 (항상 존재하지만 홈화면에서는 숨길 수 있음) -->
<div class="tv-background"></div>

<!-- 화면 전환 로직 -->
{#if $appStateStore.mode === 'home' || $appStateStore.mode === 'deep_link'}
  <SamsungTVHome />
{/if}

<!-- 메인 프로필 선택 화면 (상시 존재하며 상태에 따라 애니메이션) -->
<div 
  class="full-mode-layer" 
  class:mode-hidden={$miniModeStore.isActive}
  class:mode-exiting={$appStateStore.mode !== 'selection'}
>
  <Header />
  <ProfileScreen bind:this={screenRef} />

  <!-- 하단 키 힌트 -->
  <div class="key-hints" aria-hidden="true">
    <span class="hint">← → 이동</span>
    <span class="hint-sep">·</span>
    <span class="hint">Enter 이어보기</span>
    <span class="hint-sep">·</span>
    <span class="hint">Tab 설정</span>
  </div>
</div>

<!-- POC 컨트롤 패널 (우측 하단 FAB + 패널) -->
<PocControlPanel />

<!-- 특화 미니모드 오버레이 -->
<MiniModeSelector />

<!-- 상시 노출 TV Power 버튼 -->
<TvPowerButton />

<style>
  :global(body) {
    overflow: hidden;
    background: #000;
  }

  .power-off-layer {
    position: fixed;
    inset: 0;
    background: #000;
    z-index: 9990;
    transition: opacity 0.5s ease;
  }

  .tv-background {
    position: fixed;
    inset: 0;
    background-image: url('/tv-bg.png');
    background-size: cover;
    background-position: center;
    z-index: -10;
  }

  .full-mode-layer {
    position: fixed;
    inset: 0;
    z-index: 10;
    transition: 
      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), 
      opacity 0.6s ease,
      filter 0.6s ease;
    transform-origin: center center;
    border-radius: 0;
    overflow: hidden;
  }

  /* 홈 화면으로 전환 시 우측 상단으로 빨려 들어가는 효과 */
  .mode-exiting {
    transform: scale(0.2) translate(150%, -150%);
    opacity: 0;
    filter: blur(20px);
    pointer-events: none;
    transform-origin: top right;
  }

  .mode-hidden {
    transform: scale(0.9) translateY(-2%);
    opacity: 0;
    pointer-events: none;
    border-radius: 20px;
  }

  .key-hints {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: var(--z-key-hint, 50);
    pointer-events: none;
    animation: fadeIn 1s 1.5s ease both;
  }

  .hint {
    font-size: 0.72rem;
    color: var(--text-hint, rgba(255,255,255,0.35));
    font-family: var(--font-primary);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .hint-sep {
    color: var(--text-hint, rgba(255,255,255,0.2));
    font-size: 0.72rem;
  }
</style>
