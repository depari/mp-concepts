import { writable } from 'svelte/store';

export const interactionStore = writable({
  isDashboardActive: false,
  isContentHubActive: false
});

export function activateDashboard() {
  interactionStore.update(s => ({ ...s, isDashboardActive: true }));
}

export function deactivateDashboard() {
  interactionStore.update(s => ({ ...s, isDashboardActive: false }));
}

export function activateContentHub() {
  interactionStore.update(s => ({ ...s, isContentHubActive: true }));
}

export function deactivateContentHub() {
  interactionStore.update(s => ({ ...s, isContentHubActive: false }));
}

export function resetDashboard() {
  interactionStore.update(s => ({ ...s, isDashboardActive: false, isContentHubActive: false }));
}
