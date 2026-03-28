<script>
  import { fade, fly } from 'svelte/transition';
  import { previewContentStore } from '../stores/previewContentStore.js';
  import { interactionStore } from '../stores/interactionStore.js';

  export let profile;

  $: active = $interactionStore.isDashboardActive;
  $: loading = $previewContentStore.loading;
  $: data = $previewContentStore.data;
</script>

{#if active}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="dashboard-overlay" in:fade={{ duration: 400 }} out:fade={{ duration: 300 }}>
    <div class="dashboard-content">
      <h2 class="dashboard-title" in:fly={{ y: -20, delay: 200, duration: 400 }}>
        Welcome back, {profile.name}
      </h2>

      {#if loading}
        <div class="loader" in:fade>Loading your content...</div>
      {:else if data.length > 0}
        <div class="content-grid">
          {#each data as item, index (item.content_id)}
            <div 
              class="content-card" 
              in:fly={{ y: 30, delay: 300 + index * 100, duration: 400 }}
            >
              <div class="card-image">
                <img src={item.thumbnail_url} alt={item.title} />
                {#if item.progress}
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: {item.progress}%;"></div>
                  </div>
                {/if}
              </div>
              <div class="card-info">
                <span class="provider-badge">{item.provider_id}</span>
                <p class="card-title">{item.title}</p>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="no-content">No preview content available.</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .dashboard-overlay {
    position: fixed;
    inset: 0;
    z-index: 50; /* Above profile row, below header */
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 5vw 10vh;
  }

  .dashboard-content {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    color: white;
  }

  .dashboard-title {
    font-size: 2.5rem;
    font-family: var(--font-primary);
    margin-bottom: 2rem;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  }

  .content-grid {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    padding-bottom: 20px;
    scrollbar-width: none; /* Firefox */
  }

  .content-grid::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  .content-card {
    flex: 0 0 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .content-card:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .card-image {
    position: relative;
    width: 100%;
    height: 168px;
    background: #111;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
  }

  .progress-fill {
    height: 100%;
    background: #E50914; /* Netflix red default */
  }

  .card-info {
    padding: 16px;
  }

  .provider-badge {
    display: inline-block;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .loader, .no-content {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.6);
  }
</style>
