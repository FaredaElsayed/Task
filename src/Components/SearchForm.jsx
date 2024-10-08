import React, { useContext } from "react";
import { useTranslation } from "react-i18next"; 
import styles from "../CSS/SearchForm.module.css"; 
import { SearchContext } from "../Contexts/SearchContext";
import SearchResults from "./SearchResults";
import SearchFormFields from "./SearchFormFields";
import { ThemeContext } from "../Contexts/ThemeContext";
const SearchForm = () => {
  const { t, i18n } = useTranslation();
  const { isFormVisible, handleSubmit } = useContext(SearchContext);
  const { isDarkMode } = useContext(ThemeContext); 

  return (
    <section
      className={`${styles.searchForm} ${isDarkMode ? styles.dark : ""}`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <h1 className={styles.title}>{t("search_individuals")}</h1>

      {isFormVisible ? (
        <form onSubmit={handleSubmit}>
          <SearchFormFields />
          <button type="submit" className={styles.submitButton}>
            {t("search")}
          </button>
        </form>
      ) : (
        <SearchResults />
      )}
    </section>
  );
};

export default SearchForm;
