<script>
  import { isPowerOn, togglePower } from '../stores/tvPowerStore.js';
  import { exitHome } from '../stores/appStateStore.js';
  import { fade } from 'svelte/transition';

  function handlePowerClick() {
    // 꺼진 상태에서 켜는 경우 항상 프로필 선택 화면(Full Mode)으로
    if (!$isPowerOn) {
      exitHome();
    }
    togglePower();
  }
</script>

<button 
  class="floating-power-btn" 
  class:is-on={$isPowerOn}
  on:click={handlePowerClick}
  title="TV Power (P)"
>
  <span class="p-icon">⏻</span>
</button>

<style>
  .floating-power-btn {
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 10000; /* 최상단 레이어 */
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(20, 20, 20, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    color: #ff4d4d;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .floating-power-btn:hover {
    transform: scale(1.1);
    background: rgba(40, 40, 40, 0.9);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .floating-power-btn.is-on {
    color: #2ecc71;
    border-color: rgba(46, 204, 113, 0.4);
    box-shadow: 0 0 20px rgba(46, 204, 113, 0.2);
  }

  .p-icon {
    font-size: 1.8rem;
  }
</style>
