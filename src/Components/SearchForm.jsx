// import React, { useContext } from "react";
// import { useTranslation } from "react-i18next"; // Import the hook
// import styles from "./CSS/SearchForm.module.css"; // Import the CSS module
// import SearchHistory from "./SearchHistory";
// import { SearchContext } from "./Contexts/SearchContext";
// import SearchResults from "./SearchResults";
// import SearchFormFields from "./SearchFormFields";

// const SearchForm = () => {
//   const { t, i18n } = useTranslation(); // Initialize translation hook
//   const { isFormVisible, handleSubmit, searchHistory } =
//     useContext(SearchContext);

//   return (
//     <section
//       className={styles.searchForm}
//       dir={i18n.language === "ar" ? "rtl" : "ltr"}
//     >
//       <h1 className={styles.title}>{t("search_individuals")}</h1>

//       {isFormVisible ? (
//         <form onSubmit={handleSubmit}>
//           <SearchFormFields />
//           <button type="submit" className={styles.submitButton}>
//             {t("search")}
//           </button>
//         </form>
//       ) : (
//         <SearchResults />
//       )}

//       {searchHistory.length > 0 && <SearchHistory />}
//     </section>
//   );
// };

// export default SearchForm;
import React, { useContext } from "react";
import { useTranslation } from "react-i18next"; // Import the hook
import styles from "./CSS/SearchForm.module.css"; // Import the CSS module
import SearchHistory from "./SearchHistory";
import { SearchContext } from "./Contexts/SearchContext";
import SearchResults from "./SearchResults";
import SearchFormFields from "./SearchFormFields";
import { ThemeContext } from "./Contexts/ThemeContext";
const SearchForm = () => {
  const { t, i18n } = useTranslation();
  const { isFormVisible, handleSubmit, searchHistory } =
    useContext(SearchContext);
  const { isDarkMode } = useContext(ThemeContext); // Get theme state

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

      {searchHistory.length > 0 && <SearchHistory />}
    </section>
  );
};

export default SearchForm;
