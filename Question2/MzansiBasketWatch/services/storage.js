import AsyncStorage from '@react-native-async-storage/async-storage';
import { CACHE_KEY, WATCHLIST_KEY } from '../apiConfig';

export async function saveCache(items) {
  try {
    if (!Array.isArray(items) || items.length === 0) return; 
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: new Date().toISOString(), items }));
  } catch (e) { /* cache failure */ }
}

export async function loadCache() {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (raw === null) return null; 
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.items) && parsed.items.length > 0 ? parsed : null;
  } catch (e) { return null; }
}

export async function loadWatchlist() {
  try {
    const raw = await AsyncStorage.getItem(WATCHLIST_KEY);
    if (raw === null) return []; 
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) { return []; }
}

export async function saveWatchlist(ids) {
  try { await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(ids)); } catch (e) { /* async*/ }
}
