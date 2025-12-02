import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetch = (fetchFn, dependencies = [], { immediate = true } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(immediate));
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const run = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchFn();
      if (!mountedRef.current) return;
      setData(result ?? null);
      setError(null);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err?.response?.data?.message || err?.message || 'Error');
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    mountedRef.current = true;
    if (immediate) run();
    return () => { mountedRef.current = false; };
  }, [run, immediate]);

  return { data, loading, error, refetch: run };
};
