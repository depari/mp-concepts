import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import SamsungTVHome from './SamsungTVHome.svelte';
import { selectedIndex, selectedProfile } from '../stores/profileStore.js';
import { appStateStore } from '../stores/appStateStore.js';
import { get } from 'svelte/store';

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

  it('APP_STATE가 PIG일 때 PIG 플레이어 레이어가 렌더링되어야 한다', () => {
    appStateStore.set({ 
      mode: 'pig', 
      deepLinkTarget: null,
      pigContent: { title: '테스트 영화', thumbnail_gradient: '#ff0000' } 
    });

    const { getByText, container } = render(SamsungTVHome);
    
    // PIG 플레이어 힌트 텍스트 확인
    expect(getByText('전체 화면으로 이동')).toBeTruthy();
    expect(getByText('테스트 영화')).toBeTruthy();
    
    // PIG 컨테이너 존재 확인
    const pigContainer = container.querySelector('.pig-container');
    expect(pigContainer).toBeTruthy();
  });

  it('선택된 프로필에 따라 배경 accent 색상이 변경되어야 한다', () => {
    // 1. 지은 프로필 (#F06292)
    selectedIndex.set(0);
    const { container: container1 } = render(SamsungTVHome);
    const homeContainer1 = container1.querySelector('.home-container');
    expect(homeContainer1?.getAttribute('style')).toContain('#F06292');
    
    cleanup();

    // 2. 하나 프로필 (#8BC34A)
    selectedIndex.set(2); 
    const { container: container2 } = render(SamsungTVHome);
    const homeContainer2 = container2.querySelector('.home-container');
    expect(homeContainer2?.getAttribute('style')).toContain('#8BC34A');
    
    cleanup();
  });

  it('선택된 프로필에 따라 Hero 영역(지금 시청하기)의 제목이 변경되어야 한다', () => {
    // 1. 지은 프로필 선택 (최근 시청 첫 번째: '오징어 게임')
    selectedIndex.set(0);
    const { getByRole, queryByText } = render(SamsungTVHome);
    
    // 이 테스트는 profileContents가 있더라도 COMMON_CONTENTS가 앞에 있으면 실패함 (현재 상태)
    const heroTitle = getByRole('heading', { level: 1 }).textContent;
    
    // 만약 COMMON_CONTENTS가 우선이면 'Samsung TV Plus Guide'일 것임.
    // 하지만 요구사항에 따르면 프로필 컨텐츠인 '오징어 게임'이 보여야 함.
    expect(heroTitle).toBe('오징어 게임');
    
    cleanup();

    // 2. 민준 프로필 선택 (최근 시청 첫 번째: '진격의 거인')
    selectedIndex.set(1);
    const { getByRole: getByRole2 } = render(SamsungTVHome);
    expect(getByRole2('heading', { level: 1 }).textContent).toBe('진격의 거인');
    
    cleanup();
  });
});
