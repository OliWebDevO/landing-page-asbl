import { useLanguage } from '@/contexts/LanguageContext';

export function useTranslation(): UseTranslationReturn {
  const { language, t, navLinks, homeNavLinks, words, abilities, homeAbilities, expCards, techStackIcons, techStackImgs, projects, projectDetailsCards, serviceKeywords, processSteps, productCards, faqItems } = useLanguage();

  return {
    t,
    locale: language,
    isEnglish: language === 'en',
    isFrench: language === 'fr',
    navLinks,
    homeNavLinks,
    words,
    abilities,
    homeAbilities,
    expCards,
    techStackIcons,
    techStackImgs,
    projects,
    projectDetailsCards,
    serviceKeywords,
    processSteps,
    productCards,
    faqItems,
  };
}
