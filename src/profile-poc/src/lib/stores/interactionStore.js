import { writable } from 'svelte/store';

export const interactionStore = writable({
  isDashboardActive: false
});

export function activateDashboard() {
  interactionStore.update(s => ({ ...s, isDashboardActive: true }));
}

export function deactivateDashboard() {
  interactionStore.update(s => ({ ...s, isDashboardActive: false }));
}

export function resetDashboard() {
  deactivateDashboard();
}
