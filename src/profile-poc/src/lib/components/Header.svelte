<script>
  import { togglePocPanel } from '../stores/pocConfigStore.js';
</script>

<header class="header">
  <!-- 로고 (좌) -->
  <div class="header__logo" aria-label="서비스 로고">
    <span class="logo-text">SAMSUNG</span>
  </div>

  <!-- 타이틀 (중앙) -->
  <h1 class="header__title">Who's Watching?</h1>

  <!-- 관리 버튼 (우) -->
  <button class="header__manage-btn" on:click={togglePocPanel} aria-label="프로파일 관리">
    Manage Profiles
  </button>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height, 72px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    z-index: var(--z-header, 100);
    background: var(--header-bg, transparent);
    pointer-events: none;
  }

  .header__logo,
  .header__title,
  .header__manage-btn {
    pointer-events: auto;
  }

  .header__logo {
    flex: 1;
  }

  .logo-text {
    font-family: var(--font-primary);
    font-size: 1.5rem;
    font-weight: 800;
    color: #1B4FD8;
    letter-spacing: 0.12em;
    text-shadow: 0 1px 8px rgba(27, 79, 216, 0.5);
  }

  .header__title {
    font-family: var(--font-primary);
    font-size: clamp(1rem, 2.2vw, 1.6rem);
    font-weight: 600;
    color: var(--text-primary);
    text-align: center;
    flex: 2;
    letter-spacing: 0.01em;
    text-shadow: 0 1px 12px rgba(0,0,0,0.5);
  }

  .header__manage-btn {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    font-family: var(--font-primary);
    font-size: 0.85rem;
    font-weight: 600;
    color: #ffffff;
    background: #E50914;
    padding: 10px 20px;
    border-radius: 6px;
    letter-spacing: 0.03em;
    transition: background var(--transition-fast), transform var(--transition-fast);
    cursor: pointer;
    width: fit-content;
  }

  .header__manage-btn:hover {
    background: #f40612;
    transform: scale(1.03);
  }
</style>
