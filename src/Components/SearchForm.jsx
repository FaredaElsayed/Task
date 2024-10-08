import React, { useContext } from "react";
import { useTranslation } from "react-i18next"; // Import the hook
import styles from "./CSS/SearchForm.module.css"; // Import the CSS module
import SearchHistory from "./SearchHistory";
import { SearchContext } from "./Contexts/SearchContext";
import SearchResults from "./SearchResults";
import SearchFormFields from "./SearchFormFields";

const SearchForm = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const { isFormVisible, handleSubmit, searchHistory } =
    useContext(SearchContext);
  return (
    <div className={styles.searchForm}>
      <h2 className={styles.title}>{t("search_individuals")}</h2>
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
      {searchHistory.length > 0 ? <SearchHistory /> : ""}
    </div>
  );
};

export default SearchForm;
