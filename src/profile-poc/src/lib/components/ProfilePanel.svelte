<script>
  import { fly, fade } from 'svelte/transition';
  import ProfileAvatar from './ProfileAvatar.svelte';
  import ContentCard from './ContentCard.svelte';
  import { interactionStore } from '../stores/interactionStore.js';
  import { previewContentStore } from '../stores/previewContentStore.js';

  export let profile;
  export let isFocused = false;

  $: hidePanelBottom = isFocused && $interactionStore.isDashboardActive;
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
  {#if isFocused && !hidePanelBottom}
    <div class="panel__bottom" in:fade={{ duration: 250 }} out:fade={{ duration: 200 }}>
      <!-- 이름 -->
      <div class="panel__name" in:fly={{ y: 20, duration: 300, delay: 80 }}>
        {profile.name}
      </div>

      <!-- 선호 앱 아이콘 영역 -->
      <div class="panel__apps" in:fly={{ y: 20, duration: 300, delay: 150 }}>
        {#each [
          { id: 'netflix', label: 'N', color: '#E50914' },
          { id: 'youtube', label: 'Y', color: '#FF0000' },
          { id: 'tving', label: 'T', color: '#FF153C' },
          { id: 'prime', label: 'P', color: '#00A8E1' }
        ] as app}
          <div class="app-icon" style="background-color: {app.color};">
            {app.label}
          </div>
        {/each}
      </div>

      <!-- 주요 컨텐츠(이어보기) 영역 -->
      {#if isFocused && $previewContentStore.data && $previewContentStore.data.length > 0}
        <div class="panel__contents" in:fly={{ y: 24, duration: 350, delay: 200 }}>
          {#each $previewContentStore.data.slice(0, 2) as content (content.content_id)}
            <ContentCard
              title={content.title}
              episode={content.provider_id.toUpperCase()}
              progress={content.progress}
              thumbnailUrl={content.thumbnail_url}
            />
          {/each}
        </div>
      {/if}
      
      <!-- 상세 항목 확인 힌트 -->
      <div class="panel__trigger-hint" in:fade={{ duration: 300, delay: 400 }}>
        <span class="bounce-arrow">↓</span> 상세 항목 확인
      </div>
    </div>

    <!-- 포커스 패널 하단 발광 효과 -->
    <div
      class="panel__glow"
      style="background: radial-gradient(ellipse at bottom, {profile.panelAccentColor}55 0%, transparent 70%);"
    ></div>
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
    height: 360px;
    justify-content: flex-start;
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

  .panel__trigger-hint {
    font-size: 0.8rem;
    color: var(--text-secondary);
    letter-spacing: 0.05em;
    font-family: var(--font-primary);
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: -4px;
    animation: glowPulse 2s ease infinite;
  }

  .bounce-arrow {
    display: inline-block;
    animation: bounce 1.5s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(3px); }
    60% { transform: translateY(1.5px); }
  }

  .panel__apps {
    display: flex;
    gap: 8px;
    margin-top: -10px;
  }

  .app-icon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: bold;
    color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
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


</style>
