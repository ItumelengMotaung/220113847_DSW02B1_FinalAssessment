import { useCallback, useEffect, useState } from 'react';
import { fetchBasket } from '../services/basketApi';
import { loadCache, saveCache } from '../services/storage';


export default function useBasket() {
  const [state, setState] = useState({ status: 'loading', items: [], error: null, savedAt: null });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, status: 'loading', error: null }));
    try {
      const items = await fetchBasket();
      await saveCache(items);
      setState({ status: 'live', items, error: null, savedAt: null });
    } catch (e) {
      const cache = await loadCache();
      if (cache) {
        setState({ status: 'cached', items: cache.items, error: e.message, savedAt: cache.savedAt });
      } else {
        setState({ status: 'error', items: [], error: e.message, savedAt: null });
      }
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  return { ...state, reload: load };
}
