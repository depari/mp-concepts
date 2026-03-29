<!-- src/lib/components/AppShortcutCard.svelte -->
<!-- 최근 실행 앱 아이콘 카드 -->
<script lang="ts">
  export let app;
  export let isFocused = false;
</script>

<div class="app-card" class:focused={isFocused}>
  <div
    class="app-icon"
    style="
      background: {app.iconColor};
      box-shadow: {isFocused ? `0 0 20px ${app.iconColor}88, 0 8px 24px rgba(0,0,0,0.5)` : '0 4px 12px rgba(0,0,0,0.4)'};
      border-color: {isFocused ? 'rgba(255,255,255,0.9)' : 'transparent'};
    "
  >
    {app.iconInitial}
  </div>
  <span class="app-name">{app.name}</span>
</div>

<style>
  .app-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
    width: 88px;
  }

  .app-card.focused {
    transform: translateY(-10px) scale(1.1);
  }

  .app-icon {
    width: 68px;
    height: 68px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 900;
    color: white;
    border: 2.5px solid transparent;
    transition:
      border-color 0.2s ease,
      box-shadow 0.3s ease;
    font-family: var(--font-primary, 'Poppins', sans-serif);
  }

  .app-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    transition: color 0.2s ease;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
    white-space: nowrap;
  }

  .app-card.focused .app-name {
    color: rgba(255, 255, 255, 1);
  }
</style>
