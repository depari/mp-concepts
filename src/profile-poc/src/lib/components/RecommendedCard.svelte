<!-- src/lib/components/RecommendedCard.svelte -->
<!-- 추천 컨텐츠 카드 -->
<script lang="ts">
  export let item: any;
  export let isFocused: boolean = false;
</script>

<div class="rec-card" class:focused={isFocused}>
  <!-- 썸네일 -->
  <div class="card-thumb" style="background: {item.thumbnail_gradient};">
    {#if item.thumbnail_url}
      <img src={item.thumbnail_url} alt={item.title} loading="lazy" />
    {/if}
    <!-- 추천 이유 배지 -->
    <span class="reason-badge">{item.reason}</span>
    <!-- 평점 -->
    <span class="rating-badge">⭐ {item.rating}</span>
  </div>

  <!-- 카드 정보 -->
  <div class="card-info">
    <span class="provider-badge">{item.provider_label}</span>
    <p class="card-title">{item.title}</p>
    <p class="card-genre">{item.genre.join(' · ')}</p>
  </div>
</div>

<style>
  .rec-card {
    flex: 0 0 220px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .rec-card.focused {
    transform: translateY(-8px) scale(1.05);
    border-color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  /* 썸네일 */
  .card-thumb {
    position: relative;
    height: 130px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
  }

  .card-thumb img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .reason-badge {
    position: relative;
    z-index: 1;
    display: inline-block;
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    border-radius: 4px;
    padding: 3px 7px;
    color: rgba(255, 255, 255, 0.9);
    font-family: var(--font-primary, 'Poppins', sans-serif);
    align-self: flex-start;
  }

  .rating-badge {
    position: relative;
    z-index: 1;
    align-self: flex-end;
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    font-family: var(--font-primary, 'Poppins', sans-serif);
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }

  /* 카드 정보 */
  .card-info {
    padding: 10px 12px;
  }

  .provider-badge {
    display: inline-block;
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    background: rgba(255, 255, 255, 0.15);
    padding: 2px 7px;
    border-radius: 4px;
    margin-bottom: 7px;
    color: rgba(255, 255, 255, 0.8);
    font-family: var(--font-primary, 'Poppins', sans-serif);
  }

  .card-title {
    font-size: 0.9rem;
    font-weight: 700;
    margin: 0 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
  }

  .card-genre {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
  }
</style>
