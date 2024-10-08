import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./CSS/SearchResults.module.css";

import { SearchContext } from "./Contexts/SearchContext";

const SearchResults = () => {
  const { t, i18n } = useTranslation();
  const { results, handleShowForm, loading, error } = useContext(SearchContext);
  const [selectedResult, setSelectedResult] = useState(null);
  const isDarkMode = document.body.classList.contains("dark"); // Check if dark mode is enabled

  const toggleDetails = (index) => {
    setSelectedResult(selectedResult === index ? null : index);
  };

  return (
    <section
      className={styles.results}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <h3 className={styles.resultsTitle}>{t("results")}</h3>
      {loading && <p>{t("loading")}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {results.length === 0 ? (
        <p>{t("no_matched_results")}</p>
      ) : (
        <ul className={styles.resultsList}>
          {results.map((result, index) => (
            <li
              key={result.id}
              className={`${styles.resultsItem} ${
                isDarkMode ? styles.dark : styles.light
              }`}
              onClick={() => toggleDetails(index)}
            >
              <article>
                <header
                  className={
                    isDarkMode ? styles.headerDark : styles.headerLight
                  }
                >
                  <strong>{t("first_name")}:</strong> {result.fname} <br />
                  <strong>{t("last_name")}:</strong> {result.lname}
                </header>

                {selectedResult === index && (
                  <div
                    className={`${styles.details} ${
                      isDarkMode ? styles.dark : styles.light
                    }`}
                  >
                    <p>
                      <strong>{t("middle_name")}:</strong> {result.mname}
                    </p>
                    <p>
                      <strong>{t("nationality")}:</strong> {result.nat}
                    </p>
                    {result.description && (
                      <p>
                        <strong>{t("description")}:</strong>{" "}
                        {result.description}
                      </p>
                    )}
                    {result.placeOfBirth && (
                      <p>
                        <strong>{t("place_of_birth")}:</strong>{" "}
                        {result.placeOfBirth}
                      </p>
                    )}
                    {result.score && (
                      <p>
                        <strong>{t("score")}:</strong> {Number(result.score)}
                      </p>
                    )}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleShowForm} className={styles.submitButton}>
        {t("search_again")}
      </button>
    </section>
  );
};

export default SearchResults;
