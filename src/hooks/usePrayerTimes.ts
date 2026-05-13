import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { fetchPrayerTimes } from '../services/prayerService';
import { getNextPrayer } from '../lib/utils';

export function usePrayerTimes() {
  const { location, settings, setPrayerTimes, setNextPrayer, prayerTimes } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const loadTimes = async () => {
      setLoading(true);
      try {
        const data = await fetchPrayerTimes(location, settings.calculationMethod);
        setPrayerTimes(data.times);
        setNextPrayer(getNextPrayer(data.times as any));
        setError(null);
      } catch (err) {
        setError('Failed to load prayer times');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTimes();
    
    // Refresh every minute to update countdowns/next prayer
    const interval = setInterval(() => {
      if (prayerTimes) {
        setNextPrayer(getNextPrayer(prayerTimes as any));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [location, settings.calculationMethod, setPrayerTimes, setNextPrayer]);

  return { loading, error };
}
