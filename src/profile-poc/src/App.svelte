<script>
  import { onMount } from 'svelte';
  import ProfileScreen from './lib/components/ProfileScreen.svelte';
  import Header from './lib/components/Header.svelte';
  import PocControlPanel from './lib/components/PocControlPanel.svelte';
  import MiniModeSelector from './lib/components/MiniModeSelector.svelte';
  import { createKeyHandler } from './lib/utils/navigation.js';
  import { miniModeStore, toggleMiniMode } from './lib/stores/miniModeStore.js';
  import { appStateStore } from './lib/stores/appStateStore.js';
  import SamsungTVHome from './lib/components/SamsungTVHome.svelte';

  let screenRef;

  function handleEnter() {
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

<!-- TV 배경 (항상 존재하지만 홈화면에서는 숨길 수 있음) -->
<div class="tv-background"></div>

<!-- 화면 전환 로직 -->
{#if $appStateStore.mode === 'home' || $appStateStore.mode === 'deep_link'}
  <SamsungTVHome />
{:else}
  <!-- 메인 화면 (Full Mode) -->
  <div class="full-mode-layer" class:mode-hidden={$miniModeStore.isActive}>
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
{/if}

<!-- POC 컨트롤 패널 (우측 하단 FAB + 패널) -->
<PocControlPanel />

<!-- 특화 미니모드 오버레이 -->
<MiniModeSelector />

<style>
  :global(body) {
    overflow: hidden;
    background: #000;
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
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
    transform-origin: center center;
    border-radius: 0;
    overflow: hidden;
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
