import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { previewContentStore, fetchPreviewContent } from './previewContentStore.js';

describe('previewContentStore', () => {
  beforeEach(() => {
    // Reset store before each test
    previewContentStore.set({ loading: false, data: [], error: null });
  });

  it('초기 상태에서는 loading이 false 이고 data가 빈 배열이어야 합니다.', () => {
    const state = get(previewContentStore);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(state.error).toBeNull();
  });

  it('fetchPreviewContent를 호출하면 특정 profileId에 맞는 데이터가 로드되어야 합니다.', async () => {
    // profile_1에 대한 데이터 로드
    await fetchPreviewContent('profile_1');
    
    const state = get(previewContentStore);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    // 데이터가 로드되었는지 확인
    expect(state.data.length).toBeGreaterThan(0);
    // 첫번째 항목이 넷플릭스 등 적절한 데이터를 가지고 있는지 확인
    expect(state.data[0]).toHaveProperty('content_id');
    expect(state.data[0]).toHaveProperty('title');
  });

  it('존재하지 않는 profileId로 데이터를 요청하면 빈 배열을 반환해야 합니다.', async () => {
    await fetchPreviewContent('invalid-profile');
    
    const state = get(previewContentStore);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(state.error).toBeNull();
  });
});
