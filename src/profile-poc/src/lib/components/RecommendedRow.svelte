<!-- src/lib/components/RecommendedRow.svelte -->
<!-- 추천 컨텐츠 가로 스크롤 행 -->
<script lang="ts">
  import RecommendedCard from './RecommendedCard.svelte';

  export let items: any[] = [];
  export let focusedIndex: number = -1;
</script>

<div class="rec-row">
  {#if items.length === 0}
    <p class="empty-msg">추천 컨텐츠가 없습니다.</p>
  {:else}
    {#each items as item, i (item.content_id)}
      <RecommendedCard
        {item}
        isFocused={i === focusedIndex}
      />
    {/each}
  {/if}
</div>

<style>
  .rec-row {
    display: flex;
    gap: 18px;
    overflow-x: auto;
    padding: 6px 4px 12px;
    scrollbar-width: none;
    align-items: flex-start;
  }

  .rec-row::-webkit-scrollbar {
    display: none;
  }

  .empty-msg {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
