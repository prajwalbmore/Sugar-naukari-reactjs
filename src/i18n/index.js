import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import fr from "./fr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: localStorage.getItem("i18nextLng") || "fr", // 👈 checks localStorage first, then defaults to French
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
  });

export default i18n;


// // i18n.js
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// import en from "./en.json";
// import fr from "./fr.json";

// i18n
//   .use(LanguageDetector) // 👈 detects language from localStorage, browser, etc.
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { translation: en },
//       fr: { translation: fr },
//     },
//     fallbackLng: "en",
//     interpolation: { escapeValue: false },

//     detection: {
//       order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
//       caches: ["localStorage"], // 👈 saves language in localStorage
//     },
//   });

// export default i18n;
