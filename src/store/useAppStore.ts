import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings, LocationData, PrayerTimes } from '../types';

interface AppState {
  settings: AppSettings;
  location: LocationData | null;
  prayerTimes: PrayerTimes | null;
  nextPrayer: { name: string; time: string } | null;
  completedPrayers: string[]; // Store as DateString_PrayerName
  togglePrayerCompleted: (prayerKey: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: {
        calculationMethod: 2,
        language: 'en',
        qiyamAlarmTime: null,
        notificationsEnabled: true,
        adhadEnabled: false,
      },
      location: null,
      prayerTimes: null,
      nextPrayer: null,
      isLoaded: false,
      completedPrayers: [],

      setSettings: (newSettings) => set((state) => ({ 
        settings: { ...state.settings, ...newSettings } 
      })),
      setLocation: (location) => set({ location }),
      setPrayerTimes: (prayerTimes) => set({ prayerTimes }),
      setNextPrayer: (nextPrayer) => set({ nextPrayer }),
      setLoaded: (isLoaded) => set({ isLoaded }),
      togglePrayerCompleted: (prayerKey) => set((state) => ({
        completedPrayers: state.completedPrayers.includes(prayerKey)
          ? state.completedPrayers.filter(k => k !== prayerKey)
          : [...state.completedPrayers, prayerKey]
      })),
    }),
    {
      name: 'noor-storage',
      partialize: (state) => ({ settings: state.settings, location: state.location }),
    }
  )
);
