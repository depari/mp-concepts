<script>
  import { activeProfiles, focusedIndex } from '../stores/profileStore.js';
  import { miniModeStore, toggleMiniMode, setMiniModePosition } from '../stores/miniModeStore.js';
  import { appStateStore, exitHome, enterHome } from '../stores/appStateStore.js';
  import { fly, fade } from 'svelte/transition';

  $: profiles = $activeProfiles;
  $: pos = $miniModeStore.position || 'bottom';

  function getFlyParams(position) {
    if (position === 'top') return { y: -100, duration: 400 };
    if (position === 'left') return { x: -100, duration: 400 };
    if (position === 'right') return { x: 100, duration: 400 };
    return { y: 100, duration: 400 };
  }

  function handleFullMode() {
    exitHome();
    toggleMiniMode();
  }
</script>

{#if $miniModeStore.isActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="mini-overlay pos-{pos}" transition:fade={{ duration: 200 }} on:click={toggleMiniMode}>
    {#key pos}
    <div class="mini-bar {pos}" in:fly={getFlyParams(pos)} out:fade={{duration: 200}} on:click|stopPropagation>
      <div class="mini-header">
        <div class="header-left">
          <span class="mini-title">Switch Profile</span>
          <button class="full-view-btn" on:click={handleFullMode}>Full Mode ↗</button>
        </div>
        <div class="controls">
          <button class="pos-btn" class:pos-active={pos==='top'} on:click={() => setMiniModePosition('top')}>T</button>
          <button class="pos-btn" class:pos-active={pos==='left'} on:click={() => setMiniModePosition('left')}>L</button>
          <button class="pos-btn" class:pos-active={pos==='right'} on:click={() => setMiniModePosition('right')}>R</button>
          <button class="pos-btn" class:pos-active={pos==='bottom'} on:click={() => setMiniModePosition('bottom')}>B</button>
          <span class="div-line">|</span>
          <button class="close-btn" on:click={toggleMiniMode} aria-label="Close">✕</button>
        </div>
      </div>
      
      <div class="mini-profiles {pos}">
        {#each profiles as profile, i (profile.id)}
          <button 
            class="mini-profile-item {pos}" 
            class:active={i === $focusedIndex}
            on:click={() => {
              focusedIndex.set(i);
              enterHome();
              toggleMiniMode();
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
    {/key}
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
  }

  /* Overlay Flex Direction */
  .mini-overlay.pos-bottom { flex-direction: column; justify-content: flex-end; }
  .mini-overlay.pos-top { flex-direction: column; justify-content: flex-start; }
  .mini-overlay.pos-left { flex-direction: row; justify-content: flex-start; }
  .mini-overlay.pos-right { flex-direction: row; justify-content: flex-end; }

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .full-view-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 0.72rem;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-family: var(--font-primary);
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }

  .full-view-btn:hover {
    background: white;
    color: black;
    border-color: white;
  }

  /* Bar Layout */
  .mini-bar {
    background: rgba(20, 20, 20, 0.85);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* Horizontal Modes (Top / Bottom) */
  .mini-bar.bottom, .mini-bar.top {
    flex-direction: column;
    width: 100%;
    padding: 24px 60px 40px;
  }
  .mini-bar.bottom { border-top: 1px solid rgba(255,255,255,0.08); }
  .mini-bar.top { border-bottom: 1px solid rgba(255,255,255,0.08); }

  /* Vertical Modes (Left / Right) */
  .mini-bar.left, .mini-bar.right {
    flex-direction: column;
    height: 100vh;
    width: 280px;
    padding: 40px 20px;
    justify-content: flex-start;
  }
  .mini-bar.left { border-right: 1px solid rgba(255,255,255,0.08); }
  .mini-bar.right { border-left: 1px solid rgba(255,255,255,0.08); }

  .mini-header {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: var(--font-primary);
  }

  .left .mini-header, .right .mini-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .mini-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
  }

  .controls {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .pos-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid transparent;
    color: #bbb;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;
  }
  .pos-btn:hover { background: rgba(255, 255, 255, 0.2); color: white; }
  .pos-btn.pos-active {
    background: #007AFF;
    color: white;
    border-color: #007AFF;
  }

  .div-line { color: rgba(255, 255, 255, 0.2); margin: 0 4px; }

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
    width: 100%;
    max-width: 800px;
    justify-content: center;
  }
  
  /* Layout for profiles based on Bar Mode */
  .mini-profiles.bottom, .mini-profiles.top {
    flex-direction: row;
    overflow-x: auto;
    padding: 24px 10px 10px;
  }

  .mini-profiles.left, .mini-profiles.right {
    flex-direction: column;
    overflow-y: auto;
    justify-content: flex-start;
    padding: 10px 24px 10px 10px;
    height: 100%;
    margin-top: 20px;
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

  /* Hover directions */
  .mini-profile-item.bottom:hover, .mini-profile-item.bottom.active { transform: translateY(-8px) scale(1.1); }
  .mini-profile-item.top:hover, .mini-profile-item.top.active { transform: translateY(8px) scale(1.1); }
  .mini-profile-item.left:hover, .mini-profile-item.left.active { transform: translateX(8px) scale(1.1); }
  .mini-profile-item.right:hover, .mini-profile-item.right.active { transform: translateX(-8px) scale(1.1); }

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
    margin-top: auto;
  }
</style>
