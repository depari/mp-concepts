import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import SamsungTVHome from './SamsungTVHome.svelte';
import { selectedIndex } from '../stores/profileStore.js';

describe('SamsungTVHome.svelte', () => {
  beforeEach(() => {
    // profile_1 (지은)을 선택된 상태로 설정
    selectedIndex.set(0); 
  });

  it('홈 화면에서 mockData가 아닌 profileRecentApps 스토어의 앱을 렌더링해야 한다', () => {
    const { getByText } = render(SamsungTVHome);
    
    // profile_1의 최근앱들 중에 있는 'Disney+' 렌더링 확인 
    expect(getByText('Disney+')).toBeTruthy();
  });

  it('홈 화면의 메인 Hero 영역에서 profileRecentContents의 첫번째 항목 타이틀을 보여줘야 한다', () => {
    const { getByText } = render(SamsungTVHome);
    
    // profile_1의 최근컨텐츠 중 첫번째 항목인 '오징어 게임'이 렌더링되어야 함
    expect(getByText('오징어 게임')).toBeTruthy();
  });
});
