// src/lib/data/profiles.js
// 최대 7개 프로파일 풀 — profileCount에 따라 slice하여 사용

export const PROFILES = [
  {
    id: 'profile_1',
    name: '지은',
    gradient: 'linear-gradient(to bottom, #1B4FD8 0%, #0A2A7A 100%)',
    panelAccentColor: '#1B4FD8',
    // DiceBear adventurer 스타일 아바타 (상반신 portrait 형태)
    avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=jieun2024&backgroundColor=transparent&size=400',
    avatarFallbackColor: '#1B4FD8',
    recentContents: [
      {
        id: 'c1',
        title: '진격의 거인',
        episode: 'EP.12 - 울부짖는 새벽',
        progress: 0.65,
        thumbnailGradient: 'linear-gradient(135deg, #1a1a2e, #16213e)'
      },
      {
        id: 'c2',
        title: '나의 아저씨',
        episode: 'EP.05',
        progress: 0.30,
        thumbnailGradient: 'linear-gradient(135deg, #2C3E50, #4A235A)'
      }
    ]
  },
  {
    id: 'profile_2',
    name: '민준',
    gradient: 'linear-gradient(to bottom, #C0392B 0%, #6E0E0A 100%)',
    panelAccentColor: '#C0392B',
    avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=minjun2024&backgroundColor=transparent&size=400',
    avatarFallbackColor: '#C0392B',
    recentContents: [
      {
        id: 'c3',
        title: '범죄도시',
        episode: '시즌 2',
        progress: 0.80,
        thumbnailGradient: 'linear-gradient(135deg, #1C0A00, #3D0C02)'
      }
    ]
  },
  {
    id: 'profile_3',
    name: '하나',
    gradient: 'linear-gradient(to bottom, #1DAB5B 0%, #0D5C30 100%)',
    panelAccentColor: '#1DAB5B',
    avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=hana2024&backgroundColor=transparent&size=400',
    avatarFallbackColor: '#1DAB5B',
    recentContents: [
      {
        id: 'c4',
        title: '이상한 변호사 우영우',
        episode: 'EP.09',
        progress: 0.45,
        thumbnailGradient: 'linear-gradient(135deg, #0A2A1A, #1A4A2A)'
      }
    ]
  },
  {
    id: 'profile_4',
    name: '서준',
    gradient: 'linear-gradient(to bottom, #E07B27 0%, #7A3C0A 100%)',
    panelAccentColor: '#E07B27',
    avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=seojun2024&backgroundColor=transparent&size=400',
    avatarFallbackColor: '#E07B27',
    recentContents: [
      {
        id: 'c5',
        title: '킹덤',
        episode: 'EP.03 - 생존',
        progress: 0.55,
        thumbnailGradient: 'linear-gradient(135deg, #1A0F00, #3D2200)'
      }
    ]
  },
  {
    id: 'profile_5',
    name: '수아',
    gradient: 'linear-gradient(to bottom, #9B3CC0 0%, #4A1066 100%)',
    panelAccentColor: '#9B3CC0',
    avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=sua2024&backgroundColor=transparent&size=400',
    avatarFallbackColor: '#9B3CC0',
    recentContents: [
      {
        id: 'c6',
        title: '도깨비',
        episode: 'EP.07',
        progress: 0.90,
        thumbnailGradient: 'linear-gradient(135deg, #1A002E, #2D0050)'
      }
    ]
  },
  {
    id: 'profile_6',
    name: '태양',
    gradient: 'linear-gradient(to bottom, #D4A017 0%, #7A5500 100%)',
    panelAccentColor: '#D4A017',
    avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=taeyang2024&backgroundColor=transparent&size=400',
    avatarFallbackColor: '#D4A017',
    recentContents: []
  },
  {
    id: 'profile_7',
    name: '나래',
    gradient: 'linear-gradient(to bottom, #1AA8C0 0%, #0A5A6E 100%)',
    panelAccentColor: '#1AA8C0',
    avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=narae2024&backgroundColor=transparent&size=400',
    avatarFallbackColor: '#1AA8C0',
    recentContents: []
  }
];
