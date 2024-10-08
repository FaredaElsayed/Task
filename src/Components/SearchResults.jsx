import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CSS/SearchResults.module.css";
import { SearchContext } from "./Contexts/SearchContext";

const SearchResults = () => {
  const { t, i18n } = useTranslation();
  const { results, handleShowForm, loading, error } = useContext(SearchContext);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const isDarkMode = document.body.classList.contains("dark");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const toggleDetails = (index) => {
    setSelectedResult(selectedResult === index ? null : index);
  };

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get the page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // Maximum number of page buttons to display

    // Calculate the range of pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if there are fewer than maxPagesToShow
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add pages to the pageNumbers array
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add first page and last page if not already included
    if (startPage > 1) {
      pageNumbers.unshift(1); // Add first page
      if (startPage > 2) pageNumbers.unshift("..."); // Add ellipsis if there's a gap
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("..."); // Add ellipsis if there's a gap
      pageNumbers.push(totalPages); // Add last page
    }

    return pageNumbers;
  };

  return (
    <section
      className={styles.results}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <h3 className={styles.resultsTitle}>{t("results")}</h3>
      {loading && <p>{t("loading")}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {results.length === 0 && !loading ? (
        <p>{t("no_matched_results")}</p>
      ) : (
        <>
          <ul className={styles.resultsList}>
            {(showMore ? results : currentResults).map((result, index) => (
              <li
                key={index}
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
                    <strong>{t("name")}:</strong> {result.name} <br />
                    <strong>{t("score")}:</strong> {Number(result.score)}%
                  </header>

                  {selectedResult === index && (
                    <div
                      className={`${styles.details} ${
                        isDarkMode ? styles.dark : styles.light
                      }`}
                    >
                      {result.country && (
                        <p>
                          <strong>{t("nationality")}:</strong> {result.country}
                        </p>
                      )}

                      {result.watchList && (
                        <p>
                          <strong>{t("watch_list")}:</strong>
                          {result.watchList}
                        </p>
                      )}
                      {result.description && (
                        <p>
                          <strong>{t("description")}:</strong>
                          {result.description}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1} // Disable if on the first page
            >
              &laquo;
            </button>

            {/* Display page numbers */}
            {getPageNumbers().map((pageNumber, index) => (
              <button
                key={
                  typeof pageNumber === "number"
                    ? pageNumber
                    : `ellipsis-${index}`
                } // Use a unique key for ellipses
                className={`${styles.pageButton} ${
                  pageNumber === currentPage ? styles.activePage : ""
                }`}
                onClick={() =>
                  typeof pageNumber === "number"
                    ? handlePageChange(pageNumber)
                    : null
                }
                disabled={typeof pageNumber !== "number"} // Disable if it's an ellipsis
              >
                {pageNumber}
              </button>
            ))}

            <button
              className={styles.pageButton}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages} // Disable if on the last page
            >
              &raquo;
            </button>
          </div>
        </>
      )}
      <button onClick={handleShowForm} className={styles.submitButton}>
        {t("search_again")}
      </button>
    </section>
  );
};

export default SearchResults;
