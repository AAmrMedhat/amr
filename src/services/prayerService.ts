import { format } from 'date-fns';
import { PrayerTimes, LocationData } from '../types';

const API_BASE_URL = 'https://api.aladhan.com/v1';

export async function fetchPrayerTimes(
  location: LocationData,
  method: number = 2,
  date: Date = new Date()
): Promise<{ times: PrayerTimes; meta: any }> {
  try {
    const dateStr = format(date, 'dd-MM-yyyy');
    const response = await fetch(
      `${API_BASE_URL}/timings/${dateStr}?latitude=${location.latitude}&longitude=${location.longitude}&method=${method}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch prayer times');
    }

    const data = await response.json();
    return {
      times: data.data.timings,
      meta: data.data.meta,
    };
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<{ city?: string; country?: string }> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
    );
    if (!response.ok) return {};
    const data = await response.json();
    return {
      city: data.address.city || data.address.town || data.address.village || data.address.suburb,
      country: data.address.country,
    };
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return {};
  }
}
