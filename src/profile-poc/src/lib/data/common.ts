// src/lib/data/common.js
// 프로필에 관계없이 모든 유저에게 노출되는 공통 컨텐츠

export const COMMON_APPS = [
  { id: 'settings', name: 'Settings', iconColor: '#555', iconInitial: '⚙', lastUsedAt: '2026-03-29', deepLinkId: 'settings' },
  { id: 'browser', name: 'Web Browser', iconColor: '#4285F4', iconInitial: '🌐', lastUsedAt: '2026-03-29', deepLinkId: 'browser' },
  { id: 'gallery', name: 'Gallery', iconColor: '#9C27B0', iconInitial: '🖼', lastUsedAt: '2026-03-29', deepLinkId: 'gallery' }
];

export const COMMON_CONTENTS = [
  {
    content_id: 'common_1',
    title: 'Samsung TV Plus Guide',
    subtitle: 'Free channels, movies, and more.',
    thumbnail_url: null,
    thumbnail_gradient: 'linear-gradient(135deg, #1B4FD8, #123456)',
    progress: 0,
    provider_id: 'samsung',
    provider_label: 'SAMSUNG',
    lastWatchedAt: '2026-03-29',
    deepLinkId: 'tv-plus'
  }
];

export const COMMON_RECOMMENDED = [
  {
    content_id: 'common_rec_1',
    title: 'Samsung Art Store',
    genre: ['Lifestyle', 'Art'],
    thumbnail_url: null,
    thumbnail_gradient: 'linear-gradient(135deg, #121212, #333)',
    provider_id: 'samsung',
    provider_label: 'ART',
    reason: 'New Arrival',
    rating: 9.8,
    deepLinkId: 'art-store'
  }
];
