import { useCallback, useEffect, useState } from 'react';
import { loadWatchlist, saveWatchlist } from '../services/storage';

export default function useWatchlist() {
  const [ids, setIds] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    loadWatchlist().then((saved) => { if (active) { setIds(saved); setReady(true); } });
    return () => { active = false; };
  }, []);

  
  useEffect(() => { if (ready) saveWatchlist(ids); }, [ids, ready]);

  const toggle = useCallback((id) => {
    setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])); 
  }, []);

  return { ids, toggle };
}
