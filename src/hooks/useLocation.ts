import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { reverseGeocode } from '../services/prayerService';

export function useLocation() {
  const { setLocation, location: storedLocation } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!storedLocation);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const details = await reverseGeocode(latitude, longitude);
        
        setLocation({
          latitude,
          longitude,
          city: details.city,
          country: details.country,
        });
        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
        console.error(err);
      }
    );
  }, [setLocation]);

  return { error, loading };
}
