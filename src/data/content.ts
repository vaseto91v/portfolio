export type Education = { school: string; program: string; dates: string };
export type Experience = {
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
};
export type Project = {
  name: string;
  role: string;
  description: string;
  stack: string[];
  live?: string;
  repo?: string;
  screenshots: string[];
};
export type Info = {
  name: string;
  tag: string;
  location: string;
  email: string;
  phone: string;
  website?: string;
  github?: string;
  summary: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
};
export type UIStrings = {
  available: string;
  download: string;
  viewGithub: string;
  coreSkills: string;
  education: string;
  experience: string;
  projects: string;
  projectsNote: string;
  live: string;
  repo: string;
  private: string;
  letsTalkTitle: string;
  letsTalkText: string;
  footerNote: (name: string) => string;
  langToggle: string;
};

export const INFO_EN: Info = {
  name: "Vasil Vasilev",
  tag: "Senior Web Developer",
  location: "Plovdiv, Bulgaria",
  email: "vasil.z.vasilev@icloud.com",
  phone: "+359 876577365",
  github: "https://github.com/vaseto91v",
  website: undefined,
  summary:
    "Full-stack dev with 10+ years shipping reliable, fast and maintainable products. React, Next.js, TypeScript, GraphQL. Pragmatic, delivery-focused, strong on refactoring and UX.",
  skills: [
    "React","Next.js","TypeScript","Node.js","GraphQL","Apollo",
    ".NET C#","MSSQL","Express","MongoDB","REST APIs",
    "TailwindCSS","SCSS","Zustand","Redux","Zod","Formik",
    "React Native","Expo","Bluetooth Integration","KaiOS Compatibility",
    "CI/CD","Docker","Jest","Playwright","Hiring & Mentoring",
  ],
  education: [
    {
      school: 'Highschool of mathematics "Akademik Kiril Popov", Plovdiv',
      program: "High School – Math & Science",
      dates: "2005 – 2010",
    },
    {
      school: "Zealand Institute of Business and Technology (ZIBAT), Denmark",
      program: "AP Degree in Computer Science",
      dates: "2011 – 2013",
    },
    {
      school: "ZIBAT – Top-up Program in Web Development",
      program: "Batchelor degree in web development",
      dates: "2013 – 2015",
    },
  ],
  experience: [
    {
      company: "ZIKVID",
      title: "Frontend Developer",
      start: "2024",
      end: "2025",
      location: "Remote / Bulgaria",
      bullets: [
        "Worked on frontend architecture for internal projects and clients' apps.",
        "Co-built the website and mobile app for 'This is Dope' (Expo Router, React Native, Next.js).",
        "Handled complex UI logic, state management, media grid animations, and onboarding flows.",
      ],
    },
    {
      company: "Enetpulse",
      title: "Full-Stack Developer",
      start: "2022",
      end: "2024",
      location: "Sofia, Bulgaria (Remote/Hybrid)",
      bullets: [
        "Developed a React-based app for KaiOS (Mozilla 1.0 engine), deployed in India & Africa.",
        "Built a Node.js backend (API + WebSocket) integrating with a GraphQL sports data provider.",
        "Optimized performance for low-end KaiOS devices; adapted to legacy constraints.",
      ],
    },
    {
      company: "Freetrailer",
      title: "Full-Stack Developer",
      start: "2016",
      end: "2022",
      location: "Copenhagen, Denmark",
      bullets: [
        "Maintained and expanded a self-service trailer booking system (Node.js, .NET C#, MSSQL).",
        "Worked on React Native mobile app with Bluetooth lock support; performed on-site UX research at trailer locations.",
        "Participated in hiring 4 developers; 3 remained long-term contributors.",
      ],
    },
  ],
  projects: [
    {
      name: "Freetrailer Booking System",
      role: "Full-Stack · Node · C# · React Native",
      description:
        "Scandinavian self-service trailer booking platform. Node.js API, legacy .NET, React Native + Bluetooth locks. 7 years of iterative improvements and maintenance.",
      stack: ["Node.js", ".NET", "React Native", "MSSQL", "Bluetooth"],
      live: "https://booking.freetrailer.com/?country=dk",
      repo: "(private)",
      screenshots: ["/shots/ft-1.jpg", "/shots/ft-2.jpg"],
    },
    {
      name: "This is Dope",
      role: "Frontend · React Native · Next.js",
      description:
        "Website and app for This is Dope, built using Expo Router and React Native. UI logic, animation flows, onboarding, and media sharing features.",
      stack: ["React Native", "Expo", "Next.js", "TailwindCSS"],
      live: "https://thisisdope.com/",
      repo: "(private)",
      screenshots: ["/shots/dopelive-1.jpg", "/shots/dopelive-2.jpg"],
    },
    {
      name: "Guild Website",
      role: "Nuxt · API Integrations",
      description:
        "Displays guild and character data by calling two external APIs. Pagination, loading states, and async UI rendering.",
      stack: ["Nuxt", "REST APIs"],
      live: "",
      repo: "(private)",
      screenshots: ["/shots/guild-1.jpg", "/shots/guild-2.jpg"],
    },
    {
      name: "Date and Care",
      role: "Next.js · Tailwind · Forms",
      description:
        "Responsive multi-section FE prototype with booking form, Zod validation, and optional sitter assignment logic.",
      stack: ["Next.js", "TailwindCSS", "Zod"],
      live: "",
      repo: "(private)",
      screenshots: ["/shots/rastem-1.jpg", "/shots/rastem-2.jpg"],
    },
  ],
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

export const INFO_BG_OVERRIDES: DeepPartial<Info> = {
  tag: "Старши уеб разработчик",
  location: "Пловдив, България",
  summary:
    "Full-stack разработчик с 10+ години опит в изграждането на надеждни, бързи и поддържани продукти. React, Next.js, TypeScript, GraphQL. Прагматичен, ориентиран към резултати, силен във внедряването на добри практики и рефакторинг.",
  education: [
    {
      school: 'МГ "Академик Кирил Попов", Пловдив',
      program: "Средно образование – математика и природни науки",
      dates: "2005 – 2010",
    },
    {
      school: "Zealand Institute of Business and Technology (ZIBAT), Дания",
      program: "AP степен по Компютърни науки",
      dates: "2010 – 2013",
    },
    {
      school: "ZIBAT – Top-up програма по Уеб разработка",
      program: "Бакалавърска степен по уеб програмиране",
      dates: "2013 – 2015",
    },
  ],
  experience: [
    {
      title: "Frontend разработчик",
      location: "Дистанционно / България",
      bullets: [
        "Работа по frontend архитектура за вътрешни и клиентски приложения.",
        "Екипно създаване на уебсайта и мобилното приложение на 'This is Dope' (Expo Router, React Native, Next.js).",
        "Сложна UI логика, управление на състояние, анимации на медийна мрежа и onboarding потоци.",
      ],
    },
    {
      title: "Full-Stack разработчик",
      location: "София, България",
      bullets: [
        "Разработка на React приложение за KaiOS (двигател Mozilla 1.0), внедрено в Индия и Африка.",
        "Node.js бекенд (API + WebSocket), интегриран с външен GraphQL доставчик на спортни данни.",
        "Оптимизации за нисък клас KaiOS устройства и работа с legacy ограничения.",
      ],
    },
    {
      title: "Full-Stack разработчик",
      location: "Копенхаген, Дания (хибрид/дистанционно)",
      bullets: [
        "Поддръжка и развитие на самообслужваща система за резервации на ремаркета (Node.js, .NET C#, MSSQL).",
        "React Native мобилно приложение с Bluetooth заключване; теренни UX наблюдения на паркинги.",
        "Участие в наемането на 4-ма уеб разработчика; 3-ма от тях останаха дългосрочно и допринесоха значително.",
      ],
    },
  ],
  projects: [
    {
      name: "Freetrailer – система за резервации",
      role: "Full-Stack · Node · C# · React Native",
      description:
        "Скандинавска платформа за самообслужващи резервации. Node.js API, legacy .NET, React Native + Bluetooth катинари. 7 години итеративни подобрения и поддръжка.",
    },
    {
      name: "This is Dope",
      role: "Frontend · React Native · Next.js",
      description:
        "Уебсайт и приложение, изградено с Expo Router и React Native. UI логика, анимации, onboarding и споделяне на медии.",
    },
    {
      name: "Guild Website",
      role: "Nuxt · API интеграции",
      description:
        "Показва информация за гилдия и герои чрез извикване на два външни API-та. Пагинация, състояния на зареждане и асинхронен UI.",
    },
    {
      name: "Date and Care",
      role: "Next.js · Tailwind · Форми",
      description:
        "Отзивчив фронтенд прототип с форма за резервация, Zod валидация и опционална логика за избор на детегледачка.",
    },
  ],
};

function deepMerge<T>(base: T, o?: DeepPartial<T>): T {
  if (o === undefined || o === null) return base;

  if (Array.isArray(base)) {
    if (!Array.isArray(o)) return base as T;
    const len = Math.max(base.length, o.length);
    const out: any[] = [];
    for (let i = 0; i < len; i++) {
      const bv = (base as any)[i];
      const ov = (o as any)[i];
      out[i] = deepMerge(bv, ov);
    }
    return out as any;
  }

  if (typeof base === "object" && base !== null) {
    if (typeof o !== "object" || o === null) return base;
    const out: any = { ...base };
    for (const k of Object.keys(o) as (keyof T)[]) {
      const bv = (base as any)[k];
      const ov = (o as any)[k];
      out[k] = bv === undefined ? ov : deepMerge(bv, ov as any);
    }
    return out;
  }

  // primitives: override directly
  return (o as unknown) as T;
}

/** Get fully localized info (EN base + BG overrides). */
export function getInfo(lang: "en" | "bg"): Info {
  return lang === "en" ? INFO_EN : deepMerge<Info>(INFO_EN, INFO_BG_OVERRIDES);
}

/* =====================
   UI strings
   ===================== */
export const UI = {
  en: {
    available: "Available for full-time roles",
    download: "Download PDF CV",
    viewGithub: "View GitHub",
    coreSkills: "Core Skills",
    education: "Education",
    experience: "Experience",
    projects: "Selected Projects",
    projectsNote:
      "A mix of public and private work. Screenshots for reference; code links where available.",
    live: "Live",
    repo: "Repo",
    private: "private",
    letsTalkTitle: "Let’s talk",
    letsTalkText: "I can share additional private demos/screens if needed.",
    footerNote: (name: string) =>
      `© ${new Date().getFullYear()} ${name}. Built with Next.js + Tailwind. Print this page for a PDF CV.`,
    langToggle: "BG / EN",
  },
  bg: {
    available: "Достъпен за работа на пълен работен ден",
    download: "Свали PDF CV",
    viewGithub: "Виж GitHub",
    coreSkills: "Основни умения",
    education: "Образование",
    experience: "Опит",
    projects: "Избрани проекти",
    projectsNote:
      "Микс от публична и частна работа. Скрийншоти за референция; линкове към код – където е възможно.",
    live: "Сайт",
    repo: "Repo",
    private: "частно",
    letsTalkTitle: "Да поговорим",
    letsTalkText: "Могат да бъдат изискани допълнителни материали и демота.",
    footerNote: (name: string) =>
      `© ${new Date().getFullYear()} ${name}. Изградено с Next.js + Tailwind. Разпечатайте страницата за PDF CV.`,
    langToggle: "BG / EN",
  },
} satisfies Record<"en" | "bg", UIStrings>;
