<script lang="ts">
  export let profile: any;
  export let isFocused: boolean = false;

  function handleError(e: Event) {
    const target = e.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
</script>

<div class="avatar-wrapper" class:focused={isFocused}>
  {#if profile.avatarUrl}
    <img
      class="avatar-img"
      src={profile.avatarUrl}
      alt="{profile.name} 아바타"
      loading="lazy"
      on:error={handleError}
    />
  {/if}
  <!-- 아바타 없을 때 폴백: 이니셜 -->
  <div
    class="avatar-fallback"
    style="background: {profile.panelAccentColor}22; color: {profile.panelAccentColor};"
  >
    {profile.name.charAt(0)}
  </div>
</div>

<style>
  .avatar-wrapper {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    max-width: 480px;
    height: 88%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    pointer-events: none;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top center;
    filter: var(--unfocused-filter);
    transition: filter var(--panel-transition);
    display: block;
    position: relative;
    z-index: 1;
  }

  .focused .avatar-img {
    filter: none;
  }

  .avatar-fallback {
    position: absolute;
    bottom: 15%;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 700;
    font-family: var(--font-primary);
    border: 2px solid currentColor;
    opacity: 0.6;
  }

  .focused .avatar-fallback {
    opacity: 1;
  }
</style>
