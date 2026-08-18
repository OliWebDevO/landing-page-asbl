interface ButtonProps {
  className?: string; 
  id?: string;
  text?: string;
  href?: string;
}
interface ButtonProjectProps {
  className?: string; 
  text?: string;
  href: string;
}

interface LogoIconType {
  imgPath: string;
}
interface TitleHeaderProps {
  title: string;
  sub?: string;
  cn?: string;
}

interface CardType {
  review: string;
  imgPath?: string;
  name?: string;
  logoPath?: string;
  title?: string;
  date?: string;
  responsibilities?: string[];
}

interface GlowCardProps {
  card: CardType;
  children?: ReactNode;
  index: number;
}

interface ModelType {
  model: TechIconType;
}

interface TechIconType {
  name: string;
  modelPath: string;
  scale: number;
  rotation: number[];
}

interface TechIconsType {
  en: TechIconType[];
  fr: TechIconType[];
}


interface ProjectType {
  title: string;
  slug: string;
  description: string;
  image: string;
  bg: string;
  techLogos?: string[];
  link: string;
}
interface ProjectsType {
  en: ProjectType[];
  fr: ProjectType[];
}

interface WordType {
  id: number;
  text: string;
  imgPath: string;
  color: string;
}

interface WordsType {
  en: WordType[];
  fr: WordType[];
}

interface NavTranslations {
  contact: string;
}

interface AbilityType {
  imgPath: string;
  title: string;
  desc: string;
}

interface AbilitiesTranslations {
  en: AbilityType[];
  fr: AbilityType[];
}

interface StepType {
  number: number;
  title: string;
  shortTitle: string;
  review: string;
  checkpoints: string[];
}

interface ProductCardType {
  title: string;
  description: string;
  features: string[];
  imgPath: string;
}

interface HomeTranslations {
  services: { title: string; subtitle: string };
  process: { title: string; subtitle: string };
  products: { title: string; subtitle: string };
  faq: { title: string; subtitle: string };
}

interface ExpCardType {
  review: string;
  imgPath: string;
  logoPath: string;
  title: string;
  date: string;
  responsibilities: string[];
}

interface ExpCardsType {
  en: ExpCardType[];
  fr: ExpCardType[];
}

interface ProjectDetailCard {
  imgPath: string;
  logoPath: string;
  title: string;
  details: string[];
}

interface ProjectDetailsType {
  slug: string;
  cards: ProjectDetailCard[];
}
interface ProjectDetailsTranlations {
  en: ProjectDetailsType[];
  fr: ProjectDetailsType[]; 
}

interface HeroTranslations {
  shaping: string;
  intoRealProjects: string;
  deliverResults: string;
  description: string;
  buttonText: string;
  buttonTextMobile: string;
}

interface SliderTranslations {
  title: string;
  subtitle: string;
}

interface ShowcaseTranslations {
  title: string;
  subtitle: string;
}



interface ProjectsTranslations {
  lesarts: ProjectTranslations;
  "ovni-compta": ProjectTranslations;
  fanal: ProjectTranslations;
  artgallery: ProjectTranslations;
  portfolio: ProjectTranslations;
  lenoyer: ProjectTranslations;
  annick: ProjectTranslations;
  [key: string]: ProjectTranslations
}

interface ProjectTranslations {
  title: string;
  description: string;
}

interface SkillsTranslations {
  title: string;
  subtitle: string;
}
interface ExperienceTranslations {
  title: string;
  subtitle: string;
  resp: string;
}
interface TechStackTranslations {
  title: string;
  subtitle: string;
}
interface ContactTranslations {
  title: string;
  subtitle: string;
  name: string;
  subject: string;
  subjectPlaceholder: string;
  scenarios: string[];
  message: string;
  send: string;
  sending: string;
  successTitle: string;
  successMessage: string;
  close: string;
}
interface ProjectPageTranslations {
  visitProject: string;
}

interface BadgesTranslations {
  inDevelopment: string;
}

interface CtaTranslations {
  create: string;
  contact: string;
}

interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  slider: SliderTranslations;
  showcase: ShowcaseTranslations;
  projects: ProjectsTranslations;
  skills: SkillsTranslations;
  experience: ExperienceTranslations;
  techstack: TechStackTranslations;
  contact: ContactTranslations;
  projectpage: ProjectPageTranslations;
  badges: BadgesTranslations;
  home: HomeTranslations;
  cta: CtaTranslations;
}


type Language = 'en' | 'fr';

interface TechStackImgType {
  name: string;
  imgPath: string;
}

interface FaqItemType {
  question: string;
  answer: string;
}

interface FaqCategoryType {
  category: string;
  items: FaqItemType[];
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  navLinks: { name: string; link: string }[];
  homeNavLinks: { name: string; link: string }[];
  words: WordType[];
  abilities: AbilityType[];
  homeAbilities: AbilityType[];
  expCards: ExpCardType[];
  techStackIcons: TechStackIconsType[];
  techStackImgs: TechStackImgType[];
  projects: ProjectType[];
  projectDetailsCards: ProjectDetailsType[];
  serviceKeywords: string[];
  processSteps: StepType[];
  productCards: ProductCardType[];
  faqItems: FaqCategoryType[];
}

interface UseTranslationReturn {
  t: Translations;
  locale: Language;
  isEnglish: boolean;
  isFrench: boolean;
  navLinks: { name: string; link: string }[];
  homeNavLinks: { name: string; link: string }[];
  words: WordType[];
  abilities: AbilityType[];
  homeAbilities: AbilityType[];
  expCards: ExpCardType[];
  techStackIcons: TechStackIconsType[];
  techStackImgs: TechStackImgType[];
  projects: ProjectType[];
  projectDetailsCards: ProjectDetailsType[];
  serviceKeywords: string[];
  processSteps: StepType[];
  productCards: ProductCardType[];
  faqItems: FaqCategoryType[];
}