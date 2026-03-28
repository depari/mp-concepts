import { writable } from 'svelte/store';

export const miniModeStore = writable({
  isActive: false
});

export function toggleMiniMode() {
  miniModeStore.update(s => ({ ...s, isActive: !s.isActive }));
}
