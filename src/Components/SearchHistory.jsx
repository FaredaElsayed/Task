// SearchHistory.js
import React, { useContext } from "react";
import { SearchContext } from "./Contexts/SearchContext";
import { useTranslation } from "react-i18next";
import styles from "./CSS/SearchForm.module.css";

const SearchHistory = () => {
  const { searchHistory, setFormData, handleClearHistory } =
    useContext(SearchContext);

  const { t } = useTranslation();

  const handleSearchFromHistory = (search) => {
    setFormData(search);
  };

  return (
    <div className={styles.searchHistory}>
      <h3>{t("search_history")}</h3>
      <ul>
        {searchHistory.map((search, index) => (
          <li key={index} onClick={() => handleSearchFromHistory(search)}>
            {`${search.fname} ${search.mname} ${search.lname} (${search.nat})`}
          </li>
        ))}
      </ul>
      <button onClick={handleClearHistory} className={styles.clearButton}>
        {t("clear_history")}
      </button>
    </div>
  );
};

export default SearchHistory;
