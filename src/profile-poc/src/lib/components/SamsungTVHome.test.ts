import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import SamsungTVHome from './SamsungTVHome.svelte';
import { selectedIndex } from '../stores/profileStore.js';

describe('SamsungTVHome.svelte', () => {
  beforeEach(() => {
    // profile_1 (지은)을 선택된 상태로 설정
    selectedIndex.set(0); 
  });

  it('홈 화면에서 공통 앱(Settings)과 프로필 전용 앱(Disney+)이 모두 렌더링되어야 한다', () => {
    const { getAllByText } = render(SamsungTVHome);
    
    expect(getAllByText('Settings').length).toBeGreaterThanOrEqual(1); // 공통 앱
    expect(getAllByText('Disney+').length).toBeGreaterThanOrEqual(1); // 유저 앱
  });

  it('홈 화면의 메인 Hero 영역 및 컨텐츠 섹션에서 공통 컨텐츠(Samsung TV Plus Guide)가 보여야 한다', () => {
    const { getAllByText } = render(SamsungTVHome);
    
    // Hero 영역과 최근 시청 카드 양쪽에서 발견될 수 있음
    const elements = getAllByText('Samsung TV Plus Guide');
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });
});
