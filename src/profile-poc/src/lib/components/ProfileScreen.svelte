<script>
  import { activeProfiles, focusedIndex, navigate } from '../stores/profileStore.js';
  import ProfilePanel from './ProfilePanel.svelte';

  // 패널 ref 배열 — Enter 키 전달용
  let panelRefs = [];

  export function handleEnter() {
    panelRefs[$focusedIndex]?.activateContents();
  }

  $: $activeProfiles, (panelRefs = panelRefs);
</script>

<section class="profile-screen" aria-label="프로파일 선택">
  {#each $activeProfiles as profile, i (profile.id)}
    <ProfilePanel
      {profile}
      isFocused={i === $focusedIndex}
      bind:this={panelRefs[i]}
      on:click={() => focusedIndex.set(i)}
    />
  {/each}
</section>

<style>
  .profile-screen {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: var(--bg-base);
    gap: 1px;
    transition: background 0.5s ease;
  }
</style>
