import { writable } from 'svelte/store';
import { previewDB } from '../data/previewDB.js';

export const previewContentStore = writable({
  loading: false,
  data: [],
  error: null
});

// Mock API call to fetch data from previewDB
export async function fetchPreviewContent(profileId) {
  previewContentStore.update(s => ({ ...s, loading: true, error: null, data: [] }));
  
  // Simulate network delay for transition demo (300ms)
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const data = previewDB[profileId] || []; // defaults to empty array if not found
    previewContentStore.update(s => ({
      ...s,
      loading: false,
      data
    }));
  } catch (error) {
    previewContentStore.update(s => ({
      ...s,
      loading: false,
      error: error.message
    }));
  }
}
