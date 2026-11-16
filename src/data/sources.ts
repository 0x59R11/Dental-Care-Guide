export interface Source {
  id: string;
  url: string;
  publisher: string;
  language: 'en' | 'de';
  titles: Record<'en' | 'ru' | 'uk' | 'de', string>;
}

export const sources: Source[] = [
  {
    id: 'who',
    url: 'https://www.who.int/news-room/fact-sheets/detail/oral-health',
    publisher: 'WHO',
    language: 'en',
    titles: {
      en: 'Oral health: prevention and common conditions',
      ru: 'Здоровье полости рта: профилактика и распространённые заболевания',
      uk: 'Здоров’я ротової порожнини: профілактика й поширені захворювання',
      de: 'Mundgesundheit: Vorbeugung und häufige Erkrankungen',
    },
  },
  {
    id: 'ada-care',
    url: 'https://www.ada.org/resources/ada-library/oral-health-topics/home-care',
    publisher: 'ADA',
    language: 'en',
    titles: {
      en: 'Everyday oral care and individual recommendations',
      ru: 'Ежедневный уход за полостью рта и индивидуальные рекомендации',
      uk: 'Щоденний догляд за ротовою порожниною та індивідуальні рекомендації',
      de: 'Tägliche Mundpflege und individuelle Empfehlungen',
    },
  },
  {
    id: 'ada-erosion',
    url: 'https://www.ada.org/resources/ada-library/oral-health-topics/dental-erosion',
    publisher: 'ADA',
    language: 'en',
    titles: {
      en: 'Dental erosion: acids and tooth wear',
      ru: 'Эрозия зубов: кислоты и потеря тканей зуба',
      uk: 'Ерозія зубів: кислоти та втрата тканин зуба',
      de: 'Zahnerosion: Säuren und Verlust von Zahnsubstanz',
    },
  },
  {
    id: 'nidcr-decay',
    url: 'https://www.nidcr.nih.gov/health-info/tooth-decay',
    publisher: 'NIDCR',
    language: 'en',
    titles: {
      en: 'Tooth decay: causes, early changes, and treatment',
      ru: 'Кариес: причины, ранние изменения и лечение',
      uk: 'Карієс: причини, ранні зміни й лікування',
      de: 'Karies: Ursachen, frühe Veränderungen und Behandlung',
    },
  },
  {
    id: 'nhs-brushing',
    url: 'https://www.nhs.uk/live-well/healthy-teeth-and-gums/how-to-keep-your-teeth-clean/',
    publisher: 'NHS',
    language: 'en',
    titles: {
      en: 'How to keep your teeth clean',
      ru: 'Как правильно очищать зубы',
      uk: 'Як правильно очищати зуби',
      de: 'So halten Sie Ihre Zähne sauber',
    },
  },
  {
    id: 'cochrane-interdental',
    url: 'https://www.cochrane.org/evidence/CD012018_home-use-devices-cleaning-between-teeth-addition-toothbrushing-prevent-and-control-gum-diseases-and',
    publisher: 'Cochrane',
    language: 'en',
    titles: {
      en: 'Interdental cleaning: a review of the evidence',
      ru: 'Очищение межзубных промежутков: обзор доказательств',
      uk: 'Очищення міжзубних проміжків: огляд доказів',
      de: 'Zahnzwischenraumreinigung: eine Übersicht der Evidenz',
    },
  },
  {
    id: 'german-guideline',
    url: 'https://register.awmf.org/assets/guidelines/083-021l_S3_Kariespraevention-bei-bleibenden-Zaehnen-grundlegende-Empfehlungen_2025-04.pdf',
    publisher: 'DGZ / DGZMK · AWMF',
    language: 'de',
    titles: {
      en: 'German S3 guideline: preventing caries in permanent teeth (2025, PDF)',
      ru: 'Немецкое руководство S3: профилактика кариеса постоянных зубов (2025, PDF)',
      uk: 'Німецька настанова S3: профілактика карієсу постійних зубів (2025, PDF)',
      de: 'S3-Leitlinie: Kariesprävention bei bleibenden Zähnen (2025, PDF)',
    },
  },
  {
    id: 'nhs-abscess',
    url: 'https://www.nhs.uk/conditions/dental-abscess/',
    publisher: 'NHS',
    language: 'en',
    titles: {
      en: 'Dental abscess: signs and when to get help',
      ru: 'Зубной абсцесс: признаки и когда обращаться за помощью',
      uk: 'Зубний абсцес: ознаки та коли звертатися по допомогу',
      de: 'Zahnabszess: Anzeichen und wann Hilfe nötig ist',
    },
  },
  {
    id: 'ada-dry-mouth',
    url: 'https://www.ada.org/resources/ada-library/oral-health-topics/xerostomia',
    publisher: 'ADA',
    language: 'en',
    titles: {
      en: 'Dry mouth: causes and dental risks',
      ru: 'Сухость во рту: причины и риски для зубов',
      uk: 'Сухість у роті: причини й ризики для зубів',
      de: 'Mundtrockenheit: Ursachen und Risiken für die Zähne',
    },
  },
  {
    id: 'ada-gum',
    url: 'https://www.ada.org/resources/ada-library/oral-health-topics/chewing-gum',
    publisher: 'ADA',
    language: 'en',
    titles: {
      en: 'Sugar-free chewing gum and saliva',
      ru: 'Жевательная резинка без сахара и слюна',
      uk: 'Жувальна гумка без цукру та слина',
      de: 'Zuckerfreier Kaugummi und Speichel',
    },
  },
  {
    id: 'iccms',
    url: 'https://www.iccms-web.com/uploads/asset/592845add7ac8756944059.pdf',
    publisher: 'ICCMS',
    language: 'en',
    titles: {
      en: 'Guide for practitioners and educators: lesion severity and activity (2014, PDF)',
      ru: 'Руководство для специалистов: тяжесть и активность очагов (2014, PDF)',
      uk: 'Настанова для фахівців: тяжкість та активність вогнищ (2014, PDF)',
      de: 'Leitfaden für Fachpersonen: Schweregrad und Aktivität von Läsionen (2014, PDF)',
    },
  },
  {
    id: 'ada-caries-management',
    url: 'https://www.ada.org/resources/research/science/evidence-based-dental-research/caries-management-clinical-practice-guidelines/',
    publisher: 'ADA',
    language: 'en',
    titles: {
      en: 'Clinical guidelines: nonrestorative and restorative caries treatment',
      ru: 'Клинические рекомендации: лечение кариеса без реставрации и с восстановлением тканей',
      uk: 'Клінічні настанови: лікування карієсу без реставрації та з відновленням тканин',
      de: 'Klinische Leitlinien: nichtrestaurative und restaurative Kariesbehandlung',
    },
  },
  {
    id: 'biofilm-reserves',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5513492/',
    publisher: 'Costa Oliveira et al. · PLOS ONE',
    language: 'en',
    titles: {
      en: 'Biofilm carbohydrate reserves and acid production: laboratory study (2017)',
      ru: 'Запасы углеводов биоплёнки и образование кислот: лабораторное исследование (2017)',
      uk: 'Запаси вуглеводів біоплівки й утворення кислот: лабораторне дослідження (2017)',
      de: 'Kohlenhydratreserven und Säurebildung im Biofilm: Laborstudie (2017)',
    },
  },
];
