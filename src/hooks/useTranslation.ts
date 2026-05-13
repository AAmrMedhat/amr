
import { useAppStore } from '../store/useAppStore';
import { translations, TranslationKey } from '../constants/translations';

export function useTranslation() {
  const { settings } = useAppStore();
  const lang = settings.language || 'ar'; // Default to Arabic as requested

  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    let text = translations[lang][key] || translations['en'][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    
    return text;
  };

  const isRtl = lang === 'ar';

  return { t, lang, isRtl };
}
