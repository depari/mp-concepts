<!-- src/lib/components/NewsCard.svelte -->
<!-- 뉴스 카드: 썸네일(좌) + 본문(우) 레이아웃 -->
<script lang="ts">
  export let item;
  export let isFocused = false;

  function formatRelative(isoStr: string | number | Date) {
    const diff = Math.floor((Date.now() - new Date(isoStr).getTime()) / 60000); // 분 단위
    if (diff < 60)   return `${diff}분 전`;
    if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
    return `${Math.floor(diff / 1440)}일 전`;
  }
</script>

<div class="news-card" class:focused={isFocused}>
  <!-- 썸네일 + 카테고리 배지 -->
  <div class="news-thumb" style="background: {item.thumbnail_gradient};">
    <span class="news-category">{item.category}</span>
  </div>

  <!-- 본문 -->
  <div class="news-body">
    <p class="news-title">{item.title}</p>
    <p class="news-summary">{item.summary}</p>
    <div class="news-meta">
      <span class="news-source">{item.source}</span>
      <span class="news-sep">·</span>
      <span class="news-time">{formatRelative(item.publishedAt)}</span>
    </div>
  </div>
</div>

<style>
  .news-card {
    flex: 0 0 320px;
    display: flex;
    gap: 0;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .news-card.focused {
    transform: translateY(-6px) scale(1.03);
    border-color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45);
  }

  /* 썸네일 */
  .news-thumb {
    width: 110px;
    flex-shrink: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    min-height: 110px;
  }

  .news-category {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    border-radius: 4px;
    padding: 3px 7px;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.9);
    font-family: var(--font-primary, 'Poppins', sans-serif);
  }

  /* 본문 */
  .news-body {
    flex: 1;
    padding: 14px 14px 14px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0; /* text-overflow 정상 동작 */
  }

  .news-title {
    font-size: 0.9rem;
    font-weight: 700;
    margin: 0;
    color: white;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
    line-height: 1.4;
  }

  .news-summary {
    font-size: 0.73rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
    line-height: 1.5;
  }

  .news-meta {
    display: flex;
    gap: 5px;
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.35);
    margin-top: auto;
    font-family: var(--font-korean, 'Noto Sans KR', sans-serif);
    align-items: center;
  }

  .news-source {
    font-weight: 600;
  }

  .news-sep {
    opacity: 0.5;
  }
</style>
