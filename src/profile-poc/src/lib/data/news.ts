// src/lib/data/news.js
// 프로파일 관심사(interestTags) 기반으로 필터링되는 뉴스 목 데이터

export const NEWS_ITEMS = [
  // ── IT/테크 ────────────────────────────────────────────────
  {
    news_id: 'news_001',
    title: '삼성전자 갤럭시 AI 2026 풀 라인업 공개',
    summary: '삼성전자가 갤럭시 AI 기능을 대폭 강화한 2026년 신제품 라인업을 공개하며 글로벌 시장 공략에 나섰다.',
    category: 'IT/테크',
    source: '네이버뉴스',
    publishedAt: '2026-03-29T09:00:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #1B4FD8, #0A2A7A)',
    url: '#'
  },
  {
    news_id: 'news_002',
    title: 'AI 반도체 경쟁 심화, 엔비디아 vs 삼성',
    summary: 'AI 칩 수요 급증으로 엔비디아와 삼성전자 HBM 경쟁이 본격화되고 있다.',
    category: 'IT/테크',
    source: '조선일보',
    publishedAt: '2026-03-29T07:15:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #0F2027, #203A43)',
    url: '#'
  },
  {
    news_id: 'news_003',
    title: '애플 Vision Pro 2세대 출시 임박',
    summary: '애플이 Vision Pro 2세대를 올 하반기에 출시한다는 소식이 전해지며 AR/VR 시장의 이목이 집중됐다.',
    category: 'IT/테크',
    source: 'ZDNet Korea',
    publishedAt: '2026-03-28T18:30:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #434343, #000000)',
    url: '#'
  },

  // ── 엔터테인먼트 ────────────────────────────────────────────
  {
    news_id: 'news_004',
    title: 'BTS 새 앨범, 글로벌 차트 1위 석권',
    summary: 'BTS의 신보가 발매 첫날 빌보드를 포함한 전세계 50개국 차트 1위를 차지했다.',
    category: '엔터테인먼트',
    source: '연합뉴스',
    publishedAt: '2026-03-29T07:30:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #C0392B, #6E0E0A)',
    url: '#'
  },
  {
    news_id: 'news_005',
    title: '오징어 게임 시즌 3 제작 확정',
    summary: '넷플릭스가 오징어 게임 시즌 3 제작을 공식 발표하며 글로벌 팬들의 기대를 모으고 있다.',
    category: '엔터테인먼트',
    source: '한국경제',
    publishedAt: '2026-03-29T06:00:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #E50914, #8B0000)',
    url: '#'
  },
  {
    news_id: 'news_006',
    title: 'SM엔터테인먼트, 하반기 대규모 신인 데뷔',
    summary: 'SM이 하반기 새 그룹 데뷔를 예고하며 K-pop 팬덤의 관심을 끌고 있다.',
    category: '엔터테인먼트',
    source: '스포츠서울',
    publishedAt: '2026-03-28T22:00:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #8E44AD, #5B2C6F)',
    url: '#'
  },

  // ── 스포츠 ─────────────────────────────────────────────────
  {
    news_id: 'news_007',
    title: 'EPL 손흥민, 시즌 15호 골 기록',
    summary: '토트넘 손흥민이 리그컵에서 멀티골을 터뜨리며 이번 시즌 15호 골을 기록했다.',
    category: '스포츠',
    source: '스포츠코리아',
    publishedAt: '2026-03-29T05:45:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #1A1A2E, #16213E)',
    url: '#'
  },
  {
    news_id: 'news_008',
    title: '한국 야구 대표팀, WBC 준결승 진출',
    summary: '한국 야구 대표팀이 WBC 준결승에 진출하며 전국적인 응원 열기가 뜨거워지고 있다.',
    category: '스포츠',
    source: 'MBC스포츠',
    publishedAt: '2026-03-28T23:30:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #003580, #001F4D)',
    url: '#'
  },

  // ── 경제 ────────────────────────────────────────────────────
  {
    news_id: 'news_009',
    title: '코스피 3,200 돌파, 연중 최고치 경신',
    summary: '반도체·AI 관련주 강세에 힘입어 코스피가 연중 최고치를 경신하며 3,200선을 돌파했다.',
    category: '경제',
    source: '매일경제',
    publishedAt: '2026-03-29T08:30:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #27AE60, #145A32)',
    url: '#'
  },
  {
    news_id: 'news_010',
    title: '한국은행 기준금리 0.25%p 인하',
    summary: '한국은행이 내수 경기 부양을 위해 기준금리를 0.25%p 인하하기로 결정했다.',
    category: '경제',
    source: '한국경제',
    publishedAt: '2026-03-28T16:00:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #E67E22, #B7470A)',
    url: '#'
  },

  // ── 생활/건강 ───────────────────────────────────────────────
  {
    news_id: 'news_011',
    title: '봄철 황사 대비 건강 관리법',
    summary: '황사와 미세먼지가 심해지는 봄철, 건강을 지키기 위한 생활 수칙을 전문가가 소개했다.',
    category: '생활/건강',
    source: '헬스조선',
    publishedAt: '2026-03-29T06:30:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #56ab2f, #a8e063)',
    url: '#'
  },
  {
    news_id: 'news_012',
    title: '2026 서울 벚꽃 개화 예보',
    summary: '기상청이 2026년 서울 벚꽃 개화일을 4월 2일로 예보하며 나들이 명소가 주목받고 있다.',
    category: '생활/건강',
    source: '기상청',
    publishedAt: '2026-03-29T07:00:00+09:00',
    thumbnail_gradient: 'linear-gradient(135deg, #f953c6, #b91d73)',
    url: '#'
  }
];

// 카테고리 목록
export const NEWS_CATEGORIES = ['IT/테크', '엔터테인먼트', '스포츠', '경제', '생활/건강'];
