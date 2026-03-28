import { writable } from 'svelte/store';

export const isPowerOn = writable(false);

export function togglePower() {
  isPowerOn.update(v => !v);
}
