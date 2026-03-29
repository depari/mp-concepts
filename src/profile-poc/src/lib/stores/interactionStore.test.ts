import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { interactionStore, activateDashboard, deactivateDashboard } from './interactionStore.js';

describe('interactionStore (Manual Trigger)', () => {
  beforeEach(() => {
    interactionStore.set({ isDashboardActive: false, isContentHubActive: false });
  });

  it('activateDashboard 함수를 호출하면 isDashboardActive가 true가 되어야 한다', () => {
    expect(get(interactionStore).isDashboardActive).toBe(false);
    activateDashboard();
    expect(get(interactionStore).isDashboardActive).toBe(true);
  });

  it('deactivateDashboard 함수를 호출하면 isDashboardActive가 false가 되어야 한다', () => {
    interactionStore.set({ isDashboardActive: true, isContentHubActive: false });
    deactivateDashboard();
    expect(get(interactionStore).isDashboardActive).toBe(false);
  });
});
