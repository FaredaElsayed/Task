import React, { useContext } from "react";
import { useTranslation } from "react-i18next"; 
import styles from "../CSS/SearchForm.module.css"; 
import { SearchContext } from "../Contexts/SearchContext";

const SearchFormFields = () => {
  const { t } = useTranslation();
  const { formData, handleChange, loading, error } = useContext(SearchContext);
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="fname" className={styles.label}>
          {t("first_name")}
        </label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="mname" className={styles.label}>
          {t("middle_name")}
        </label>
        <input
          type="text"
          id="mname"
          name="mname"
          value={formData.mname}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lname" className={styles.label}>
          {t("last_name")}
        </label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="nat" className={styles.label}>
          {t("nationality")}
        </label>
        <input
          type="text"
          id="nat"
          name="nat"
          value={formData.nat}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          {t("description")}
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.input}
          rows="4"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="placeOfBirth" className={styles.label}>
          {t("place_of_birth")}
        </label>
        <input
          type="text"
          id="placeOfBirth"
          name="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="score" className={styles.label}>
          {t("score")}
        </label>
        <input
          type="number"
          id="score"
          name="score"
          value={formData.score}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        error && <p className={styles.errorMessage}>{error}</p>
      )}
    </>
  );
};

export default SearchFormFields;
