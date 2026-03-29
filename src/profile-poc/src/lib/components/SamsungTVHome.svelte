<script lang="ts">
  import { focusedProfile } from '../stores/profileStore.js';
  import { appStateStore } from '../stores/appStateStore.js';
  import { miniModeStore, openMiniMode } from '../stores/miniModeStore.js';
  import { homeFocusStore } from '../stores/homeNavigationStore.js';
  import { profileRecentApps, profileRecentContents } from '../stores/contentDiscoveryStore.js';
  import { fade, fly, scale } from 'svelte/transition';

  $: profile = $focusedProfile;
  $: focus = $homeFocusStore;
  
  $: apps = $profileRecentApps.length > 0 ? $profileRecentApps : [];
  $: mainContent = $profileRecentContents.length > 0 ? $profileRecentContents[0] : null;
</script>

<div 
  class="home-container" 
  style="
    --profile-accent: {profile.panelAccentColor};
    background: linear-gradient(135deg, #0f0f0f, #121212, {profile.panelAccentColor}15);
  " 
  in:scale={{ duration: 1000, start: 1.2, opacity: 0, easing: t => t * t }} 
  out:fade
>
  <!-- 배경 틴트 레이어 -->
  <div class="background-tint" style="background: radial-gradient(circle at top right, {profile.panelAccentColor}28 0%, transparent 60%);"></div>

  <!-- 로고 및 상단 GNB -->
  <header class="home-header">
    <div class="logo">SAMSUNG</div>
    <button 
      class="user-chip" 
      class:focused={focus.focusedSection === 'header'}
      on:click={openMiniMode}
    >
      <img src={profile.avatarUrl} alt="" />
      <span>{profile.name}</span>
    </button>
  </header>

  <!-- 메인 추천 영역 -->
  <main class="home-main">
    <div class="recommendation-card" in:fly={{ y: 80, delay: 500, duration: 800 }}>
      <p class="tagline" style="color: {profile.panelAccentColor};">Welcome back, {profile.name}!</p>
      <h1>{mainContent ? mainContent.title : '당신을 위한 추천 영화'}</h1>
      <p class="desc">{mainContent && mainContent.subtitle ? mainContent.subtitle : '지금 바로 시청 중이던 콘텐츠를 이어서 감상해 보세요.'}</p>
      <div class="btn-group">
        <button 
          class="btn primary" 
          class:focused={focus.focusedSection === 'hero' && focus.mainBtnIndex === 0}
          style="background: {profile.panelAccentColor}; color: white;"
        >
          지금 시청하기
        </button>
        <button 
          class="btn secondary"
          class:focused={focus.focusedSection === 'hero' && focus.mainBtnIndex === 1}
        >
          상세 정보
        </button>
      </div>
    </div>
  </main>

  <!-- 하단 앱 바 (Launcher) -->
  <footer class="app-launcher" in:fly={{ y: 50, delay: 700, duration: 600 }}>
    {#each apps as app, i (app.id)}
      <div class="app-icon-wrapper" class:focused={focus.focusedSection === 'apps' && i === focus.focusedAppIndex}>
        <div class="app-icon" style="background-color: {app.iconColor};">
          {app.iconInitial || app.name.charAt(0)}
        </div>
        <span class="app-name">{app.name}</span>
      </div>
    {/each}
  </footer>

  <!-- 딥링크 시뮬레이션 오버레이 -->
  {#if $appStateStore.mode === 'deep_link'}
    <div class="deep-link-overlay" transition:fade>
      <div class="loader-box">
        <div class="spinner"></div>
        <p>Connecting to {($appStateStore.deepLinkTarget || '').toUpperCase()}...</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .home-container {
    position: fixed;
    inset: 0;
    transition: background 0.8s ease;
    display: flex;
    flex-direction: column;
    z-index: 100;
    color: white;
    font-family: var(--font-korean);
    padding: 60px 80px;
  }

  .background-tint {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .home-header, .home-main, .app-launcher {
    position: relative;
    z-index: 10;
  }

  .logo {
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    color: #1B4FD8;
  }

  .user-chip {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 6px 16px 6px 6px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: white;
    font-family: inherit;
  }

  .user-chip:hover, .user-chip.focused {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    border-color: white;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  }

  .user-chip img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    background: #333;
  }

  .user-chip span {
    font-weight: 500;
    font-size: 0.95rem;
  }

  .home-main {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .recommendation-card {
    max-width: 600px;
  }
  .tagline {
    font-weight: 700;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 16px;
    line-height: 1.1;
  }
  .desc {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 32px;
  }

  .btn-group {
    display: flex;
    gap: 16px;
  }
  .btn {
    padding: 14px 40px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
  }
  .btn.secondary { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
  
  .btn.focused {
    transform: scale(1.1);
    border-color: white;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.3);
  }

  .app-launcher {
    display: flex;
    gap: 24px;
    padding: 20px 0;
  }

  .app-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .app-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 900;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 3px solid transparent;
  }

  .app-icon-wrapper.focused {
    transform: translateY(-15px);
  }

  .app-icon-wrapper.focused .app-icon {
    transform: scale(1.2);
    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    border-color: white;
  }

  .app-name {
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  .focused .app-name {
    opacity: 1;
    color: white;
  }

  .deep-link-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }
  .loader-box {
    text-align: center;
  }
  .spinner {
    width: 60px;
    height: 60px;
    border: 5px solid rgba(255,255,255,0.1);
    border-top: 5px solid var(--profile-accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
