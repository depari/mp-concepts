<script>
  import { fly, fade } from 'svelte/transition';
  import ProfileAvatar from './ProfileAvatar.svelte';
  import ContentCard from './ContentCard.svelte';

  export let profile;
  export let isFocused = false;

  let showContents = false;

  // 포커스 잃으면 콘텐츠 카드 자동 닫기
  $: if (!isFocused) showContents = false;

  export function activateContents() {
    if (isFocused) showContents = !showContents;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="panel"
  class:panel--focused={isFocused}
  class:panel--unfocused={!isFocused}
  style="
    background: {isFocused ? profile.gradient : 'var(--panel-unfocused-bg)'};
    border-radius: var(--border-radius-panel);
  "
  on:click
>
  <!-- 비포커스 어두운 오버레이 -->
  {#if !isFocused}
    <div class="panel__overlay"></div>
  {/if}

  <!-- 아바타 -->
  <ProfileAvatar {profile} {isFocused} />

  <!-- 포커스 시 하단 정보 영역 -->
  {#if isFocused}
    <div class="panel__bottom" in:fade={{ duration: 250 }}>
      <!-- 이름 -->
      <div class="panel__name" in:fly={{ y: 20, duration: 300, delay: 80 }}>
        {profile.name}
      </div>

      <!-- 이어보기 카드 영역 -->
      {#if showContents && profile.recentContents.length > 0}
        <div class="panel__contents" in:fly={{ y: 24, duration: 350, delay: 100 }}>
          {#each profile.recentContents.slice(0, 2) as content (content.id)}
            <ContentCard
              title={content.title}
              episode={content.episode}
              progress={content.progress}
              thumbnailGradient={content.thumbnailGradient}
            />
          {/each}
        </div>
      {:else if isFocused && profile.recentContents.length > 0}
        <p class="panel__enter-hint" in:fade={{ duration: 300, delay: 400 }}>
          Enter — 이어보기
        </p>
      {/if}
    </div>

    <!-- 포커스 패널 하단 발광 효과 -->
    <div
      class="panel__glow"
      style="background: radial-gradient(ellipse at bottom, {profile.panelAccentColor}55 0%, transparent 70%);"
    ></div>
  {/if}

  <!-- 사운드 웨이브 (포커스 시) -->
  {#if isFocused && !showContents}
    <div class="panel__wave" in:fade={{ duration: 300 }}>
      {#each [1, 2, 3, 4, 5] as bar}
        <span class="wave-bar" style="animation-delay: {bar * 0.12}s;"></span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .panel {
    width: 12vw;
    height: 100vh;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    transition:
      width var(--panel-transition),
      border-radius 0.4s ease;
    cursor: pointer;
    will-change: width;
  }

  .panel--focused {
    width: 44vw;
  }

  .panel__overlay {
    position: absolute;
    inset: 0;
    background: var(--panel-overlay);
    z-index: 2;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  .panel__glow {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    pointer-events: none;
    z-index: 2;
  }

  /* 이름 & 콘텐츠 영역 */
  .panel__bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0 32px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .panel__name {
    font-size: clamp(1.4rem, 3vw, 2.8rem);
    font-weight: 700;
    color: var(--text-primary);
    text-shadow: var(--name-shadow);
    letter-spacing: 0.03em;
    text-align: center;
    font-family: var(--font-primary);
  }

  .panel__enter-hint {
    font-size: 0.78rem;
    color: var(--text-secondary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--font-primary);
    animation: glowPulse 2s ease infinite;
  }

  /* 이어보기 카드 그리드 */
  .panel__contents {
    display: flex;
    gap: 12px;
    width: 100%;
    max-width: 480px;
    justify-content: center;
  }

  .panel__contents > :global(*) {
    flex: 1;
    max-width: 220px;
  }

  /* 사운드 웨이브 */
  .panel__wave {
    position: absolute;
    bottom: 14%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 5;
  }

  .wave-bar {
    display: block;
    width: 3px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 2px;
    animation: soundWave 0.9s ease-in-out infinite;
    transform-origin: bottom;
  }
</style>
