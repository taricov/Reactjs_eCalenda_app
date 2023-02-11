import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./public/locales/en/translation.json";
import fr from "./public/locales/fr/translation.json";
import es from "./public/locales/es/translation.json";
import ar from "./public/locales/ar/translation.json";

// const [allSettings, setSettings] = useAtom(settingsAtom)





const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  es: {
    translation: es,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // .init({
  //   resources,
  //   // lng: "en",
  //   ns: ["en", "fr", "es", "ar"],
  //   interpolation: {
  //     escapeValue: false, // react already safes from xss
  //   },
  // });
  .init({
    debug: true,
    fallbackLng: "ar",
    detection: {
      order: ["htmlTag", "cookie"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "../public/locales/{{lng}}/translation.json",
    },
    react: {
      bindI18n: "loaded languageChanged",
      bindI18nStore: "added",
      useSuspense: true,
    },
    // react: { useSuspense: false },
  });
export default i18n;










// import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";
// import languageEN from "./assets/locale/en.json";
// import languageHE from "./assets/locale/he.json";

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: { en: languageEN, he: languageHE },
//     fallbackLng: "en",
//     debug: true,
//     ns: ["translations"],
//     defaultNS: "translations",
//     keySeparator: ".",
//     interpolation: {
//       escapeValue: false,
//       formatSeparator: ",",
//     },
//     react: {
//       useSuspense: false,
//       wait: true,
//       nsMode: "default",
//     },
//   });