export const previewDB = {
  // Key: profileId (matches profiles.js)
  'profile_1': [
    {
      content_id: 'c1',
      provider_id: 'netflix',
      type: 'vod',
      title: 'Stranger Things',
      thumbnail_url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop',
      progress: 60,
      action_deep_link: 'netflix://title/80057281'
    },
    {
      content_id: 'c2',
      provider_id: 'amazon_prime',
      type: 'vod',
      title: 'The Boys',
      thumbnail_url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=500&auto=format&fit=crop',
      progress: 25,
      action_deep_link: 'primevideo://watch?titleId=12345'
    },
    {
      content_id: 'c3',
      provider_id: 'samsung_tv_plus',
      type: 'live',
      title: 'Action Movies 24/7',
      thumbnail_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop',
      progress: 100,
      action_deep_link: 'samsungtvplus://channel/123'
    }
  ],
  'profile_2': [
    {
      content_id: 'c4',
      provider_id: 'netflix',
      type: 'vod',
      title: 'The Crown',
      thumbnail_url: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=500&auto=format&fit=crop',
      progress: 10,
      action_deep_link: 'netflix://title/80025678'
    }
  ],
  'profile_3': [
    {
      content_id: 'c5',
      provider_id: 'youtube',
      type: 'vod',
      title: 'Lofi Girl Live',
      thumbnail_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop',
      progress: 90,
      action_deep_link: 'youtube://watch?v=jfKfPfyJRdk'
    }
  ]
};
