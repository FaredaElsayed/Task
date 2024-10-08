import React from "react";
import { useTranslation } from "react-i18next"; // Import the hook
import styles from "./CSS/LanguageSwitcher.module.css"; // Import the CSS module

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
