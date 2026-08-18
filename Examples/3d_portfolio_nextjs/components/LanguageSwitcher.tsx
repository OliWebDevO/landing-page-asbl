'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { language, setLanguage } = useLanguage();

  const isLight = variant === 'light';

  return (
    <div suppressHydrationWarning className="flex items-center gap-1 rounded-lg p-1"
      style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'var(--color-surface)' }}
    >
      <button
        onClick={() => setLanguage('en')}
        suppressHydrationWarning
        className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? isLight ? 'bg-black text-white' : ''
            : isLight ? 'bg-transparent text-black-300 hover:text-black' : 'bg-transparent'
        }`}
        style={
          !isLight
            ? language === 'en'
              ? { backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }
              : { color: 'var(--color-text-muted)' }
            : undefined
        }
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        suppressHydrationWarning
        className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
          language === 'fr'
            ? isLight ? 'bg-black text-white' : ''
            : isLight ? 'bg-transparent text-black-300 hover:text-black' : 'bg-transparent'
        }`}
        style={
          !isLight
            ? language === 'fr'
              ? { backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }
              : { color: 'var(--color-text-muted)' }
            : undefined
        }
      >
        FR
      </button>
    </div>
  );
}
