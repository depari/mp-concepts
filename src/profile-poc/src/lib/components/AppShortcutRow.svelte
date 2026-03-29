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
    padding: 8px 4px 12px;
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
