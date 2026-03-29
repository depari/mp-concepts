<script lang="ts">
  export let themes = [];
  export let activeId = 'dark-neo';
</script>

<div class="theme-grid" role="group" aria-label="그래픽 스타일 선택">
  {#each themes as theme (theme.id)}
    <button
      class="theme-card"
      class:theme-card--active={theme.id === activeId}
      on:click={() => (activeId = theme.id)}
      title={theme.description}
      aria-pressed={theme.id === activeId}
      aria-label="{theme.label} 테마"
    >
      <span
        class="theme-card__swatch"
        style="background: {theme.preview};"
      ></span>
      <span class="theme-card__label">{theme.label}</span>
      {#if theme.id === activeId}
        <span class="theme-card__check">✓</span>
      {/if}
    </button>
  {/each}
</div>

<style>
  .theme-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .theme-card {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 11px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.83rem;
    font-weight: 500;
    font-family: var(--font-primary);
    cursor: pointer;
    transition: all 0.18s ease;
    text-align: left;
    position: relative;
    overflow: hidden;
  }

  .theme-card:hover {
    background: rgba(255, 255, 255, 0.09);
    color: rgba(255, 255, 255, 0.85);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .theme-card--active {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.13);
    color: #ffffff;
    font-weight: 600;
  }

  .theme-card__swatch {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  .theme-card__label {
    flex: 1;
  }

  .theme-card__check {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.7);
    margin-left: auto;
  }
</style>
