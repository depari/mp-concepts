<!-- src/lib/components/RecentWatchRow.svelte -->
<!-- 이어보기 컨텐츠 가로 스크롤 행 -->
<script lang="ts">
  import RecentWatchCard from './RecentWatchCard.svelte';

  export let items = [];
  export let focusedIndex = -1;
  export let accentColor = '#ffffff';
</script>

<div class="watch-row">
  {#if items.length === 0}
    <p class="empty-msg">최근 시청한 컨텐츠가 없습니다.</p>
  {:else}
    {#each items as item, i (item.content_id)}
      <RecentWatchCard
        {item}
        isFocused={i === focusedIndex}
        {accentColor}
      />
    {/each}
  {/if}
</div>

<style>
  .watch-row {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    /* 포커스시 transform: scale() 잘림 방지를 위해 넉넉한 패딩 확보 및 보정 여백 추가 */
    padding: 24px 12px 36px;
    margin: -18px -8px -24px;
    scrollbar-width: none;
    align-items: flex-start;
  }

  .watch-row::-webkit-scrollbar {
    display: none;
  }

  .empty-msg {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
