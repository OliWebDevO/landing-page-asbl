'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, navLinks, homeNavLinks, words, abilities, homeAbilities, expCards, techStackIcons, techStackImgs, projects, projectDetailsCards, serviceKeywords, processSteps, productCards, faqItems } from '@/constants';


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;

    if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.toLowerCase();
      const detectedLang: Language = browserLang.startsWith('fr') ? 'fr' : 'en';
      setLanguage(detectedLang);
      localStorage.setItem('language', detectedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = translations[language];
  const currentNavLinks = navLinks[language];
  const currentHomeNavLinks = homeNavLinks[language];
  const currentWords = words[language];
  const currentAbilities = abilities[language];
  const currentHomeAbilities = homeAbilities[language];
  const currentExperience = expCards[language];
  const currentTechStackIcons = techStackIcons[language];
  const currentTechStackImgs = techStackImgs[language];
  const currentProjects = projects[language];
  const currentProjectDetails = projectDetailsCards[language];
  const currentServiceKeywords = serviceKeywords[language];
  const currentProcessSteps = processSteps[language];
  const currentProductCards = productCards[language];
  const currentFaqItems = faqItems[language];

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      t,
      navLinks: currentNavLinks,
      homeNavLinks: currentHomeNavLinks,
      words: currentWords,
      abilities: currentAbilities,
      homeAbilities: currentHomeAbilities,
      expCards: currentExperience,
      techStackIcons: currentTechStackIcons,
      techStackImgs: currentTechStackImgs,
      projects: currentProjects,
      projectDetailsCards: currentProjectDetails,
      serviceKeywords: currentServiceKeywords,
      processSteps: currentProcessSteps,
      productCards: currentProductCards,
      faqItems: currentFaqItems,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}