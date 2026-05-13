import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time24: string): string {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHours = h % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
}

export function getNextPrayer(timings: Record<string, string>): { name: string; time: string } | null {
  const now = new Date();
  const sortedPrayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
    .map(name => ({
      name,
      time: timings[name],
      date: new Date(now.toDateString() + ' ' + timings[name])
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const next = sortedPrayers.find(p => p.date > now);
  if (next) return { name: next.name, time: next.time };
  
  // If no next prayer today, it's Fajr tomorrow
  return { name: 'Fajr', time: timings['Fajr'] };
}

export function getTimeRemaining(targetTime: string): string {
  const now = new Date();
  let target = new Date(now.toDateString() + ' ' + targetTime);
  
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
}
