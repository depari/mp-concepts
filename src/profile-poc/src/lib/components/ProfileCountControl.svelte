<script>
  export let options = [2, 3, 4, 5, 6, 7];
  export let value = 5;
</script>

<div class="count-control" role="group" aria-label="프로파일 수 선택">
  {#each options as opt}
    <button
      class="count-btn"
      class:count-btn--active={opt === value}
      on:click={() => (value = opt)}
      aria-label="{opt}개 프로파일"
      aria-pressed={opt === value}
    >
      {opt}
    </button>
  {/each}
</div>

<style>
  .count-control {
    display: flex;
    gap: 6px;
  }

  .count-btn {
    flex: 1;
    padding: 9px 0;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.88rem;
    font-weight: 600;
    font-family: var(--font-primary);
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 0.02em;
  }

  .count-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
  }

  .count-btn--active {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.55);
    color: #ffffff;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
  }
</style>
