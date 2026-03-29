// src/lib/data/profiles.js
// 최대 7개 프로파일 풀 — profileCount에 따라 slice하여 사용

export const PROFILES = [
  {
    id: 'profile_1',
    name: '지은',
    gradient: 'linear-gradient(to bottom, #F8BBD0 0%, #F06292 100%)',
    panelAccentColor: '#F06292',
    avatarUrl: '/avatars/avatar_1.png',
    avatarFallbackColor: '#F06292',

    // ── 최근 실행 앱 ──────────────────────────────────────────
    recentApps: [
      { id: 'netflix', name: 'Netflix', iconColor: '#E50914', iconInitial: 'N', lastUsedAt: '2026-03-29T10:30:00+09:00', deepLinkId: 'netflix' },
      { id: 'tving', name: 'TVING', iconColor: '#FF153C', iconInitial: 'T', lastUsedAt: '2026-03-29T08:10:00+09:00', deepLinkId: 'tving' },
      { id: 'disney', name: 'Disney+', iconColor: '#0063E5', iconInitial: 'D', lastUsedAt: '2026-03-28T22:00:00+09:00', deepLinkId: 'disney' },
      { id: 'youtube', name: 'YouTube', iconColor: '#FF0000', iconInitial: 'Y', lastUsedAt: '2026-03-28T18:30:00+09:00', deepLinkId: 'youtube' }
    ],

    // ── 최근 시청 컨텐츠 ──────────────────────────────────────
    recentContents: [
      {
        content_id: 'rc_1_1',
        title: '오징어 게임',
        subtitle: 'S2 EP.5 - 둥글게 둥글게',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #E50914, #8B0000)',
        progress: 72,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-29T10:00:00+09:00',
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rc_1_2',
        title: '이상한 변호사 우영우',
        subtitle: 'EP.8 - 돌고래 소송',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #42A5F5, #0D47A1)',
        progress: 45,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-28T21:30:00+09:00',
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rc_1_3',
        title: '환혼',
        subtitle: 'EP.12 - 불꽃',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #FF8A80, #D32F2F)',
        progress: 88,
        provider_id: 'tving',
        provider_label: 'TVING',
        lastWatchedAt: '2026-03-27T23:00:00+09:00',
        deepLinkId: 'tving'
      }
    ],

    // ── 추천 컨텐츠 ───────────────────────────────────────────
    recommendedContents: [
      {
        content_id: 'rec_1_1',
        title: '더 글로리',
        genre: ['드라마', '복수'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #1A1A2E, #16213E)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '시청 이력 기반',
        rating: 9.1,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_1_2',
        title: '무빙',
        genre: ['액션', '슈퍼히어로'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #0F2027, #203A43)',
        provider_id: 'disney',
        provider_label: 'Disney+',
        reason: '인기 급상승',
        rating: 9.3,
        deepLinkId: 'disney'
      },
      {
        content_id: 'rec_1_3',
        title: '나의 해방일지',
        genre: ['드라마', '힐링'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #348F50, #56B4D3)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '장르 매칭',
        rating: 8.8,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_1_4',
        title: '이태원 클라쓰',
        genre: ['드라마', '성장'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #F8BBD0, #F06292)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '장르 매칭',
        rating: 8.5,
        deepLinkId: 'netflix'
      }
    ],

    // ── 관심사 태그 (뉴스 필터링) ─────────────────────────────
    interestTags: ['엔터테인먼트', '생활/건강']
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'profile_2',
    name: '민준',
    gradient: 'linear-gradient(to bottom, #BBDEFB 0%, #42A5F5 100%)',
    panelAccentColor: '#42A5F5',
    avatarUrl: '/avatars/avatar_2.png',
    avatarFallbackColor: '#42A5F5',

    recentApps: [
      { id: 'youtube', name: 'YouTube', iconColor: '#FF0000', iconInitial: 'Y', lastUsedAt: '2026-03-29T11:00:00+09:00', deepLinkId: 'youtube' },
      { id: 'prime', name: 'Prime Video', iconColor: '#00A8E1', iconInitial: 'P', lastUsedAt: '2026-03-29T09:30:00+09:00', deepLinkId: 'prime' },
      { id: 'netflix', name: 'Netflix', iconColor: '#E50914', iconInitial: 'N', lastUsedAt: '2026-03-28T20:00:00+09:00', deepLinkId: 'netflix' }
    ],

    recentContents: [
      {
        content_id: 'rc_2_1',
        title: '진격의 거인',
        subtitle: '파이널 EP.4 - 울부짖는 새벽',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #2C3E50, #4A4A6A)',
        progress: 65,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-29T09:00:00+09:00',
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rc_2_2',
        title: 'The Boys',
        subtitle: 'S4 EP.7 - Dirty Business',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #1A0000, #3D0000)',
        progress: 30,
        provider_id: 'prime',
        provider_label: 'Prime Video',
        lastWatchedAt: '2026-03-28T23:00:00+09:00',
        deepLinkId: 'prime'
      },
      {
        content_id: 'rc_2_3',
        title: '하이큐!!',
        subtitle: 'FINAL EP.2 - 쓰레기장의 결전',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #FF8C00, #FF4500)',
        progress: 55,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-28T19:30:00+09:00',
        deepLinkId: 'netflix'
      }
    ],

    recommendedContents: [
      {
        content_id: 'rec_2_1',
        title: '헌트',
        genre: ['액션', '스파이'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #141414, #2C2C2C)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '시청 이력 기반',
        rating: 8.2,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_2_2',
        title: '지금 우리 학교는',
        genre: ['호러', '서바이벌'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #1B4FD8, #0A2A7A)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '인기 급상승',
        rating: 8.7,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_2_3',
        title: 'Reacher',
        genre: ['액션', '스릴러'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #1a1c2c, #4a1942)',
        provider_id: 'prime',
        provider_label: 'Prime Video',
        reason: '장르 매칭',
        rating: 8.0,
        deepLinkId: 'prime'
      },
      {
        content_id: 'rec_2_4',
        title: '킹덤',
        genre: ['좀비', '사극'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #2C3E50, #3D5A80)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '장르 매칭',
        rating: 8.6,
        deepLinkId: 'netflix'
      }
    ],

    interestTags: ['IT/테크', '스포츠']
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'profile_3',
    name: '하나',
    gradient: 'linear-gradient(to bottom, #DCEDC8 0%, #8BC34A 100%)',
    panelAccentColor: '#8BC34A',
    avatarUrl: '/avatars/avatar_3.png',
    avatarFallbackColor: '#8BC34A',

    recentApps: [
      { id: 'disney', name: 'Disney+', iconColor: '#0063E5', iconInitial: 'D', lastUsedAt: '2026-03-29T10:15:00+09:00', deepLinkId: 'disney' },
      { id: 'netflix', name: 'Netflix', iconColor: '#E50914', iconInitial: 'N', lastUsedAt: '2026-03-29T08:00:00+09:00', deepLinkId: 'netflix' },
      { id: 'youtube', name: 'YouTube', iconColor: '#FF0000', iconInitial: 'Y', lastUsedAt: '2026-03-28T15:00:00+09:00', deepLinkId: 'youtube' }
    ],

    recentContents: [
      {
        content_id: 'rc_3_1',
        title: '도깨비',
        subtitle: 'EP.12 - 내가 돌아보지 않으면',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #141E30, #243B55)',
        progress: 90,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-29T08:30:00+09:00',
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rc_3_2',
        title: '어벤져스: 엔드게임',
        subtitle: '영화',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #0F2027, #203A43)',
        progress: 58,
        provider_id: 'disney',
        provider_label: 'Disney+',
        lastWatchedAt: '2026-03-28T21:00:00+09:00',
        deepLinkId: 'disney'
      }
    ],

    recommendedContents: [
      {
        content_id: 'rec_3_1',
        title: '나의 아저씨',
        genre: ['드라마', '힐링'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #485461, #28313B)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '시청 이력 기반',
        rating: 9.5,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_3_2',
        title: '비밀의 숲',
        genre: ['스릴러', '법정'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #4e4376, #2b5876)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '인기작',
        rating: 9.0,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_3_3',
        title: 'Loki',
        genre: ['마블', 'SF'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
        provider_id: 'disney',
        provider_label: 'Disney+',
        reason: '장르 매칭',
        rating: 8.3,
        deepLinkId: 'disney'
      }
    ],

    interestTags: ['엔터테인먼트', '생활/건강', '경제']
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'profile_4',
    name: '서준',
    gradient: 'linear-gradient(to bottom, #FFE0B2 0%, #FF9800 100%)',
    panelAccentColor: '#FF9800',
    avatarUrl: '/avatars/avatar_4.png',
    avatarFallbackColor: '#FF9800',

    recentApps: [
      { id: 'samsung-tv-plus', name: 'TV Plus', iconColor: '#1B4FD8', iconInitial: 'S', lastUsedAt: '2026-03-29T11:20:00+09:00', deepLinkId: 'samsung-tv-plus' },
      { id: 'youtube', name: 'YouTube', iconColor: '#FF0000', iconInitial: 'Y', lastUsedAt: '2026-03-29T10:50:00+09:00', deepLinkId: 'youtube' },
      { id: 'netflix', name: 'Netflix', iconColor: '#E50914', iconInitial: 'N', lastUsedAt: '2026-03-29T06:00:00+09:00', deepLinkId: 'netflix' },
      { id: 'prime', name: 'Prime Video', iconColor: '#00A8E1', iconInitial: 'P', lastUsedAt: '2026-03-28T21:30:00+09:00', deepLinkId: 'prime' }
    ],

    recentContents: [
      {
        content_id: 'rc_4_1',
        title: '수리남',
        subtitle: 'EP.3 - 정글의 법칙',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #27AE60, #145A32)',
        progress: 40,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-29T06:00:00+09:00',
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rc_4_2',
        title: 'Jack Ryan',
        subtitle: 'S3 EP.6 - Red Winter',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #003580, #001F4D)',
        progress: 75,
        provider_id: 'prime',
        provider_label: 'Prime Video',
        lastWatchedAt: '2026-03-28T21:30:00+09:00',
        deepLinkId: 'prime'
      }
    ],

    recommendedContents: [
      {
        content_id: 'rec_4_1',
        title: '돼지의 왕',
        genre: ['스릴러', '범죄'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #FF6B6B, #C0392B)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '시청 이력 기반',
        rating: 7.9,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_4_2',
        title: '지금 거신 전화는',
        genre: ['스릴러', '미스터리'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #2C3E50, #3498DB)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '장르 매칭',
        rating: 8.1,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_4_3',
        title: 'The Terminal List',
        genre: ['액션', '스릴러'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #1a1c2c, #0d0d0d)',
        provider_id: 'prime',
        provider_label: 'Prime Video',
        reason: '장르 매칭',
        rating: 8.0,
        deepLinkId: 'prime'
      }
    ],

    interestTags: ['스포츠', '경제', 'IT/테크']
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'profile_5',
    name: '수아',
    gradient: 'linear-gradient(to bottom, #E1BEE7 0%, #9C27B0 100%)',
    panelAccentColor: '#9C27B0',
    avatarUrl: '/avatars/avatar_5.png',
    avatarFallbackColor: '#9C27B0',

    recentApps: [
      { id: 'netflix', name: 'Netflix', iconColor: '#E50914', iconInitial: 'N', lastUsedAt: '2026-03-29T09:45:00+09:00', deepLinkId: 'netflix' },
      { id: 'tving', name: 'TVING', iconColor: '#FF153C', iconInitial: 'T', lastUsedAt: '2026-03-29T07:30:00+09:00', deepLinkId: 'tving' },
      { id: 'youtube', name: 'YouTube', iconColor: '#FF0000', iconInitial: 'Y', lastUsedAt: '2026-03-28T20:00:00+09:00', deepLinkId: 'youtube' }
    ],

    recentContents: [
      {
        content_id: 'rc_5_1',
        title: '스물다섯 스물하나',
        subtitle: 'EP.10 - 우리가 다시 만날 날',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #E1BEE7, #9C27B0)',
        progress: 60,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-29T09:00:00+09:00',
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rc_5_2',
        title: 'Crash Landing on You',
        subtitle: 'EP.14 - 귀환',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #a8c0ff, #3f2b96)',
        progress: 83,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-28T22:30:00+09:00',
        deepLinkId: 'netflix'
      }
    ],

    recommendedContents: [
      {
        content_id: 'rec_5_1',
        title: '별에서 온 그대',
        genre: ['로맨스', 'SF'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #141E30, #243B55)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '시청 이력 기반',
        rating: 8.9,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_5_2',
        title: '마이 데몬',
        genre: ['로맨스', '판타지'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #9C27B0, #4A148C)',
        provider_id: 'disney',
        provider_label: 'Disney+',
        reason: '장르 매칭',
        rating: 7.8,
        deepLinkId: 'disney'
      },
      {
        content_id: 'rec_5_3',
        title: '사랑의 불시착',
        genre: ['로맨스', '드라마'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #2980B9, #6DD5FA)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '인기작',
        rating: 9.0,
        deepLinkId: 'netflix'
      }
    ],

    interestTags: ['엔터테인먼트', '생활/건강']
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'profile_6',
    name: '태양',
    gradient: 'linear-gradient(to bottom, #FFF9C4 0%, #FBC02D 100%)',
    panelAccentColor: '#FBC02D',
    avatarUrl: '/avatars/avatar_6.png',
    avatarFallbackColor: '#FBC02D',

    recentApps: [
      { id: 'youtube', name: 'YouTube', iconColor: '#FF0000', iconInitial: 'Y', lastUsedAt: '2026-03-29T11:30:00+09:00', deepLinkId: 'youtube' },
      { id: 'netflix', name: 'Netflix', iconColor: '#E50914', iconInitial: 'N', lastUsedAt: '2026-03-29T10:00:00+09:00', deepLinkId: 'netflix' }
    ],

    recentContents: [
      {
        content_id: 'rc_6_1',
        title: 'Squid Game',
        subtitle: 'S1 EP.9 - 제주도 돌하르방',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #E50914, #333333)',
        progress: 92,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-29T10:00:00+09:00',
        deepLinkId: 'netflix'
      }
    ],

    recommendedContents: [
      {
        content_id: 'rec_6_1',
        title: '알리타: 배틀 엔젤',
        genre: ['SF', '액션'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #FBC02D, #9E6700)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '장르 매칭',
        rating: 7.3,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_6_2',
        title: '승리호',
        genre: ['SF', '한국'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #0F2027, #2C5364)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '인기작',
        rating: 7.5,
        deepLinkId: 'netflix'
      }
    ],

    interestTags: ['IT/테크', '경제']
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'profile_7',
    name: '나래',
    gradient: 'linear-gradient(to bottom, #B3E5FC 0%, #03A9F4 100%)',
    panelAccentColor: '#03A9F4',
    avatarUrl: '/avatars/avatar_7.png',
    avatarFallbackColor: '#03A9F4',

    recentApps: [
      { id: 'tving', name: 'TVING', iconColor: '#FF153C', iconInitial: 'T', lastUsedAt: '2026-03-29T10:00:00+09:00', deepLinkId: 'tving' },
      { id: 'netflix', name: 'Netflix', iconColor: '#E50914', iconInitial: 'N', lastUsedAt: '2026-03-29T07:00:00+09:00', deepLinkId: 'netflix' },
      { id: 'disney', name: 'Disney+', iconColor: '#0063E5', iconInitial: 'D', lastUsedAt: '2026-03-28T19:00:00+09:00', deepLinkId: 'disney' }
    ],

    recentContents: [
      {
        content_id: 'rc_7_1',
        title: '동백꽃 필 무렵',
        subtitle: 'EP.20 - 너만 바라보니까',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
        progress: 78,
        provider_id: 'netflix',
        provider_label: 'Netflix',
        lastWatchedAt: '2026-03-29T07:00:00+09:00',
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rc_7_2',
        title: '런닝맨',
        subtitle: 'EP.612',
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #f83600, #f9d423)',
        progress: 50,
        provider_id: 'tving',
        provider_label: 'TVING',
        lastWatchedAt: '2026-03-28T19:00:00+09:00',
        deepLinkId: 'tving'
      }
    ],

    recommendedContents: [
      {
        content_id: 'rec_7_1',
        title: '갯마을 차차차',
        genre: ['로맨스', '힐링'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #03A9F4, #006064)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '시청 이력 기반',
        rating: 8.4,
        deepLinkId: 'netflix'
      },
      {
        content_id: 'rec_7_2',
        title: '좋아하면 울리는',
        genre: ['로맨스', 'SF'],
        thumbnail_url: null,
        thumbnail_gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        provider_id: 'netflix',
        provider_label: 'Netflix',
        reason: '장르 매칭',
        rating: 7.7,
        deepLinkId: 'netflix'
      }
    ],

    interestTags: ['엔터테인먼트', '스포츠']
  }
];
