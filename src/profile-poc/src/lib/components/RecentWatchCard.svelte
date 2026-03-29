<!-- src/lib/components/RecentWatchCard.svelte -->
<!-- 이어보기 컨텐츠 카드 (진행률 바 포함) -->
<script lang="ts">
  export let item;
  export let isFocused = false;
  export let accentColor = '#ffffff';
</script>

<div class="watch-card" class:focused={isFocused}>
  <!-- 썸네일 영역 -->
  <div class="card-thumb" style="background: {item.thumbnail_gradient};">
    {#if item.thumbnail_url}
      <img src={item.thumbnail_url} alt={item.title} loading="lazy" />
    {/if}

    <!-- 포커스 시 재생 오버레이 -->
    {#if isFocused}
      <div class="play-overlay">
        <div class="play-btn">▶</div>
      </div>
    {/if}

    <!-- 진행률 바 -->
    <div class="progress-track">
      <div
        class="progress-fill"
        style="width: {item.progress}%; background: {accentColor};"
      ></div>
    </div>
  </div>

  <!-- 카드 정보 -->
  <div class="card-info">
    <span class="provider-badge">{item.provider_label}</span>
    <p class="card-title">{item.title}</p>
    <p class="card-subtitle">{item.subtitle}</p>
    <p class="card-progress" style="color: {accentColor};">{item.progress}% 시청</p>
  </div>
</div>

<style>
  .watch-card {
    flex: 0 0 260px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .watch-card.focused {
    transform: translateY(-8px) scale(1.04);
    border-color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  /* 썸네일 */
  .card-thumb {
    position: relative;
    height: 148px;
    overflow: hidden;
  }

  .card-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 재생 오버레이 */
  .play-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease;
  }

  .play-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border: 2px solid rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    padding-left: 3px; /* 시각적 중앙 보정 */
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* 진행률 바 */
  .progress-track {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.2);
  }

  .progress-fill {
    height: 100%;
    transition: width 0.6s ease;
    border-radius: 0 1px 1px 0;
  }

  /* 카드 정보 */
  .card-info {
    padding: 12px 14px;
  }

  .provider-badge {
    display: inline-block;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: rgba(255, 255, 255, 0.15);
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.85);
    font-family: var(--font-primary, 'Poppins', sans-serif);
  }

  .card-title {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
  }

  .card-subtitle {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.55);
    margin: 0 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
  }

  .card-progress {
    font-size: 0.72rem;
    font-weight: 600;
    margin: 0;
    font-family: var(--font-primary, 'Poppins', sans-serif);
    opacity: 0.85;
  }
</style>
