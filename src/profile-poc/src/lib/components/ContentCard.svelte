<script>
  export let title = '';
  export let episode = '';
  export let progress = 0;
  export let thumbnailGradient = 'linear-gradient(135deg, #1a1a2e, #16213e)';
</script>

<div class="content-card">
  <div class="card__thumb" style="background: {thumbnailGradient};">
    <div class="card__play">▶</div>
  </div>
  <div class="card__info">
    <p class="card__title">{title}</p>
    <p class="card__episode">{episode}</p>
    <div class="card__progress-track">
      <div class="card__progress-fill" style="width: {progress * 100}%;"></div>
    </div>
    <p class="card__time">{Math.round((1 - progress) * 100)}% 남음</p>
  </div>
</div>

<style>
  .content-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    animation: fadeInUp 0.35s ease both;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
    min-width: 180px;
  }

  .content-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.1);
  }

  .card__thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .card__play {
    font-size: 1.6rem;
    color: rgba(255, 255, 255, 0.8);
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
  }

  .card__info {
    padding: 10px 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .card__title {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--font-korean);
  }

  .card__episode {
    font-size: 0.72rem;
    color: var(--text-secondary);
    font-family: var(--font-korean);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card__progress-track {
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
    margin-top: 6px;
    overflow: hidden;
  }

  .card__progress-fill {
    height: 100%;
    background: #4FC3F7;
    border-radius: 2px;
    transition: width 0.8s ease;
  }

  .card__time {
    font-size: 0.68rem;
    color: var(--text-hint);
    margin-top: 2px;
  }
</style>
