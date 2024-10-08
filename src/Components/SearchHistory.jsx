import React, { useContext } from "react";
import { SearchContext } from "./Contexts/SearchContext";
import { useTranslation } from "react-i18next";
import styles from "./CSS/SearchForm.module.css";

const SearchHistory = () => {
  const {
    searchHistory,
    handleClearHistory,
    handleSearchFromHistory,
    setSearchHistory,
  } = useContext(SearchContext);
  const { t } = useTranslation();

  // Function to handle deletion of a single search history item
  const handleDelete = (index) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((_, i) => i !== index)
    );
  };

  return (
    <div className={styles.searchHistory}>
      <h3>{t("search_history")}</h3>
      <ul
        style={{
          padding: "0px",
        }}
      >
        {searchHistory.map((search, index) => (
          <li
            key={index}
            onClick={() => handleSearchFromHistory(search)}
            style={{ display: "flex", gap: "1rem" }}
          >
            {`${search.fname} ${search.mname} ${search.lname} (${search.nat})`}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
              className={styles.deleteButton}
              style={{
                border: "none",
                cursor: "pointer",

                background: "transparent",
              }}
              title={t("delete")}
            >
              🗑️
            </button>
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
