<!-- src/lib/components/ContentSectionHeader.svelte -->
<!-- 각 섹션의 상단 헤더: 아이콘 + 타이틀 + "보기 →" 링크 -->
<script lang="ts">
  export let icon = '';
  export let title = '';
  export let showMore = false;
</script>

<div class="section-header">
  <div class="section-header__left">
    <span class="section-header__icon" aria-hidden="true">{icon}</span>
    <h3 class="section-header__title">{title}</h3>
  </div>
  {#if showMore}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="section-header__more">보기 →</span>
  {/if}
</div>

<style>
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .section-header__left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-header__icon {
    font-size: 1.1rem;
    line-height: 1;
  }

  .section-header__title {
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
    letter-spacing: 0.01em;
  }

  .section-header__more {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    font-family: var(--font-primary, 'Poppins', sans-serif);
    transition: color 0.2s ease;
  }

  .section-header__more:hover {
    color: rgba(255, 255, 255, 0.8);
  }
</style>
