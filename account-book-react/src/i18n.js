import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

await i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
});

export const locales = {
  en: { title: "English" },
  "zh-TW": { title: "中文" },
};

export default i18n;
