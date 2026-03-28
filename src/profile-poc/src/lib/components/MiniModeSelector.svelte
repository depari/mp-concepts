<script>
  import { activeProfiles, focusedIndex } from '../stores/profileStore.js';
  import { miniModeStore, toggleMiniMode } from '../stores/miniModeStore.js';
  import { fly, fade } from 'svelte/transition';

  $: profiles = $activeProfiles;
</script>

{#if $miniModeStore.isActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="mini-overlay" transition:fade={{ duration: 200 }} on:click={toggleMiniMode}>
    <div class="mini-bar" transition:fly={{ y: 100, duration: 400 }} on:click|stopPropagation>
      <div class="mini-header">
        <span class="mini-title">Switching Profile (Mini Mode)</span>
        <button class="close-btn" on:click={toggleMiniMode} aria-label="Close">✕</button>
      </div>
      <div class="mini-profiles">
        {#each profiles as profile, i (profile.id)}
          <button 
            class="mini-profile-item" 
            class:active={i === $focusedIndex}
            on:click={() => {
              focusedIndex.set(i);
            }}
          >
            <div class="mini-avatar" style="border-color: {i === $focusedIndex ? profile.panelAccentColor : 'transparent'}">
              <img src={profile.avatarUrl} alt={profile.name} class:grayscale={i !== $focusedIndex}/>
            </div>
            <span class="mini-name" style="color: {i === $focusedIndex ? '#fff' : '#888'}">{profile.name}</span>
          </button>
        {/each}
      </div>
      <div class="mini-hint">Press 'M' to toggle Mini Mode, arrow keys to navigate.</div>
    </div>
  </div>
{/if}

<style>
  .mini-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .mini-bar {
    background: rgba(20, 20, 20, 0.85);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 24px 60px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .mini-header {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: var(--font-primary);
  }
  .mini-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
  }
  .close-btn {
    background: none;
    border: none;
    color: #888;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  .close-btn:hover { color: white; }
  
  .mini-profiles {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    width: 100%;
    max-width: 800px;
    justify-content: center;
    padding: 10px 0;
  }
  .mini-profile-item {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .mini-profile-item:hover, .mini-profile-item.active {
    transform: translateY(-8px) scale(1.1);
  }
  .mini-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 3px solid;
    overflow: hidden;
    background: #2a2a2a;
    transition: border-color 0.3s;
  }
  .mini-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s;
  }
  .grayscale { filter: grayscale(100%) brightness(0.6); }
  .mini-name {
    font-family: var(--font-primary);
    font-size: 0.85rem;
    font-weight: 500;
  }
  .mini-hint {
    font-family: var(--font-primary);
    font-size: 0.75rem;
    color: #555;
    margin-top: 10px;
  }
</style>
