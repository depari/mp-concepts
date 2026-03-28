<script>
  import { focusedProfile } from '../stores/profileStore.js';
  import { appStateStore, exitHome } from '../stores/appStateStore.js';
  import { miniModeStore, openMiniMode } from '../stores/miniModeStore.js';
  import { fade, fly, scale } from 'svelte/transition';
  import { onMount } from 'svelte';

  $: profile = $focusedProfile;

  let focusedAppIndex = 2; // 기본 'TV Plus' 포커스

  const mockApps = [
    { id: 'netflix', name: 'Netflix', color: '#E50914' },
    { id: 'youtube', name: 'YouTube', color: '#FF0000' },
    { id: 'samsung-tv-plus', name: 'TV Plus', color: '#1B4FD8' },
    { id: 'tving', name: 'TVING', color: '#FF153C' },
    { id: 'disney', name: 'Disney+', color: '#0063E5' },
    { id: 'prime', name: 'Prime Video', color: '#00A8E1' }
  ];

  function handleKeydown(e) {
    if ($miniModeStore.isActive) return; // 미니 모드일 때는 홈 화면 조작 방지

    if (e.key === 'ArrowLeft') {
      focusedAppIndex = Math.max(0, focusedAppIndex - 1);
    } else if (e.key === 'ArrowRight') {
      focusedAppIndex = Math.min(mockApps.length - 1, focusedAppIndex + 1);
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
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
    <button class="user-chip" on:click={openMiniMode}>
      <img src={profile.avatarUrl} alt="" />
      <span>{profile.name}</span>
    </button>
  </header>

  <!-- 메인 추천 영역 -->
  <main class="home-main">
    <div class="recommendation-card" in:fly={{ y: 80, delay: 500, duration: 800 }}>
      <p class="tagline" style="color: {profile.panelAccentColor};">Welcome back, {profile.name}!</p>
      <h1>{profile.id === 'profile_1' ? '이번 주 인기 오리지널' : '당신을 위한 추천 영화'}</h1>
      <p class="desc">지금 바로 시청 중이던 콘텐츠를 이어서 감상해 보세요.</p>
      <div class="btn-group">
        <button class="btn primary" style="background: {profile.panelAccentColor}; color: white;">지금 시청하기</button>
        <button class="btn secondary">상세 정보</button>
      </div>
    </div>
  </main>

  <!-- 하단 앱 바 (Launcher) -->
  <footer class="app-launcher" in:fly={{ y: 50, delay: 700, duration: 600 }}>
    {#each mockApps as app, i (app.id)}
      <div class="app-icon-wrapper" class:focused={i === focusedAppIndex}>
        <div class="app-icon" style="background-color: {app.id === 'samsung-tv-plus' ? profile.panelAccentColor : app.color};">
          {app.name.charAt(0)}
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

  .user-chip:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
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
    color: var(--profile-accent);
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
    transition: all 0.3s;
  }
  .btn.primary { background: white; color: black; }
  .btn.secondary { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
  .btn:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.4); }

  .app-launcher {
    display: flex;
    gap: 24px;
    padding: 20px 0;
  }

  .app-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
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
    transition: all 0.3s;
  }
  .app-icon-wrapper:hover .app-icon {
    transform: scale(1.15) translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    border: 3px solid white;
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
