<script>
  import { activeProfiles, focusedIndex } from '../stores/profileStore.js';
  import ProfilePanel from './ProfilePanel.svelte';
  import ProfileDashboard from './ProfileDashboard.svelte';
  import { resetDashboard } from '../stores/interactionStore.js';
  import { fetchPreviewContent } from '../stores/previewContentStore.js';

  let panels = [];

  export function handleEnter() {
    if (panels[$focusedIndex]) {
      panels[$focusedIndex].handleEnter();
    }
  }

  // 패널 너비 설정 (vw)
  const UNFOCUSED_WIDTH_VW = 12;
  const FOCUSED_WIDTH_VW = 44;

  // 포커스된 패널이 항상 화면 중앙(50vw)에 오도록 x축 오프셋 계산
  $: offsetVw = 50 - ($focusedIndex * UNFOCUSED_WIDTH_VW + FOCUSED_WIDTH_VW / 2);

  // Focus 변경 감지 시 타이머 리셋 및 데이터 패치
  $: {
    const currentProfileId = $activeProfiles[$focusedIndex]?.id;
    if (currentProfileId) {
      resetDashboard();
      fetchPreviewContent(currentProfileId);
    }
  }
</script>

<div class="screen-wrapper">
  <section
    class="profile-row"
    aria-label="프로파일 선택"
    style="transform: translateX({offsetVw}vw);"
  >
    {#each $activeProfiles as profile, i (profile.id)}
      <ProfilePanel
        {profile}
        isFocused={i === $focusedIndex}
        bind:this={panels[i]}
        on:click={() => focusedIndex.set(i)}
      />
    {/each}
  </section>

  {#if $activeProfiles[$focusedIndex]}
    <ProfileDashboard profile={$activeProfiles[$focusedIndex]} />
  {/if}
</div>

<style>
  .screen-wrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: var(--bg-base);
    transition: background 0.5s ease;
  }

  .profile-row {
    display: flex;
    height: 100vh;
    width: max-content;
    gap: var(--panel-gap, 1px);
    transition: transform var(--panel-transition);
    will-change: transform;
  }
</style>
