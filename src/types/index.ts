
export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'Midnight' | 'Firstthird' | 'Lastthird';

export interface PrayerTime {
  name: PrayerName;
  time: string; // HH:mm format
  displayName: string;
}

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface AppSettings {
  calculationMethod: number;
  language: 'en' | 'ar';
  qiyamAlarmTime: string | null;
  notificationsEnabled: boolean;
  adhadEnabled: boolean;
}

export interface PrayerGuidance {
  fard: number;
  sunnahBefore: number;
  sunnahAfter: number;
  isLoud: boolean;
}

export const CALCULATION_METHODS = [
  { id: 0, name: 'Shia Ithna-Ashari' },
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
  { id: 2, name: 'Islamic Society of North America (ISNA)' },
  { id: 3, name: 'Muslim World League (MWL)' },
  { id: 4, name: 'Umm Al-Qura University, Makkah' },
  { id: 5, name: 'Egyptian General Authority of Survey' },
  { id: 7, name: 'Institute of Geophysics, University of Tehran' },
  { id: 8, name: 'Gulf Region' },
  { id: 9, name: 'Kuwait' },
  { id: 10, name: 'Qatar' },
  { id: 11, name: 'Majlis Ugama Islam Singapura, Singapore' },
  { id: 12, name: 'Union Des Organisations Islamiques De France' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
  { id: 14, name: 'Spiritual Administration of Muslims of Russia' },
  { id: 15, name: 'Moonsighting Committee Worldwide (Official SPAIN)' },
];

export const PRAYER_GUIDANCE: Record<string, PrayerGuidance> = {
  Fajr: { fard: 2, sunnahBefore: 2, sunnahAfter: 0, isLoud: true },
  Dhuhr: { fard: 4, sunnahBefore: 4, sunnahAfter: 2, isLoud: false },
  Asr: { fard: 4, sunnahBefore: 0, sunnahAfter: 0, isLoud: false },
  Maghrib: { fard: 3, sunnahBefore: 0, sunnahAfter: 2, isLoud: true },
  Isha: { fard: 4, sunnahBefore: 0, sunnahAfter: 2, isLoud: true },
};
