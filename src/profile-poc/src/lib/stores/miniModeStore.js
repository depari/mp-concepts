import { writable } from 'svelte/store';

export const miniModeStore = writable({
  isActive: false,
  position: 'bottom'
});

export function toggleMiniMode() {
  miniModeStore.update(s => ({ ...s, isActive: !s.isActive }));
}

export function openMiniMode() {
  miniModeStore.update(s => ({ ...s, isActive: true }));
}

export function closeMiniMode() {
  miniModeStore.update(s => ({ ...s, isActive: false }));
}

export function setMiniModePosition(pos) {
  miniModeStore.update(s => ({ ...s, position: pos }));
}
