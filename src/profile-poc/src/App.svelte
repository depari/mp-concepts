<script>
  import { onMount } from 'svelte';
  import ProfileScreen from './lib/components/ProfileScreen.svelte';
  import Header from './lib/components/Header.svelte';
  import PocControlPanel from './lib/components/PocControlPanel.svelte';
  import { createKeyHandler } from './lib/utils/navigation.js';

  let screenRef;

  function handleEnter() {
    screenRef?.handleEnter();
  }

  onMount(() => {
    const handler = createKeyHandler(handleEnter);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });
</script>

<!-- 메인 화면 -->
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

<!-- POC 컨트롤 패널 (우측 하단 FAB + 패널) -->
<PocControlPanel />

<style>
  :global(body) {
    overflow: hidden;
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
