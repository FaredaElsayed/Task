import React, { useEffect } from "react";
import { useTranslation } from "react-i18next"; 
import styles from "../CSS/LanguageSwitcher.module.css"
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); 
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={styles.languageButton}
        onClick={() => changeLanguage("en")}
      >
        English
      </button>
      <button
        className={styles.languageButton}
        onClick={() => changeLanguage("ar")}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;
