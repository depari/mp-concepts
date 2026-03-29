<!-- src/lib/components/NewsCardRow.svelte -->
<!-- 뉴스 카드 가로 스크롤 행 -->
<script lang="ts">
  import NewsCard from './NewsCard.svelte';

  export let items = [];
  export let focusedIndex = -1;
</script>

<div class="news-row">
  {#if items.length === 0}
    <p class="empty-msg">추천 뉴스가 없습니다.</p>
  {:else}
    {#each items as item, i (item.news_id)}
      <NewsCard
        {item}
        isFocused={i === focusedIndex}
      />
    {/each}
  {/if}
</div>

<style>
  .news-row {
    display: flex;
    gap: 18px;
    overflow-x: auto;
    /* 포커스 클리핑 방지 패딩/마진 확보 */
    padding: 40px 20px 60px;
    margin: -30px -15px -50px;
    scrollbar-width: none;
    align-items: stretch;
  }

  .news-row::-webkit-scrollbar {
    display: none;
  }

  .empty-msg {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
