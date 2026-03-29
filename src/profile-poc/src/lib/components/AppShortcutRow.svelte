<!-- src/lib/components/AppShortcutRow.svelte -->
<!-- 최근 실행 앱 가로 스크롤 행 -->
<script lang="ts">
  import AppShortcutCard from './AppShortcutCard.svelte';

  export let apps: any[] = [];
  export let focusedIndex: number = -1;
</script>

<div class="app-row">
  {#if apps.length === 0}
    <p class="empty-msg">최근 실행 앱이 없습니다.</p>
  {:else}
    {#each apps as app, i (app.id)}
      <AppShortcutCard
        {app}
        isFocused={i === focusedIndex}
      />
    {/each}
  {/if}
</div>

<style>
  .app-row {
    display: flex;
    gap: 20px;
    align-items: flex-end;
    /* 포커스시 transform: scale() 잘림 방지를 위해 넉넉한 패딩 확보 */
    padding: 24px 12px 36px;
    margin: -16px -8px -24px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .app-row::-webkit-scrollbar {
    display: none;
  }

  .empty-msg {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
