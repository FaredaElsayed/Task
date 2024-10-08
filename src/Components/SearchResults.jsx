// SearchResults.js
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CSS/SearchForm.module.css"; // Import the CSS module
import { SearchContext } from "./Contexts/SearchContext";

const SearchResults = () => {
  const { t } = useTranslation();
  const { results, formData, handleShowForm } = useContext(SearchContext);

  return (
    <div
      className={styles.results}
      dir={t("currentLanguage") === "ar" ? "rtl" : "ltr"}
    >
      <h3 className={styles.resultsTitle}>{t("results")}</h3>
      <ul className={styles.resultsList}>
        {results.map((result, index) => (
          <li key={index} className={styles.resultsItem}>
            <strong>{t("first_name")}:</strong> {formData.fname} <br />
            <strong>{t("middle_name")}:</strong> {formData.mname} <br />
            <strong>{t("last_name")}:</strong> {formData.lname} <br />
            <strong>{t("nationality")}:</strong> {formData.nat} <br />
            <strong>{t("description")}:</strong> {formData.description} <br />
            <strong>{t("place_of_birth")}:</strong> {formData.placeOfBirth}{" "}
            <br />
            <strong>{t("score")}:</strong> {Number(formData.score)} <br />
          </li>
        ))}
      </ul>
      <button onClick={handleShowForm} className={styles.submitButton}>
        {t("search_again")}
      </button>
    </div>
  );
};

export default SearchResults;
