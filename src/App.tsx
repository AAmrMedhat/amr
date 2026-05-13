/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SplashScreen } from './components/SplashScreen';
import { Dashboard } from './screens/Dashboard';
import { PrayerTimesScreen } from './screens/PrayerTimes';
import { AlarmScreen } from './screens/Alarm';
import { SettingsScreen } from './screens/Settings';
import { useLocation } from './hooks/useLocation';
import { usePrayerTimes } from './hooks/usePrayerTimes';
import { useAppStore } from './store/useAppStore';
import { useTranslation } from './hooks/useTranslation';

export default function App() {
  const { isLoaded, setLoaded, settings } = useAppStore();
  const [showSplash, setShowSplash] = useState(true);
  const { t, lang, isRtl } = useTranslation();
  
  // Initialize services
  useLocation();
  usePrayerTimes();

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [isRtl, lang]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setLoaded(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [setLoaded]);

  // Simple Alarm Monitor
  useEffect(() => {
    if (!settings.qiyamAlarmTime || !settings.notificationsEnabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      if (currentTime === settings.qiyamAlarmTime && now.getSeconds() < 2) {
        // Trigger Notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(t('notificationTitle'), {
            body: t('notificationBody'),
            icon: "/favicon.ico"
          });
        } else if ("Notification" in window && Notification.permission !== "denied") {
          Notification.requestPermission();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.qiyamAlarmTime, settings.notificationsEnabled, t]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/times" element={<PrayerTimesScreen />} />
          <Route path="/alarm" element={<AlarmScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}


